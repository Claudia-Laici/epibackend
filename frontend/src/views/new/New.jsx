import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";
import draftToHtml from "draftjs-to-html";
const NewBlogPost = (props) => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [cover, setCover] = useState("");
  const [readTime, setReadTime] = useState("");
  const [readTimeUnit, setReadTimeUnit] = useState("minutes");
  const [author, setAuthor] = useState("");

  const handleChange = (value) => {
    setText(draftToHtml(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      title,
      category,
      cover,
      readTime: {
        value: Number(readTime),
        unit: readTimeUnit,
      },
      author,
      content: text,
    };

    try {
      const response = await fetch("http://localhost:9099/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="new-blog-container">
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

        <Form.Group controlId="blog-cover" className="mt-3">
          <Form.Label>Cover</Form.Label>
          <Form.Control
            size="lg"
            type="text"
            placeholder="URL immagine di copertina"
            value={cover}
            onChange={(e) => setCover(e.target.value)}
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

        <Form.Group controlId="blog-author" className="mt-3">
          <Form.Label>Autore</Form.Label>

          <Form.Control
            size="lg"
            type="email"
            placeholder="Email dell'autore"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Contenuto Blog</Form.Label>

          <Editor
            value={text}
            onChange={handleChange}
            className="new-blog-content"
          />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Invia
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
