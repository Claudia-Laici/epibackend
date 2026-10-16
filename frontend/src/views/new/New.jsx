import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../../components/postForm/PostForm";
import "./styles.css";

const NewBlogPost = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (post, coverFile) => {
    try {
      setSuccessMessage("");
      setErrorMessage("");

      const token = localStorage.getItem("token");

      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(post),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Errore durante la creazione dell'articolo",
        );
      }

      if (coverFile) {
        const formData = new FormData();
        formData.append("cover", coverFile);

        const uploadResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/posts/${data.post._id}/cover`,
          {
            method: "PATCH",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
          },
        );

        if (!uploadResponse.ok) {
          throw new Error(
            "Articolo creato, ma il caricamento della copertina è fallito",
          );
        }
      }

      setSuccessMessage("Articolo creato con successo!");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  return (
    <PostForm
      onSubmit={handleSubmit}
      submitLabel="Invia"
      successMessage={successMessage}
      errorMessage={errorMessage}
    />
  );
};

export default NewBlogPost;
