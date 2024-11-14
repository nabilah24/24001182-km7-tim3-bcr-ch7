import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { deleteModel, getModelDetail } from "../../services/models";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Row, Col, Card, Button, Breadcrumb, Container } from "react-bootstrap";

export const Route = createLazyFileRoute("/admin/models/$id")({
  component: ModelsDetail,
});

function ModelsDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [models, setModels] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const getModelDetailData = async (id) => {
      setLoading(true);
      const result = await getModelDetail(id);
      if (result?.success) {
        setModels(result.data);
        setIsNotFound(false);
      } else {
        setIsNotFound(true);
      }
      setLoading(false);
    };

    if (id) {
      getModelDetailData(id);
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
          <h1 className="text-center">Model is not found!</h1>
        </Col>
      </Row>
    );
  }

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
        const deleteResult = await deleteModel(id);
        if (deleteResult?.success) {
          navigate({ to: "/admin/models" });
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
          <Link to="/admin/models">Models</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Detail</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="mt-3 w-100 align-items-center justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header className="text-center py-2 fw-bold fs-5">
              Model Details
            </Card.Header>
            <Card.Body className="d-flex flex-column gap-2">
              {/* model name */}
              <Card.Title>Name: {models?.name}</Card.Title>

              {/* manufacture name */}
              <Card.Text className="mb-1 fw-semibold">
                Manufacture: {models?.manufactures?.name}
              </Card.Text>

              {/* type name */}
              <Card.Text className="mb-1">
                Country: {models?.manufactures?.country}
              </Card.Text>

              {/* rentPerDay */}
              <Card.Text className="mb-1">
                Rent Per Day: Rp {models?.rentPerDay?.toLocaleString("id-ID")}
                ,00
              </Card.Text>

              {/* transmission name */}
              <Card.Text className="mb-1">
                Transmission: {models?.transmissions?.name}
              </Card.Text>

              {/* transmission driveType */}
              <Card.Text className="mb-1">
                Drive Type: {models?.transmissions?.driveType}
              </Card.Text>
            </Card.Body>

            {user?.roleId === 1 && (
              <div className="d-flex justify-content-center gap-2 mb-3">
                <Button
                  size="md"
                  className="py-2 px-3 bg-white rounded-0 fw-semibold"
                  style={{ border: "1px solid #fa2c5a", color: "#fa2c5a" }}
                  onClick={handleDelete}
                >
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    style={{ color: "#fa2c5a" }}
                    className="me-2"
                  />
                  Delete Model
                </Button>

                <Button
                  as={Link}
                  to={`/models/edit/${id}`}
                  className="py-2 px-3 bg-success rounded-0 fw-semibold text-white border-success"
                  size="md"
                >
                  <FontAwesomeIcon icon={faPenToSquare} className="me-2" />
                  Edit Model
                </Button>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
