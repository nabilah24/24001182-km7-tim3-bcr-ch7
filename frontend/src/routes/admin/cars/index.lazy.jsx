import { useState, useEffect } from "react";
import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Row, Col, Button, Container, Breadcrumb } from "react-bootstrap";
import { useSelector } from "react-redux";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCars } from "../../../services/cars";
import CarItem from "../../../components/CarItem";
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
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getCarsData = async () => {
      setLoading(true);

      const result = await getCars();
      console.log(result);
      if (result.success) {
        setCars(result.data);
      }
      setLoading(false);
    };

    // Check if there any token
    if (token) {
      getCarsData();
    } else {
      navigate({ to: "/login" });
    }
  }, [navigate, token]);

  if (loading) {
    return (
      <Row className="mt-4">
        <h1>Loading...</h1>
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
