import {
  faChevronRight,
  faEnvelope,
  faLocation,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faWhatsapp,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@tanstack/react-router";
import { Container, Row, Col } from "react-bootstrap";

function HeroSection() {
  return (
    <Container className="container-fluid footer mt-5 py-5">
      <Row className="g-5">
        {/* Address Column */}
        <Col lg={3} md={6}>
          <div className="mb-3 mt-1 d-flex align-items-center gap-3">
            <FontAwesomeIcon
              icon={faLocation}
              style={{ color: "#0d6efd" }}
              className="fs-5"
            />
            Jalan Suroyo No. 161 Mayangan Kota Probolinggo 672000
          </div>
          <div className="mb-3 d-flex align-items-center gap-3">
            <FontAwesomeIcon
              icon={faEnvelope}
              style={{ color: "#0d6efd" }}
              className="fs-5"
            />
            binarcarrental@gmail.com
          </div>
          <div className="mb-3 d-flex align-items-center gap-3">
            <FontAwesomeIcon
              icon={faPhone}
              style={{ color: "#0d6efd" }}
              className="fs-5"
            />
            081-233-334-808
          </div>
        </Col>

        {/* Links Column */}
        <Col lg={3} md={6} className="d-flex flex-column justify-content-end">
          <Link to="index.html#service" className="text-decoration-none">
            <FontAwesomeIcon icon={faChevronRight} className="me-2" /> Our
            Service
          </Link>
          <br />
          <Link to="index.html#why-us" className="text-decoration-none">
            <FontAwesomeIcon icon={faChevronRight} className="me-2" /> Why Us
          </Link>
          <br />
          <Link to="index.html#testimonial" className="text-decoration-none">
            <FontAwesomeIcon icon={faChevronRight} className="me-2" />{" "}
            Testimonial
          </Link>
          <br />
          <Link to="index.html#faq" className="text-decoration-none">
            <FontAwesomeIcon icon={faChevronRight} className="me-2" /> FAQ
          </Link>
        </Col>

        {/* Social Media Column */}
        <Col lg={3} md={6} className="connect-us">
          <p className="mb-3">Connect with us</p>
          <FontAwesomeIcon icon={faFacebook} className="fs-4 pe-4" />
          <FontAwesomeIcon icon={faInstagram} className="fs-4 pe-4" />
          <FontAwesomeIcon icon={faXTwitter} className="fs-4 pe-4" />
          <FontAwesomeIcon icon={faEnvelope} className="fs-4 pe-4" />
          <FontAwesomeIcon icon={faWhatsapp} className="fs-4 pe-4" />
        </Col>

        {/* Copyright Column */}
        <Col lg={3} md={6}>
          <p className="mb-3">Copyright Binar 2024</p>
          <h1 className="fs-4 text-primary fw-bold">BINAR RENTAL</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default HeroSection;
