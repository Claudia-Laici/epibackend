import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { apiFetch } from "../../utils/apiFetch";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import BlogComments from "../../components/blog/blog-comments/BlogComments";
import "./styles.css";
const Blog = (props) => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Sei sicura di voler eliminare questo articolo?",
    );

    if (!confirmDelete) return;

    try {
      await apiFetch(`/posts/${params.id}`, {
        method: "DELETE",
      });

      navigate("/");
    } catch (error) {
      console.error("Errore durante l'eliminazione:", error);
      alert(error.message);
    }
  };

  const handleEdit = () => {
    navigate(`/blog/${params.id}/edit`);
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const data = await apiFetch("/auth/me");
        setCurrentUser(data);
      } catch (error) {
        console.error("Errore nel recupero dell'utente:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const id = params.id;
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/blogPosts/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          navigate("/404");
          return;
        }

        const data = await response.json();

        setBlog(data.post ?? data);
      } catch (error) {
        console.error("Errore nel recupero del post:", error);
        navigate("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [params.id, navigate]);

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <div className="blog-details-root">
        <Container>
          <Image className="blog-details-cover" src={blog.cover} fluid />
          <div className="d-flex justify-content-between align-items-center gap-3">
            <h1 className="blog-details-title">{blog.title}</h1>

            {currentUser?._id === blog.author?._id && (
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-outline-primary rounded-pill"
                  onClick={handleEdit}
                >
                  Modifica articolo
                </button>

                <button
                  className="btn btn-sm btn-outline-secondary rounded-pill"
                  onClick={handleDelete}
                >
                  Elimina articolo
                </button>
              </div>
            )}
          </div>
          <div className="blog-details-container">
            <div className="blog-details-author">
              <BlogAuthor author={blog.author} />
            </div>
            <div className="blog-details-info">
              <div>
                {blog.createdAt &&
                  new Date(blog.createdAt).toLocaleDateString("it-IT", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
              </div>
              <div>{`lettura da ${blog.readTime.value} ${blog.readTime.unit}`}</div>
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <BlogLike defaultLikes={["123"]} onChange={console.log} />
              </div>
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          ></div>
          <BlogComments postId={params.id} />
        </Container>
      </div>
    );
  }
};

export default Blog;
