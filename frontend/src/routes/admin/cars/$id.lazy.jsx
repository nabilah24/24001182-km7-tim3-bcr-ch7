import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { deleteCar, getCarDetail } from "../../../services/cars";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  Breadcrumb,
  Container,
  ListGroup,
  Row,
  Col,
  Card,
  Button,
} from "react-bootstrap";
import Protected from "../../../components/Auth/Protected";

export const Route = createLazyFileRoute("/admin/cars/$id")({
  component: () => (
    <Protected roles={[1]}>
      <CarsDetail />
    </Protected>
  ),
});

function CarsDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

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

  if (loading) {
    return (
      <Row className="mt-5">
        <Col>
          <h1 className="text-center">Loading...</h1>
        </Col>
      </Row>
    );
  }

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

  const handleDelete = async (event) => {
    event.preventDefault();

    Swal.fire({
      title: "Confirm to delete",
      text: "Are you sure to delete this data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#0d6efd",
      cancelButtonText: "No",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteResult = await deleteCar(id);
        if (deleteResult?.success) {
          navigate({ to: "/admin/cars" });
        } else {
          toast.error(deleteResult?.message);
        }
      }
    });
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
        <Breadcrumb.Item active>Detail</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="mt-4 w-100 align-items-center justify-content-center">
        <Col md={10}>
          <Card>
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
                    Rp {car?.models?.rentPerDay?.toLocaleString("id-ID")} / Hari
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

            {user?.roleId === 1 && (
              <div className="d-flex justify-content-center gap-2 mb-3">
                <Button
                  size="md"
                  className="py-2 px-5 bg-white rounded-0 fw-semibold"
                  style={{ border: "1px solid #fa2c5a", color: "#fa2c5a" }}
                  onClick={handleDelete}
                >
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    style={{ color: "#fa2c5a" }}
                    className="me-2"
                  />
                  Delete
                </Button>

                <Button
                  as={Link}
                  to={`/admin/cars/edit/${id}`}
                  className="py-2 px-5 bg-success rounded-0 fw-semibold text-white border-success"
                  size="md"
                >
                  <FontAwesomeIcon icon={faPenToSquare} className="me-2" />
                  Edit Car
                </Button>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
