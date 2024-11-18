import { createLazyFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { getDetailTypeCar, updateTypeCar } from "../../../../services/types";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@tanstack/react-query";
import Protected from "../../../../components/Auth/Protected";

export const Route = createLazyFileRoute("/admin/types/edit/$id")({
  component: () => (
    <Protected roles={[1]}>
      <EditTypeCar />
    </Protected>
  ),
});

function EditTypeCar() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");

  // Use react query to fetch API
  const { data, isSuccess, isError } = useQuery({
    queryKey: ["types", id],
    queryFn: () => getDetailTypeCar(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (isSuccess && data) {
       setName(data.name)
       setDescription(data.description)
       setCapacity(data.capacity)
     }
 }, [isSuccess, data])
  
  if (isError) {
    navigate({ to: "/types" });
    return;
  }

  // Adjust mutation function to include id correctly
  const { mutate: updateTypeData } = useMutation({
    mutationFn: (type) => updateTypeCar(id, type), // Pass id from useParams
    onSuccess: () => {
        toast.success("Type updated successfully!");
        navigate({ to: `/admin/types` });
    },
    onError: (err) => {
        toast.error(err?.message);
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    // Ensure capacity is a number
    const request = {
      name,
      description,
      capacity: parseInt(capacity, 10), // Convert to number
    };

    updateTypeData(request);
  }
  return (
    <Container className="my-4">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/admin">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/admin/types">Types</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/admin/types/${id}`}>Detail</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Edit</Breadcrumb.Item>
      </Breadcrumb>
      <Row className="mt-5">
        <Col md={9}>
          <Card>
            <Card.Header as="h5" className="text-center">
              Edit Car Type
            </Card.Header>
            <Card.Body>
              <Form onSubmit={onSubmit}>
                <Form.Group as={Row} className="mb-4" controlId="name">
                  <Form.Label column sm={3}>
                    Name
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      required
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="description">
                  <Form.Label column sm={3}>
                    Description
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      placeholder="Description"
                      required
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="capacity">
                  <Form.Label column sm={3}>
                    Capacity
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="number"
                      placeholder="Capacity"
                      required
                      value={capacity}
                      onChange={(event) => setCapacity(event.target.value)}
                    />
                  </Col>
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button type="submit" variant="primary">
                    Edit Car Type
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
