import { useState, useEffect } from "react";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Container,
  Button,
  Row,
  Col,
  Card,
  Form,
  Spinner,
} from "react-bootstrap";
import HeroSection from "../../components/User/Cars/HeroSection";
import FooterSection from "../../components/User/Cars/FooterSection";
import CarCard from "../../components/User/Cars/CarCard";
import { getCars } from "../../services/cars";
import { getTransmissions } from "../../services/transmissions";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faClock,
  faGear,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import Protected from "../../components/Auth/Protected";

export const Route = createLazyFileRoute("/cars/")({
  component: () => (
    <Protected roles={[2]}>
      <SearchCar />
    </Protected>
  ),
});

function SearchCar() {
  const navigate = useNavigate();

  // Query params
  const [driveType, setDriveType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [availableAt, setAvailableAt] = useState("");
  const [capacity, setCapacity] = useState(0);

  // const [cars, setCars] = useState([]);
  // const [transmissions, setTransmissions] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  const { token } = useSelector((state) => state.auth);

  const showAlert = () => {
    Swal.fire({
      icon: "warning",
      title: "Cars Not Found!",
      text: "Try other keywords",
      confirmButtonText: "OK",
    });
  };

  const showErrorAlert = () => {
    Swal.fire({
      icon: "error",
      title: "Error Fetching Cars",
      text: "Please try again later",
      confirmButtonText: "OK",
    });
  };

  // tanstack query fetch data transmissions
  const { data: transmissions } = useQuery({
    queryKey: ["transmissions"],
    queryFn: () => getTransmissions(),
  });

  const handleAvailableAt = (event) => {
    const selectedDate = event.target.value; // Format YYYY-MM-DD
    const isoDate = new Date(`${selectedDate}T00:00:00Z`).toISOString(); // Konversi ke ISO 8601
    setAvailableAt(isoDate); // Simpan dalam format ISO 8601
  };

  const fetchCars = async ({
    driveType,
    transmission,
    availableAt,
    capacity,
  }) => {
    const response = await getCars(
      driveType,
      transmission,
      availableAt,
      capacity
    );

    // if (!response.success) {
    //   throw new Error("Failed to fetch cars");
    // }

    // return response.data;

    if (response.success && response.data.length > 0) {
      return response.data;
    } else {
      showAlert();
    }
  };

  const {
    data: cars = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cars", { driveType, transmission, availableAt, capacity }],
    queryFn: () =>
      fetchCars({ driveType, transmission, availableAt, capacity }),
    enabled: false, // Only fetch when explicitly triggered
    onSuccess: (data) => {
      if (data.length === 0) {
        showAlert();
      }
    },
    onError: () => {
      showErrorAlert();
    },
  });

  // const searchCars = async () => {
  //   setIsLoading(true);
  //   const result = await getCars(
  //     driveType,
  //     transmission,
  //     availableAt,
  //     capacity
  //   );

  //   if (result.success && result.data.length > 0) {
  //     setCars(result.data);
  //     setIsLoading(false);
  //   } else {
  //     setCars([]);
  //     setIsLoading(false);
  //     showAlert();
  //   }
  // };

  // handleSearchCars untuk Form
  const handleSearchCars = (event) => {
    event.preventDefault();
    // searchCars();
    refetch();
  };

  // Redirect ke login kalau token tidak ada
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Cari Mobil */}
      <Container>
        <h3>Search Cars</h3>
        <Form onSubmit={handleSearchCars}>
          <Card
            className="mb-1 d-flex justify-content-center shadow custom-form"
            style={{ minHeight: "140px" }}
          >
            <Card.Body>
              <Row className="pt-3 gap-3">
                {/* Driver Type */}
                <Col md>
                  <Form.Group controlId="driverType">
                    <Form.Label className="d-flex align-items-center gap-1">
                      <FontAwesomeIcon
                        icon={faCar}
                        style={{ color: "#0d6efd" }}
                      />
                      Drive Type
                    </Form.Label>
                    <Form.Select
                      size="sm"
                      aria-label="Default select example"
                      value={driveType}
                      onChange={(event) => setDriveType(event.target.value)}
                    >
                      <option value="">Choose Drive Type</option>
                      {transmissions &&
                        transmissions.length > 0 &&
                        transmissions.map((trans) => (
                          <option key={trans.id} value={trans.driveType}>
                            {trans.driveType}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                {/* Transmission */}
                <Col md>
                  <Form.Group controlId="driverType">
                    <Form.Label className="d-flex align-items-center gap-1">
                      <FontAwesomeIcon
                        icon={faGear}
                        style={{ color: "#0d6efd" }}
                      />
                      Transmission
                    </Form.Label>
                    <Form.Select
                      size="sm"
                      aria-label="Default select example"
                      onChange={(event) => setTransmission(event.target.value)}
                    >
                      <option value="">Choose Transmission</option>
                      {transmissions &&
                        transmissions.length > 0 &&
                        transmissions.map((trans) => (
                          <option key={trans.id} value={trans.name}>
                            {trans.name}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                {/* Time Available */}
                <Col md>
                  <Form.Group controlId="availableAt">
                    <Form.Label className="d-flex align-items-center gap-1">
                      <FontAwesomeIcon
                        icon={faClock}
                        style={{ color: "#0d6efd" }}
                      />
                      Time Available
                    </Form.Label>
                    <Form.Control
                      type="date"
                      size="sm"
                      value={availableAt.split("T")[0]}
                      onChange={handleAvailableAt}
                    />
                  </Form.Group>
                </Col>

                {/* Total Passengers */}
                <Col md>
                  <Form.Group controlId="capacity">
                    <Form.Label className="d-flex align-items-center gap-1">
                      <FontAwesomeIcon
                        icon={faUser}
                        style={{ color: "#0d6efd" }}
                      />
                      Capacity
                    </Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                      placeholder="Input Capacity"
                    />
                  </Form.Group>
                </Col>

                {/* Search Button */}
                <Col className="text-center mt-2 d-flex justify-content-center align-items-center">
                  <Button
                    className="btn-sm button px-4 py-2 fs-6"
                    type="submit"
                    id="btn-search"
                  >
                    {isLoading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Cari Mobil"
                    )}
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Form>
      </Container>

      {/* Root/Container for Car Cards */}
      <Container>
        <Row className="mt-5 ms-1">
          {isLoading ? (
            <Col
              style={{ height: "30vh" }}
              className="d-flex justify-content-center align-items-center w-100"
            >
              <Spinner animation="border" />
            </Col>
          ) : (
            cars.map((car) => (
              <Col key={car?.id} className="px-0">
                <CarCard car={car} />
              </Col>
            ))
          )}
        </Row>
      </Container>

      {/* Footer */}
      <FooterSection />
    </>
  );
}
