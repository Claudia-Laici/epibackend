import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import { Button, Container, Form, Alert } from "react-bootstrap";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


const PostForm = ({
  initialData,
  onSubmit,
  submitLabel,
  successMessage,
  errorMessage,
}) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [coverUrl, setCoverUrl] = useState(initialData?.cover || "");
  const [coverFile, setCoverFile] = useState(null);
  const [readTime, setReadTime] = useState(initialData?.readTime.value || "");
  const [readTimeUnit, setReadTimeUnit] = useState(
    initialData?.readTime.unit || "minutes",
  );

  const [editorState, setEditorState] = useState(() => {
    if (!initialData) return EditorState.createEmpty();
    const blocks = htmlToDraft(initialData.content);
    const contentState = ContentState.createFromBlockArray(
      blocks.contentBlocks,
      blocks.entityMap,
    );
    return EditorState.createWithContent(contentState);
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const post = {
      title,
      category,
      ...(coverUrl && { cover: coverUrl }),
      readTime: { value: Number(readTime), unit: readTimeUnit },
      content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    };

    onSubmit(post, coverFile); 
  };

  return (
    <Container className="new-blog-container">
      {successMessage && (
        <Alert variant="success" className="new-blog-alert">
          {successMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert variant="danger" className="new-blog-alert">
          {errorMessage}
        </Alert>
      )}

      <Form className="mt-5" onSubmit={handleSubmit}>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            size="lg"
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Seleziona una categoria</option>
            <option value="horror">Horror</option>
            <option value="scifi">Sci-Fi</option>
            <option value="romance">Romance</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="blog-cover-url" className="mt-3">
          <Form.Label>URL della copertina</Form.Label>
          <Form.Control
            size="lg"
            type="url"
            placeholder="https://esempio.it/immagine.jpg"
            value={coverUrl}
            onChange={(e) => {
              setCoverUrl(e.target.value);
              setCoverFile(null);
            }}
          />
        </Form.Group>

        <Form.Group controlId="blog-cover-file" className="mt-3">
          <Form.Label>Oppure carica dal computer</Form.Label>
          <Form.Control
            size="lg"
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => {
              setCoverFile(e.target.files[0] || null);
              setCoverUrl("");
            }}
          />
        </Form.Group>

        <Form.Group controlId="blog-read-time" className="mt-3">
          <Form.Label>Tempo di lettura</Form.Label>
          <Form.Control
            size="lg"
            type="number"
            placeholder="Tempo di lettura"
            value={readTime}
            onChange={(e) => setReadTime(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="blog-read-time-unit" className="mt-3">
          <Form.Label>Unità</Form.Label>
          <Form.Control
            size="lg"
            as="select"
            value={readTimeUnit}
            onChange={(e) => setReadTimeUnit(e.target.value)}
          >
            <option value="minutes">Minuti</option>
            <option value="hours">Ore</option>
            <option value="days">Giorni</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Contenuto Blog</Form.Label>
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperClassName="new-blog-content"
          />
        </Form.Group>

        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="submit" size="lg" variant="dark">
            {submitLabel}
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default PostForm;
