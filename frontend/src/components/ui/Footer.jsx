import React from "react";

const FooterSection = () => {
  const footerStyles = {
    footer: {
      fontSize: "14px",
      fontWeight: "300",
      lineHeight: "20px",
      color: "var(--neutral05)",
    },
    link: {
      fontSize: "14px",
      fontWeight: "700",
      textDecoration: "none",
      color: "var(--neutral05)",
    },
    connectUsIcon: {
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "18px",
      fontWeight: "700",
      background: "var(--darkblue04)",
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      textAlign: "center",
      lineHeight: "32px",
      boxSizing: "border-box",
      color: "var(--neutral01)",
    },
  };

  return (
    // Footer Section
    <div
      className="container-fluid footer mt-5 pt-5 bg-white wow fadeIn"
      data-wow-delay="0.3s"
    >
      <div className="container py-5">
        <div className="row g-5">
          <div className="col-lg-3 col-md-6">
            <p className="mb-3 mt-1">
              <i className="bi bi-geo-alt-fill me-3"></i>Jalan Suroyo No. 161
              Mayangan Kota Probolinggo 672000
            </p>
            <p className="mb-3">
              <i className="bi bi-envelope-fill me-3"></i>
              binarcarrental@gmail.com
            </p>
            <p className="mb-3">
              <i className="bi bi-telephone-fill me-3"></i>081-233-334-808
            </p>
          </div>
          <div className="col-lg-3 col-md-6 align-items-end justify-content-end">
            <a
              href="#our-services"
              className="btn btn-link mb-1 mt-0"
              style={footerStyles.link}
            >
              <i className="bi bi-chevron-right"></i> Our Service
            </a>
            <br />
            <a
              href="#why-us"
              className="btn btn-link mb-1"
              style={footerStyles.link}
            >
              <i className="bi bi-chevron-right"></i> Why Us
            </a>
            <br />
            <a
              href="#testimonial"
              className="btn btn-link mb-1"
              style={footerStyles.link}
            >
              <i className="bi bi-chevron-right"></i> Testimonial
            </a>
            <br />
            <a
              href="#faq"
              className="btn btn-link mb-1"
              style={footerStyles.link}
            >
              <i className="bi bi-chevron-right"></i> FAQ
            </a>
          </div>
          <div className="col-lg-3 col-md-6 connect-us">
            <p
              className="mb-2"
              style={{ color: "var(--neutral05)", lineHeight: "36px" }}
            >
              Connect with us
            </p>
            <i
              className="bi bi-facebook px-3"
              style={footerStyles.connectUsIcon}
            ></i>
            <i
              className="bi bi-instagram px-3"
              style={footerStyles.connectUsIcon}
            ></i>
            <i
              className="bi bi-twitter-x px-3"
              style={footerStyles.connectUsIcon}
            ></i>
            <i
              className="bi bi-envelope px-3"
              style={footerStyles.connectUsIcon}
            ></i>
            <i
              className="bi bi-chat-dots px-3"
              style={footerStyles.connectUsIcon}
            ></i>
          </div>
          <div className="col-lg-3 col-md-6">
            <p
              className="mb-2"
              style={{ color: "var(--neutral05)", lineHeight: "36px" }}
            >
              Copyright Binar 2024
            </p>
            <h1 className="fs-4 text-primary fw-bold">BINAR RENTAL</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
