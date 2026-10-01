import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";

const BlogList = ({ search }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url = search
          ? `http://localhost:9099/blogPosts?title=${search}`
          : "http://localhost:9099/posts";

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
          setPosts([]);
          return;
        }

        setPosts(search ? data.posts : data.items);
      } catch (error) {
        console.error(error);
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
