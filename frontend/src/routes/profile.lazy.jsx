import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import Protected from "../components/Auth/Protected";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export const Route = createLazyFileRoute("/profile")({
  component: () => (
    <Protected roles={[2]}>
      <UserProfile />
    </Protected>
  ),
});

function UserProfile() {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      navigate({ to: "/login" });
    }
  }, [navigate, token]);

  return (
    <Container style={{ marginTop: "13vh" }} className="mb-3">
      <Row className="d-flex align-items-center justify-content-center">
        <Col md={7}>
          <Card className="rounded-0">
            <Card.Title className="ps-3 py-1">User Profile</Card.Title>
            <Card.Body className="pt-0">
              <Card.Img
                variant="top"
                src={user?.profilePicture}
                className="mb-3"
              />
              <Card.Title>{user?.name}</Card.Title>
              <Card.Text className="d-flex align-items-center">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="fs-4 me-2"
                  style={{ color: "#0d6efd" }}
                />
                {user?.email}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
