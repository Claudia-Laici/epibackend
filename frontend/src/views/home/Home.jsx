import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";

const Home = (props) => {
  const [search, setSearch] = useState("");

  return (
    <Container fluid="sm">
      <h1 className="blog-main-title mb-3">Benvenuto sullo Strive Blog!</h1>
      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Cerca un articolo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form>
      <BlogList search={search} />
    </Container>
  );
};

export default Home;
