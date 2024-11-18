import { Card, Button } from "react-bootstrap";
import { Link } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faCogs,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const CarCard = ({ car }) => {
  return (
    <Card
      style={{ width: "18rem" }}
      className="rounded overflow-hidden wow fadeInUp"
      data-wow-delay="0.1s"
    >
      <Card.Img src={car?.image} variant="top" alt="Car" height="200" />
      <Card.Body>
        <Card.Title className="fs-6">
          {car?.models?.manufactures?.name} {car?.models?.name} /{" "}
          {car?.types?.name}
        </Card.Title>
        <Card.Subtitle className="fs-5 fw-bold">
          Rp {car?.models?.rentPerDay?.toLocaleString("id-ID")} / Hari
        </Card.Subtitle>
        <Card.Text>{car?.description}</Card.Text>
        <div style={{ listStyle: "none", marginTop: "-15px" }}>
          <div
            className="d-flex gap-2 align-items-center"
            style={{ marginBottom: "-15px" }}
          >
            <FontAwesomeIcon icon={faUsers} className="fs-5" />
            <p style={{ marginTop: "12px" }}>{car?.types?.name} Orang</p>
          </div>
          <div
            className="d-flex gap-2 align-items-center"
            style={{ marginBottom: "-15px" }}
          >
            <FontAwesomeIcon icon={faCogs} className="fs-5" />
            <p style={{ marginTop: "12px" }}>
              {car?.models?.transmissions?.name}
            </p>
          </div>
          <div
            className="d-flex gap-2 align-items-center"
            style={{ marginBottom: "-15px" }}
          >
            <FontAwesomeIcon icon={faCalendarAlt} className="fs-5" />
            <p style={{ marginTop: "12px" }}>Tahun {car?.models?.year}</p>
          </div>
        </div>
        <Button
          as={Link}
          to={`/cars/${car?.id}`}
          variant="primary"
          className="col-lg-12 mt-4"
        >
          Lihat Detail
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CarCard;
