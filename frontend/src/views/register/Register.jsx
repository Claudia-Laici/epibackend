import { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    password: "",
  });

  const { error, fetchData } = useFetch();
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

const handleSubmit = async (event) => {
  event.preventDefault();
  setLoading(true);

  try {
    await fetchData(`${process.env.REACT_APP_API_URL}/authors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    navigate("/login");
  } catch (e){
    console.log(e)
  } finally {
    setLoading(false);
  }
};


  return (
    <Container className="my-5 p-5">
      <h1 className="mb-4 pt-5">Registrati</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            minLength={2}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cognome</Form.Label>
          <Form.Control
            name="cognome"
            value={formData.cognome}
            onChange={handleChange}
            required
            minLength={2}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button type="submit" disabled={loading}>
          {loading ? "Registrazione..." : "Registrati"}
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
