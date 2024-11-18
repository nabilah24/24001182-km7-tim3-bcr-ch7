import { Container, Row, Col } from "react-bootstrap";
import { CarImage } from "../../../../img";

function HeroSection() {
  return (
    <section className="hero-section">
      <Container className="pt-5 pb-3">
        <Row className="align-items-center justify-content-center">
          <Col md={6} className="text-lg-start py-5">
            <h1 className="display-3 animated slideInLeft">
              Sewa & Rental Mobil Terbaik di kawasan (Lokasimu)
            </h1>
            <p className="animated slideInLeft mb-4">
              Selamat datang di Binar Car Rental. Kami menyediakan mobil
              kualitas terbaik dengan harga terjangkau. Selalu siap melayani
              kebutuhanmu untuk sewa mobil selama 24 jam.
            </p>
          </Col>
          <Col
            md={6}
            className="text-lg-end overflow-hidden animated slideInRight"
          >
            <img src={CarImage} alt="car" className="img-fluid" />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default HeroSection;
