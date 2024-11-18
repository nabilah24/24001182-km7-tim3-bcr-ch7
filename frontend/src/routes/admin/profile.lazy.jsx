import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { useEffect } from "react";
import { Breadcrumb, Container } from "react-bootstrap";
import Protected from "../../components/Auth/Protected";

export const Route = createLazyFileRoute("/admin/profile")({
  component: () => (
    <Protected roles={[1]}>
      <Profile />
    </Protected>
  ),
  component: () => (
    <Protected roles={[1]}>
      <AdminProfile />
    </Protected>
  ),
});

function AdminProfile() {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      navigate({ to: "/login" });
    }
  }, [navigate, token]);

  return (
    <Container className="my-4 mx-0">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/admin">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Profile</Breadcrumb.Item>
      </Breadcrumb>

      <div>
        <h4 className="fw-bold">User Profile</h4>
      </div>

      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Img variant="top" src={user?.profilePicture} />
            <Card.Body>
              <Card.Title>{user?.name}</Card.Title>
              <Card.Text>{user?.email}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
