import { Card } from "react-bootstrap";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const CarItem = ({ car }) => {
  const startRent = new Date(car.availableAt);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card
      style={{ width: "18rem" }}
      className="shadow-sm text-decoration-none rounded-1 me-3 mb-3 py-3"
    >
      <Card.Img variant="top" src={car?.image} />
      <Card.Body>
        <Card.Text className="mb-1">
          {car?.models?.name} / {car?.types?.name}
        </Card.Text>
        <Card.Title className="fs-5">
          Rp {car?.models?.rentPerDay?.toLocaleString("id-ID")} / Hari
        </Card.Title>
        {car?.available ? (
          <Card.Text className="fs-6">Status: Available</Card.Text>
        ) : (
          <Card.Text className="fs-6">Status: Not Available</Card.Text>
        )}
        <Card.Text className="fs-6">
          Start Rent {formatDate(startRent)}
        </Card.Text>
      </Card.Body>

      <Button
        as={Link}
        to={`/cars/${car?.id}`}
        className="py-2 px-3 bg-primary rounded-0 fw-semibold text-white border-primary"
        size="md"
      >
        Car Details
      </Button>
    </Card>
  );
};

export default CarItem;
