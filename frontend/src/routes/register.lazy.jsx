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
import { register } from "../services/auth";
import { useMutation } from "@tanstack/react-query";
import { CarAuth } from "../../img";

export const Route = createLazyFileRoute("/register")({
  component: Register,
});

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(undefined);

  if (token && user) {
    if (user?.roleId === 1) {
      navigate({ to: "/admin" }); // Redirect to admin page
    } else if (user?.roleId === 2) {
      navigate({ to: "/cars" }); // Redirect to user home page
    }
  }

  // Mutation is used for POST, PUT, PATCH and DELETE
  const { mutate: registerUser } = useMutation({
    mutationFn: (body) => {
      return register(body);
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

    // Ensure password and confirm password are the same
    if (password != confirmPassword) {
      toast.error("Password and password confirmation must be same!");
    }

    /* hit the register API */
    // define the request body
    const request = {
      name,
      email,
      password,
      profilePicture,
    };

    // hit the register API with the data
    registerUser(request);
  };

  return (
    <Container fluid className="d-flex vh-80 p-0">
      <Row className="w-100 m-0">
        {/* Left side with image */}
        <Col
          md={6}
          style={{
            backgroundImage: `${CarAuth}`,
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
              maxWidth: "500px",
              padding: "0.5rem",
            }}
          >
            <div className="text-body-secondary fs-5 fw-bold mb-3">
              BINAR CAR RENTAL
            </div>
            <h4 className="fw-bold">Welcome!</h4>
            <Form onSubmit={onSubmit}>
              <Form.Group
                as={Row}
                className="mb-1 d-flex flex-column"
                controlId="name"
              >
                <Form.Label column sm={6}>
                  Name
                </Form.Label>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Complete Name"
                    required
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-1 d-flex flex-column"
                controlId="email"
              >
                <Form.Label column sm={6}>
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
                className="mb-1 d-flex flex-column"
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

              <Form.Group
                as={Row}
                className="mb-1 d-flex flex-column"
                controlId="confirmPassword"
              >
                <Form.Label column>Confirm Password</Form.Label>
                <Col>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-2 d-flex flex-column"
                controlId="profilePicture"
              >
                <Form.Label column>Profile Picture</Form.Label>
                <Col>
                  <Form.Control
                    type="file"
                    placeholder="Choose Image (jpeg, jpg, png)"
                    required
                    onChange={(event) => {
                      setProfilePicture(event.target.files[0]);
                    }}
                    accept=".jpeg, .jpg, .png"
                  />
                </Col>
              </Form.Group>
              <div className="d-grid gap-2 mt-4">
                <Button type="submit" variant="primary" className="rounded-1">
                  Sign Up
                </Button>
              </div>
            </Form>

            <Container id="alternative">
              <div className="text-body-secondary fs-6 mt-2 text-center">
                Already have an account? <Link to="/login">Sign In</Link>
              </div>
            </Container>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
