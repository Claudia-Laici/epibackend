import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";
import { apiFetch } from "../../../utils/apiFetch";

const BlogList = ({ search }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const endpoint = search ? `/blogPosts?title=${search}` : "/posts";

        const data = await apiFetch(endpoint);

        setPosts(search ? data.posts : data.items);
      } catch (error) {
        console.error("Errore nel recupero degli articoli:", error);
        setPosts([]);
      }
    };

    fetchPosts();
  }, [search]);

  return (
    <Row>
      {posts.length === 0 ? (
        <p>Nessun articolo trovato.</p>
      ) : (
        posts.map((post, i) => (
          <Col
            key={`item-${i}`}
            md={4}
            style={{
              marginBottom: 50,
            }}
          >
            <BlogItem key={post.title} {...post} />
          </Col>
        ))
      )}
    </Row>
  );
};

export default BlogList;
