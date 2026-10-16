import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
  import PostForm from "../../components/postForm/PostForm";

const EditBlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [post, setPost] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadPost = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setPost(data.post);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    loadPost();
    // eslint-disable-next-line
  }, [id]);

  const handleSubmit = async (updatedPost, coverFile) => {
  try {
    setSuccessMessage("");
    setErrorMessage("");

    const res = await fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedPost),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Errore durante la modifica");

    if (coverFile) {
      const formData = new FormData();
      formData.append("cover", coverFile);
      const up = await fetch(`${process.env.REACT_APP_API_URL}/posts/${id}/cover`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!up.ok) throw new Error("Articolo modificato, ma upload copertina fallito");
    }

    setSuccessMessage("Articolo modificato con successo!");
    setTimeout(() => navigate("/"), 2000);
  } catch (err) {
    setErrorMessage(err.message);
    setTimeout(() => setErrorMessage(""), 3000);
  }
};

  if (!post) return null;

  return (
    <PostForm
      initialData={post}
      onSubmit={handleSubmit}
      submitLabel="Salva modifiche"
      successMessage={successMessage}
      errorMessage={errorMessage}
    />
  );
};

export default EditBlogPost;