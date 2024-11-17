import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const TestimonialSection = () => {
  const testimonialStyles = {
    container: {
      maxWidth: "832px",
      height: "auto",
      backgroundColor: "#0d28a6", // --darkblue00
      borderRadius: "12px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    },
    image: {
      width: "100px",
      height: "100px",
    },
    rating: {
      fontSize: "18px",
      color: "#f9cc00", // --warning
    },
    testimonialText: {
      fontSize: "14px",
      lineHeight: "20px",
      maxWidth: "415px",
      color: "#151515", // --neutral05
    },
    fwBold: {
      fontSize: "14px",
      fontWeight: "700",
      color: "#151515", // --neutral05
    },
  };

  return (
    <section id="testimonial">
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center mx-auto mb-5">
            <h3
              className="heading fw-bold"
              style={{ fontSize: "24px", lineHeight: "36px", color: "#151515" }}
            >
              Testimonial
            </h3>
            <p
              className="mt-2 mb-0"
              style={{
                fontSize: "14px",
                fontWeight: 300,
                lineHeight: "20px",
                color: "#151515",
              }}
            >
              Berbagai review positif dari para pelanggan kami
            </p>
          </div>
          <Carousel>
            <Carousel.Item>
              <div className="row">
                <div className="col-sm-4 d-flex align-items-center justify-content-center">
                  <img
                    className="img-fluid rounded-circle p-2 mx-auto mb-4"
                    src="/img/testimonial_1.png"
                    style={testimonialStyles.image}
                    alt="testimonial"
                  />
                </div>
                <div className="col-sm-8">
                  <div className="rating mb-2" style={testimonialStyles.rating}>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <p className="mb-2" style={testimonialStyles.testimonialText}>
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod”
                  </p>
                  <p className="fw-bold" style={testimonialStyles.fwBold}>
                    John Doe 32, Bromo
                  </p>
                </div>
              </div>
            </Carousel.Item>

            <Carousel.Item>
              <div className="row">
                <div className="col-sm-4 d-flex align-items-center justify-content-center">
                  <img
                    className="img-fluid rounded-circle p-2 mx-auto mb-4"
                    src="/img/testimonial_2.png"
                    style={testimonialStyles.image}
                    alt="testimonial"
                  />
                </div>
                <div className="col-sm-8">
                  <div className="rating mb-2" style={testimonialStyles.rating}>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <p className="mb-2" style={testimonialStyles.testimonialText}>
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod”
                  </p>
                  <p className="fw-bold" style={testimonialStyles.fwBold}>
                    John Doe 32, Bromo
                  </p>
                </div>
              </div>
            </Carousel.Item>

            <Carousel.Item>
              <div className="row">
                <div className="col-sm-4 d-flex align-items-center justify-content-center">
                  <img
                    className="img-fluid rounded-circle p-2 mx-auto mb-4"
                    src="/img/testimonial_3.jpeg"
                    style={testimonialStyles.image}
                    alt="testimonial"
                  />
                </div>
                <div className="col-sm-8">
                  <div className="rating mb-2" style={testimonialStyles.rating}>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <p className="mb-2" style={testimonialStyles.testimonialText}>
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod”
                  </p>
                  <p className="fw-bold" style={testimonialStyles.fwBold}>
                    John Doe 32, Bromo
                  </p>
                </div>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
