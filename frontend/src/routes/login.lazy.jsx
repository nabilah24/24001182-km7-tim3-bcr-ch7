import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/slices/auth";
import { login } from "../services/auth";
import { useMutation } from "@tanstack/react-query";
import { CarAuth } from "../../img";

export const Route = createLazyFileRoute("/login")({
  component: Login,
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, user } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (token && user) {
    if (user?.roleId === 1) {
      navigate({ to: "/admin" }); // Redirect to admin page
    } else if (user?.roleId === 2) {
      navigate({ to: "/cars" }); // Redirect to user home page
    }
  }

  // Mutation is used for POST, PUT, PATCH and DELETE
  const { mutate: loginUser } = useMutation({
    mutationFn: (body) => {
      return login(body);
    },
    onSuccess: (data) => {
      // set token to global state
      dispatch(setToken(data?.token));

      // Check roleId and redirect accordingly
      if (data?.user?.roleId === 1) {
        navigate({ to: "/admin" }); // Redirect to admin page
      } else if (data?.user?.roleId === 2) {
        navigate({ to: "/cars" }); // Redirect to user home page
      }
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    /* hit the login API */
    // define the request body
    const body = {
      email,
      password,
    };

    // hit the login API with the data
    loginUser(body);
  };

  return (
    <Container fluid className="d-flex vh-80 p-0">
      <Row className="w-100 m-0">
        {/* Left side with image */}
        <Col
          md={6}
          style={{
            backgroundImage: `${CarAuth}`, // Replace with your image URL
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
          }}
        ></Col>

        {/* Right side with form */}
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <Container
            style={{
              width: "100%",
              maxWidth: "400px",
              padding: "1rem",
            }}
          >
            <div className="text-body-secondary fs-5 fw-bold mb-3">
              BINAR CAR RENTAL
            </div>
            <h4 className="fw-bold">Welcome Back!</h4>
            <Form onSubmit={onSubmit}>
              <Form.Group
                as={Row}
                className="mb-3 d-flex flex-column"
                controlId="email"
              >
                <Form.Label column sm={3}>
                  Email
                </Form.Label>
                <Col>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3 d-flex flex-column"
                controlId="password"
              >
                <Form.Label column sm={3}>
                  Password
                </Form.Label>
                <Col>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <div className="d-grid gap-2">
                <Button type="submit" variant="primary" className="rounded-1">
                  Sign In
                </Button>
              </div>
            </Form>

            <Container id="alternative">
              <div className="text-body-secondary fs-6 mt-3 text-center">
                Don't have an account? <Link href="/register">Sign Up</Link>
              </div>
            </Container>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
