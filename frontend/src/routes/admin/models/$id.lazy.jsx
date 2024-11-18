import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { deleteModel, getModelDetail } from "../../../services/models";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  Row,
  Col,
  Card,
  Button,
  Breadcrumb,
  Container,
  Spinner,
} from "react-bootstrap";
import { useQuery, useMutation } from "@tanstack/react-query";
import Protected from "../../../components/Auth/Protected";

export const Route = createLazyFileRoute("/admin/models/$id")({
  component: () => (
    <Protected roles={[1]}>
      <ModelsDetail />
    </Protected>
  ),
});

function ModelsDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [models, setModels] = useState(null);

  // Use react query to fetch API
  const { data, isSuccess, isPending, isError } = useQuery({
    queryKey: ["models", id],
    queryFn: () => getModelDetail(id),
    enabled: !!id,
  });

  const { mutate: deleting, isPending: isDeleteProcessing } = useMutation({
    mutationFn: () => deleteModel(id),
    onSuccess: () => {
      navigate({ to: "/admin/models" });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setModels(data);
    }
  }, [data, isSuccess]);

  if (isPending) {
    return (
      <Row className="mt-5">
        <Col>
          <h1 className="text-center">Loading...</h1>
        </Col>
      </Row>
    );
  }

  if (isError) {
    return (
      <Row className="mt-5">
        <Col className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden"></span>
          </Spinner>
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
        const deleteResult = deleting(id);
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
                  disabled={isDeleteProcessing}
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
                  to={`/admin/models/edit/${id}`}
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
