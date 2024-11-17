import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const TestimonialSection = () => {
  const testimonialStyles = {
    container: {
      maxWidth: "832px",
      backgroundColor: "#f5faff", // Warna latar biru terang
      borderRadius: "12px",
      padding: "20px",
      margin: "0 auto",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      display: "flex",
      alignItems: "center",
    },
    image: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
    },
    rating: {
      fontSize: "18px",
      color: "#ffcd3c", // Warna bintang
    },
    testimonialText: {
      fontSize: "14px",
      lineHeight: "20px",
      color: "#151515",
      fontStyle: "italic",
    },
    fwBold: {
      fontSize: "14px",
      fontWeight: "700",
      color: "#151515",
      marginTop: "10px",
    },
    navigation: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: "40px",
      height: "40px",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1,
    },
    prev: {
      left: "10px",
    },
    next: {
      right: "10px",
    },
  };

  return (
    <section id="testimonial">
      <div className="container-xxl py-5">
        <div className="container">
          {/* Header Section */}
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

          {/* Testimonial Carousel */}
          <Carousel
            indicators={false}
            nextIcon={
              <span
                aria-hidden="true"
                className="carousel-control-next-icon"
                style={{
                  ...testimonialStyles.navigation,
                  ...testimonialStyles.next,
                  filter: "invert(1)",
                }}
              />
            }
            prevIcon={
              <span
                aria-hidden="true"
                className="carousel-control-prev-icon"
                style={{
                  ...testimonialStyles.navigation,
                  ...testimonialStyles.prev,
                  filter: "invert(1)",
                }}
              />
            }
          >
            {/* Item 1 */}
            <Carousel.Item>
              <div style={testimonialStyles.container}>
                <div className="text-center">
                  <img
                    src="/img/testimonial_1.png"
                    style={testimonialStyles.image}
                    alt="testimonial"
                  />
                </div>
                <div className="px-4">
                  <div className="rating mb-2" style={testimonialStyles.rating}>
                    {[...Array(5)].map((_, index) => (
                      <i key={index} className="bi bi-star-fill"></i>
                    ))}
                  </div>
                  <p style={testimonialStyles.testimonialText}>
                    “Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Eligendi assumenda autem, alias dolor laboriosam inventore
                    iusto necessitatibus. Iste corrupti, consequuntur labore sed
                    iusto dolorem laboriosam ipsum harum, beatae, fuga quis.”
                  </p>
                  <p className="fw-bold" style={testimonialStyles.fwBold}>
                    John Doe 32, Bromo
                  </p>
                </div>
              </div>
            </Carousel.Item>

            {/* Item 2 */}
            <Carousel.Item>
              <div style={testimonialStyles.container}>
                <div className="text-center">
                  <img
                    src="/img/testimonial_2.png"
                    style={testimonialStyles.image}
                    alt="testimonial"
                  />
                </div>
                <div className="px-4">
                  <div className="rating mb-2" style={testimonialStyles.rating}>
                    {[...Array(4)].map((_, index) => (
                      <i key={index} className="bi bi-star-fill"></i>
                    ))}
                  </div>
                  <p style={testimonialStyles.testimonialText}>
                    “Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Eligendi assumenda autem, alias dolor laboriosam inventore
                    iusto necessitatibus. Iste corrupti, consequuntur labore sed
                    iusto dolorem laboriosam ipsum harum, beatae, fuga quis.”
                  </p>
                  <p className="fw-bold" style={testimonialStyles.fwBold}>
                    Jane Smith 28, Surabaya
                  </p>
                </div>
              </div>
            </Carousel.Item>

            {/* Item 3 */}
            <Carousel.Item>
              <div style={testimonialStyles.container}>
                <div className="text-center">
                  <img
                    src="/img/testimonial_3.jpeg"
                    style={testimonialStyles.image}
                    alt="testimonial"
                  />
                </div>
                <div className="px-4">
                  <div className="rating mb-2" style={testimonialStyles.rating}>
                    {[...Array(5)].map((_, index) => (
                      <i key={index} className="bi bi-star-fill"></i>
                    ))}
                  </div>
                  <p style={testimonialStyles.testimonialText}>
                    “Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Eligendi assumenda autem, alias dolor laboriosam inventore
                    iusto necessitatibus. Iste corrupti, consequuntur labore sed
                    iusto dolorem laboriosam ipsum harum, beatae, fuga quis.”
                  </p>
                  <p className="fw-bold" style={testimonialStyles.fwBold}>
                    Michael Brown 45, Jakarta
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
