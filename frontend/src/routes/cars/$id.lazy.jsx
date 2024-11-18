import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faClipboardCheck,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  Container,
  ListGroup,
  Row,
  Col,
  Card,
  Button,
  Spinner,
} from "react-bootstrap";
import { getCarDetail } from "../../services/cars";

export const Route = createLazyFileRoute("/cars/$id")({
  component: CarsDetail,
});

function CarsDetail() {
  const { id } = Route.useParams();

  const { user } = useSelector((state) => state.auth);

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const getCarDetailData = async (id) => {
      setLoading(true);
      const result = await getCarDetail(id);
      if (result?.success) {
        setCar(result.data);
        setIsNotFound(false);
      } else {
        setIsNotFound(true);
      }
      setLoading(false);
    };

    if (id) {
      getCarDetailData(id);
    }
  }, [id]);

  if (isNotFound) {
    return (
      <Row className="mt-5">
        <Col>
          <h1 className="text-center">Car is not found!</h1>
        </Col>
      </Row>
    );
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleRent = async () => {
    Swal.fire({
      title: "Confirm to rent car",
      text: "Are you sure you want to rent this car?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#0d6efd",
      cancelButtonText: "No",
      reverseButtons: true,
    });
  };

  return (
    <Container style={{ marginTop: "15vh", marginBottom: "5vh" }}>
      <Row className="mt-4 w-100 align-items-center justify-content-center">
        {loading ? (
          <Col
            style={{ height: "30vh" }}
            className="d-flex justify-content-center align-items-center w-100"
          >
            <Spinner animation="border" />
          </Col>
        ) : (
          <Col md={10}>
            <Card className="rounded-0">
              <Card.Body>
                <Row>
                  <Col md={8}>
                    {/* manufacture name and model name */}
                    <Card.Title>
                      {car?.models?.manufactures?.name} {car?.models?.name}{" "}
                    </Card.Title>

                    {/* car image */}
                    <Card.Img variant="top" src={car?.image} />

                    {/* rentPerDay */}
                    <Card.Title className="fs-5 mb-2 mt-4">
                      Rp {car?.models?.rentPerDay?.toLocaleString("id-ID")} /
                      Hari
                    </Card.Title>

                    {/* type name */}
                    <Card.Text className="mb-1">
                      Car Type: {car?.types?.name}
                    </Card.Text>

                    {/* availableAt */}
                    <Card.Text className="mb-1">
                      Start Rent: {formatDate(car?.availableAt)}
                    </Card.Text>

                    {/* transmission name */}
                    <Card.Text className="mb-1">
                      Transmission: {car?.models?.transmissions?.name}
                    </Card.Text>

                    {/* transmission driveType */}
                    <Card.Text className="mb-1">
                      Drive Type: {car?.models?.transmissions?.driveType}
                    </Card.Text>

                    {/* car description */}
                    <label className="mt-2 fw-semibold">Description</label>
                    <Card.Text className="mb-2">{car?.description}</Card.Text>
                  </Col>
                  <Col>
                    {/* car options */}
                    <label className="mt-3 fw-semibold">Options</label>
                    <ListGroup>
                      {car?.options.map((option, index) => (
                        <ListGroup.Item key={index}>{option}</ListGroup.Item>
                      ))}
                    </ListGroup>
                    {/* car specs */}
                    <label className="mt-3 fw-semibold">Specifications</label>
                    <ListGroup>
                      {car?.specs.map((spec, index) => (
                        <ListGroup.Item key={index}>{spec}</ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Col>
                </Row>
              </Card.Body>

              <Container className="d-flex justify-content-center gap-2 mb-3">
                {user?.roleId === 2 && (
                  <>
                    <Button
                      as={Link}
                      size="md"
                      variant="primary"
                      className="py-2 px-5 rounded-0 fw-semibold"
                      to="/cars"
                    >
                      <FontAwesomeIcon
                        icon={faArrowLeft}
                        style={{ color: "#fff" }}
                        className="me-2"
                      />
                      Go Back
                    </Button>
                    <Button
                      size="md"
                      variant="danger"
                      className="py-2 px-5 rounded-0 fw-semibold"
                      onClick={handleRent}
                    >
                      <FontAwesomeIcon
                        icon={faKey}
                        style={{ color: "#fff" }}
                        className="me-2"
                      />
                      Rent Car
                    </Button>
                  </>
                )}
              </Container>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
}
