import { createLazyFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { createManufacture } from "../../services/manufactures";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Card from "react-bootstrap/Card";
import Protected from "../../components/Auth/Protected";

export const Route = createLazyFileRoute("/admin/manufactures/create")({
  component: () => (
    <Protected roles={[1]}>
      <CreateManufacture />
    </Protected>
  ),
});

function CreateManufacture() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [country, setCountry] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    const request = {
      name,
      country,
    };
    const result = await createManufacture(request);
    if (result?.success) {
      navigate({ to: "/manufactures" });
      return;
    }

    toast.error(result?.message);
  };
  return (
    <Container className="my-4">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/admin">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/admin/manufactures">Manufactures</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Create</Breadcrumb.Item>
      </Breadcrumb>
      <h4 className="fw-bold mb-3">Create Manufacture</h4>
      <Row className="mt-5">
        <Col md={9}>
          <Card>
            <Card.Header as="h5" className="text-center">
              Create Manufacture
            </Card.Header>
            <Card.Body>
              <Form onSubmit={onSubmit}>
                <Form.Group as={Row} className="mb-4" controlId="name">
                  <Form.Label column sm={3} className="fw-semibold">
                    Name :
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      placeholder="Enter manufacture name"
                      required
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-4" controlId="country">
                  <Form.Label column sm={3} className="fw-semibold">
                    Country :
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      placeholder="Enter country"
                      required
                      value={country}
                      onChange={(event) => setCountry(event.target.value)}
                    />
                  </Col>
                </Form.Group>
                <Row className="mt-4">
                  <Col className="text-center">
                    <Button variant="primary" type="submit" className="me-2">
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
