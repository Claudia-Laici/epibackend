import { useEffect, useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

const Login = () => {
  const navigate = useNavigate();
  const { error, fetchData } = useFetch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/", { replace: true });
    }
  }, [navigate]);

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
      const data = await fetchData(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5 p-5">
      <h1 className="mb-4 pt-5">Accedi</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
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
        <div className="d-grid mt-3 gap-3">
          <Button type="submit" disabled={loading}>
            {loading ? "Accesso..." : "Accedi"}
          </Button>

          <div className="d-flex align-items-center gap-3 my-2">
            <hr className="flex-grow-1" />
            <span className="text-muted small">oppure</span>
            <hr className="flex-grow-1" />
          </div>

          <Button
            variant="outline-dark"
            onClick={() =>
              (window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`)
            }
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt=""
              width="18"
              height="18"
              className="me-2"
            />
            Accedi con Google
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Login;
