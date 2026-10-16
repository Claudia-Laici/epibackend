import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import "./styles.css";

const BlogAuthor = ({ author }) => {
  const nome = author?.nome;
  const cognome = author?.cognome;
  return (
    <Row>
      <Col xs={"auto"} className="pe-0">
        <Image
          className="blog-author"
          src="https://picsum.photos/100/100"
          roundedCircle
        />
      </Col>
      <Col>
        <div>di</div>
        <h6>
          {nome} {cognome}
        </h6>
      </Col>
    </Row>
  );
};

export default BlogAuthor;
