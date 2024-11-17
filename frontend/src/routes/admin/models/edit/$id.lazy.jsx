import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getManufactures } from "../../../../services/manufactures";
import { getTransmissions } from "../../../../services/transmissions";
import { getModelDetail, updateModel } from "../../../../services/models";
import { toast } from "react-toastify";
import Protected from "../../../../components/Auth/Protected";
import {
  Breadcrumb,
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import { useQuery, useMutation } from "@tanstack/react-query";

export const Route = createLazyFileRoute("/admin/models/edit/$id")({
  component: () => (
    <Protected roles={[1]}>
      <EditModel />
    </Protected>
  ),
});

function EditModel() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [manufactureId, setManufactureId] = useState(0);
  const [transmissionId, setTransmissionId] = useState(0);
  const [year, setYear] = useState(null);
  const [rentPerDay, setRentPerDay] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data: manufactures } = useQuery({
    queryKey: ['manufactures'],
    queryFn: getManufactures,
    enabled: !!id,
  })

  const { data: transmissions } = useQuery({
    queryKey: ['transmissions'],
    queryFn: getTransmissions,
    enabled: !!id,
  })

  // Use react query to fetch API
  const { data, isSuccess, isError } = useQuery({
    queryKey: ["models", id],
    queryFn: () => getModelDetail(id),
    enabled: !!id,
  });

  // Adjust mutation function to include id correctly
  const { mutate: updateModelData, isPending: isUpdateProcessing } = useMutation({
    mutationFn: (model) => updateModel(id, model), // Pass id from useParams
    onSuccess: () => {
        toast.success("Model updated successfully!");
        navigate({ to: `/admin/models` });
    },
    onError: (err) => {
        toast.error(err?.message);
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      setName(data.name);
      setManufactureId(data.manufactureId);
      setTransmissionId(data.transmissionId);
      setYear(data.year);
      setRentPerDay(data.rentPerDay);
     }
 }, [isSuccess, data])

 if (isError) {
   navigate({ to: '/admin/models' })
   return
 }

  const onSubmit = async (event) => {
    event.preventDefault();

    const request = {
      name,
      manufactureId,
      transmissionId,
      year,
      rentPerDay,
    };
    updateModelData(request)
  };

  return (
    <Container className="my-4 mx-0">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/admin">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/admin/models">Models</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/admin/models/${id}`}>Detail</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Edit</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="mt-3 w-100 justify-content-center">
        <Col md={10}>
          <Card>
            <Card.Header className="text-center fw-bold fs-5">
              Add Model
            </Card.Header>
            <Card.Body>
              <Form onSubmit={onSubmit}>
                {/* Name */}
                <Form.Group as={Col} className="mb-3" controlId="name">
                  <Form.Label row sm={3}>
                    Name
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="Model Name"
                      required
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>

                {/* Manufactures */}
                <Form.Group as={Col} className="mb-3" controlId="model">
                  <Form.Label row sm={3}>
                    Manufacture
                  </Form.Label>
                  <Col>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(event) => setManufactureId(event.target.value)}
                      defaultValue="selected"
                      required
                    >
                      <option disabled value="selected">
                        Select Manufacture
                      </option>
                      {!isUpdateProcessing && manufactures &&
                        manufactures?.length > 0 &&
                        manufactures.map((manufacture) => (
                          <option
                            key={manufacture?.id}
                            value={manufacture?.id}
                            selected={manufacture.id == manufactureId}
                          >
                            {manufacture?.name}
                          </option>
                        ))}
                    </Form.Select>
                  </Col>
                </Form.Group>

                {/* Transmissions */}
                <Form.Group as={Col} className="mb-3" controlId="transmission">
                  <Form.Label row sm={3}>
                    Transmission
                  </Form.Label>
                  <Col>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(event) =>
                        setTransmissionId(event.target.value)
                      }
                      defaultValue="selected"
                      required
                    >
                      <option disabled value="selected">
                        Select Transmission
                      </option>
                      {!isUpdateProcessing && transmissions &&
                        transmissions?.length > 0 &&
                        transmissions.map((transmission) => (
                          <option
                            key={transmission?.id}
                            value={transmission?.id}
                            selected={transmission.id == transmissionId}
                          >
                            {transmission?.name}
                          </option>
                        ))}
                    </Form.Select>
                  </Col>
                </Form.Group>

                {/* year */}
                <Form.Group controlId="year">
                  <Form.Label>Year</Form.Label>
                  <Form.Control
                    type="number"
                    value={year}
                    onChange={(event) => setYear(event.target.value)}
                    placeholder="Enter Year"
                  />
                </Form.Group>

                {/* rentPerDay */}
                <Form.Group controlId="rentPerDay" className="mt-3">
                  <Form.Label>Rent per Day</Form.Label>
                  <Form.Control
                    type="number"
                    value={rentPerDay}
                    onChange={(event) => setRentPerDay(event.target.value)}
                    placeholder="Enter Rent Per Day"
                  />
                </Form.Group>
                <div className="d-grid gap-2 mt-3">
                  <Button type="submit" variant="primary">
                    Submit
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}></Col>
      </Row>
    </Container>
  );
}
