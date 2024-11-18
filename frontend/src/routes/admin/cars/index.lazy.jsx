import { useState, useEffect } from "react";
import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Row,
  Col,
  Button,
  Container,
  Breadcrumb,
  Spinner,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCars } from "../../../services/cars";
import { useQuery } from "@tanstack/react-query";
import CarItem from "../../../components/Admin/CarItem";
import Protected from "../../../components/Auth/Protected";

export const Route = createLazyFileRoute("/admin/cars/")({
  component: () => (
    <Protected roles={[1]}>
      <CarsIndex />
    </Protected>
  ),
});

function CarsIndex() {
  const { user, token } = useSelector((state) => state.auth);

  const [cars, setCars] = useState([]);

  const { data, isSuccess, isPending } = useQuery({
    queryKey: ["cars"],
    queryFn: () => getCars(),
    enabled: !!token,
  });

  useEffect(() => {
    if (isSuccess) {
      setCars(data);
    }
  }, [data, isSuccess]);

  if (isPending) {
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

  return (
    <Container className="my-4">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/admin">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Cars</Breadcrumb.Item>
      </Breadcrumb>

      <div className="d-flex justify-content-between">
        <div>
          <h4 className="fw-bold">Cars List</h4>
        </div>
        <div>
          {user && user?.roleId === 1 && (
            <Button
              variant="primary"
              className="rounded-0"
              as={Link}
              to="/admin/cars/create"
            >
              <FontAwesomeIcon icon={faPlus} className="me-3" />
              <span>Create Car</span>
            </Button>
          )}
        </div>
      </div>
      <Row className="mt-4 ms-1">
        {cars.length === 0 ? (
          <h1>Cars data is not found!</h1>
        ) : (
          cars.map((car) => <CarItem car={car} key={car?.id} />)
        )}
      </Row>
    </Container>
  );
}
