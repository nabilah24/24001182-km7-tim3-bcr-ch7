import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getModels } from "../../../services/models";
import { getTypeCars } from "../../../services/types";
import { createCar } from "../../../services/cars";
import { toast } from "react-toastify";
import Protected from "../../../components/Auth/Protected";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Image,
  Breadcrumb,
  Container,
  InputGroup,
  ListGroup,
} from "react-bootstrap";
import NoImage from "../../../../img/no-image.jpg";
import { useMutation, useQuery } from "@tanstack/react-query";

export const Route = createLazyFileRoute("/admin/cars/create")({
  component: () => (
    <Protected roles={[1]}>
      <CreateCar />
    </Protected>
  ),
});

function CreateCar() {
  const navigate = useNavigate();

  const [plate, setPlate] = useState("");
  const [modelId, setModelId] = useState(0);
  const [typeId, setTypeId] = useState(0);
  const [availableAt, setAvailableAt] = useState("");
  const [available, setAvailable] = useState(false);
  const [image, setImage] = useState(undefined);
  const [currentImage, setCurrentImage] = useState(undefined);

  // Options and Specs
  const [options, setOptions] = useState([]);
  const [inputOptions, setInputOptions] = useState("");
  const [specs, setSpecs] = useState([]);
  const [inputSpecs, setInputSpecs] = useState("");

  const { data: models } = useQuery({
    queryKey: ['models'],
    queryFn: () => getModels(),
  })

  const { data: types } = useQuery({
    queryKey: ['types'],
    queryFn: () => getTypeCars(),
  })

  const { mutate: createCarData } = useMutation({
    mutationFn: (request) => createCar(request),
    onSuccess: () => {
      navigate({ to: '/admin/cars' })
    },
    onError: (error) => {
      toast.error(error?.message)
    },
  })
  // ------ handle description input --------
  const [description, setDescription] = useState("");
  const textMaxLength = 250;

  // ------ Input Array Options -----------
  // Fungsi untuk menambah item ke array options
  const addOptionItem = () => {
    if (inputOptions.trim() === "") {
      toast.error("Input for Options is required");
      return;
    }
    setOptions([...options, inputOptions]); // Tambahkan item baru ke array
    setInputOptions(""); // Kosongkan input
  };

  // Fungsi untuk mengedit item di array options
  const editOptionItem = (index, newOption) => {
    const newOptions = [...options];
    newOptions[index] = newOption;
    setOptions(newOptions);
  };

  // Fungsi untuk menghapus item dari array options
  const removeOptionItem = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  // ------ Input Array Specs -----------
  // Fungsi untuk menambah item ke array specs
  const addSpecItem = () => {
    if (inputSpecs.trim() === "") {
      toast.error("Input for Specs is required");
      return;
    }
    setSpecs([...specs, inputSpecs]); // Tambahkan item baru ke array
    setInputSpecs(""); // Kosongkan input
  };

  // Fungsi untuk mengedit item di array specs
  const editSpecItem = (index, newSpec) => {
    const newSpecs = [...specs];
    newSpecs[index] = newSpec;
    setSpecs(newSpecs);
  };

  // Fungsi untuk menghapus item dari array specs
  const removeSpecItem = (index) => {
    const newSpecs = specs.filter((_, i) => i !== index);
    setSpecs(newSpecs);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const request = {
      plate,
      modelId,
      typeId,
      description,
      availableAt,
      available,
      image,
      options,
      specs,
    };
    createCarData(request)
  };

  return (
    <Container className="my-4 mx-0">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/admin">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/admin/cars">Cars</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Create</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="mt-3 w-100 justify-content-center">
        <Col md={12}>
          <Card>
            <Card.Header className="text-center fw-bold fs-5">
              Add Car
            </Card.Header>
            <Card.Body>
              <Form onSubmit={onSubmit}>
                <Row>
                  <Col lg={6}>
                    {/* Plate */}
                    <Form.Group as={Col} className="mb-3" controlId="plate">
                      <Form.Label row sm={3}>
                        Plate
                      </Form.Label>
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="Name"
                          required
                          value={plate}
                          onChange={(event) => {
                            setPlate(event.target.value);
                          }}
                        />
                      </Col>
                    </Form.Group>

                    {/* Models */}
                    <Form.Group as={Col} className="mb-3" controlId="model">
                      <Form.Label row sm={3}>
                        Model
                      </Form.Label>
                      <Col>
                        <Form.Select
                          aria-label="Default select example"
                          onChange={(event) => setModelId(event.target.value)}
                          defaultValue="selected"
                          required
                        >
                          <option disabled value="selected">
                            Select Model
                          </option>
                          {models && models?.length > 0 &&
                            models.map((model) => (
                              <option key={model?.id} value={model?.id}>
                                {model?.name}
                              </option>
                            ))}
                        </Form.Select>
                      </Col>
                    </Form.Group>

                    {/* Types */}
                    <Form.Group as={Col} className="mb-3" controlId="type">
                      <Form.Label row sm={3}>
                        Type
                      </Form.Label>
                      <Col>
                        <Form.Select
                          aria-label="Default select example"
                          onChange={(event) => setTypeId(event.target.value)}
                          defaultValue="selected"
                          required
                        >
                          <option disabled value="selected">
                            Select Type
                          </option>
                          {types && types?.length > 0 &&
                            types.map((type) => (
                              <option key={type?.id} value={type?.id}>
                                {type?.name}
                              </option>
                            ))}
                        </Form.Select>
                      </Col>
                    </Form.Group>

                    {/* description */}
                    <Form.Group as={Col} controlId="textArea">
                      <Form.Label column sm={3}>
                        Enter Text
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        type="text"
                        rows={6}
                        maxLength={textMaxLength}
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Type your car description here..."
                      />
                    </Form.Group>
                    <small className="form-text text-muted">
                      {description.length} / {textMaxLength} characters
                    </small>

                    {/* availableAt */}
                    <Form.Group
                      as={Col}
                      className="my-3"
                      controlId="availableAt"
                    >
                      <Form.Label column sm={4}>
                        Available At
                      </Form.Label>
                      <Form.Control
                        type="datetime-local"
                        name="availableAt"
                        value={availableAt}
                        onChange={(event) => setAvailableAt(event.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    {/* available */}
                    <Form.Group as={Col} className="mb-3" controlId="available">
                      <Form.Check
                        type="checkbox"
                        label="Available"
                        name="available"
                        checked={available}
                        onChange={(event) => setAvailable(event.target.checked)}
                        required
                      />
                    </Form.Group>

                    {/* Image */}
                    <Form.Group as={Col} className="mb-3" controlId="image">
                      <Form.Label row sm={3}>
                        Car Image
                      </Form.Label>
                      <Col>
                        <Form.Control
                          type="file"
                          placeholder="Choose Image"
                          required
                          onChange={(event) => {
                            setImage(event.target.files[0]);
                            setCurrentImage(
                              URL.createObjectURL(event.target.files[0])
                            );
                          }}
                          accept=".jpeg,.jpg,.png"
                        />
                      </Col>
                    </Form.Group>

                    {/* Current Image */}
                    <Form.Group
                      as={Col}
                      className="mb-3"
                      controlId="currentImage"
                    >
                      <Form.Label row sm={3}>
                        Current Image
                      </Form.Label>
                      <Col sm={9}>
                        {currentImage ? (
                          <Image src={currentImage} fluid />
                        ) : (
                          <Image src={NoImage} fluid className="w-75" />
                        )}
                      </Col>
                    </Form.Group>

                    {/* Options dan Specs */}
                    <Form.Group as={Col} className="container mt-3">
                      <Form.Label row sm={3}>
                        Options
                      </Form.Label>
                      <InputGroup className="mb-3">
                        <Form.Control
                          type="text"
                          value={inputOptions}
                          onChange={(e) => setInputOptions(e.target.value)}
                          placeholder="Add Option Item"
                        />
                        <Button variant="primary" onClick={addOptionItem}>
                          Add
                        </Button>
                      </InputGroup>

                      <ListGroup>
                        {options.map((item, index) => (
                          <ListGroup.Item
                            key={index}
                            className="d-flex justify-content-between align-items-center"
                          >
                            <InputGroup>
                              <Form.Control
                                type="text"
                                value={item}
                                onChange={(e) =>
                                  editOptionItem(index, e.target.value)
                                }
                              />
                              <Button
                                variant="danger"
                                onClick={() => removeOptionItem(index)}
                              >
                                Remove
                              </Button>
                            </InputGroup>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>

                      {/* Specs */}
                      <Form.Label row sm={3} className="mt-3">
                        Specs
                      </Form.Label>
                      <InputGroup className="mb-3">
                        <Form.Control
                          type="text"
                          value={inputSpecs}
                          onChange={(e) => setInputSpecs(e.target.value)}
                          placeholder="Add Spec Item"
                        />
                        <Button variant="primary" onClick={addSpecItem}>
                          Add
                        </Button>
                      </InputGroup>

                      <ListGroup>
                        {specs.map((item, index) => (
                          <ListGroup.Item
                            key={index}
                            className="d-flex justify-content-between align-items-center"
                          >
                            <InputGroup>
                              <Form.Control
                                type="text"
                                value={item}
                                onChange={(e) =>
                                  editSpecItem(index, e.target.value)
                                }
                              />
                              <Button
                                variant="danger"
                                onClick={() => removeSpecItem(index)}
                              >
                                Remove
                              </Button>
                            </InputGroup>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Form.Group>
                  </Col>
                  <div className="d-grid gap-2 mt-3">
                    <Button type="submit" variant="primary">
                      Add
                    </Button>
                  </div>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}></Col>
      </Row>
    </Container>
  );
}
