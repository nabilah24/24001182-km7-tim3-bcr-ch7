import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "@tanstack/react-router";

const CtaSection = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const ctaStyles = {
    card: {
      background: "#0d28a6", // dark blue
      color: "#fff", // light gray for text
    },
    cardBody: {
      textAlign: "center",
      paddingTop: "5rem",
      paddingBottom: "5rem",
    },
    paragraph: {
      textAlign: "center",
      maxWidth: "468px",
      margin: "0 auto",
      fontSize: "14px",
      lineHeight: "20px",
    },
    button: {
      backgroundColor: "#5cb85f", // lime green
      border: "none",
      borderRadius: "3px",
      fontSize: "14px",
      fontWeight: "700",
      lineHeight: "20px",
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem",
      paddingLeft: "1rem",
      paddingRight: "1rem",
    },
    buttonHover: {
      backgroundColor: "#fff", // light gray
      color: "#5cb85f", // lime green
    },
  };

  const handleButtonClick = (e) => {
    // If not logged in, navigate to login page
    if (!token) {
      e.preventDefault(); // prevent default anchor behavior
      navigate({ to: "/login" });
    } else {
      navigate({ to: "/cari-mobil" }); // If logged in, navigate to car search page
    }
  };

  return (
    <div className="container-xxl cta">
      <div className="container py-5">
        <div
          className="card"
          style={ctaStyles.card}
        >
          <div className="card-body" style={ctaStyles.cardBody}>
            <h1
              className="heading fw-bold mb-4"
              style={{ fontSize: "36px", lineHeight: "54px" }}
            >
              Sewa Mobil di (Lokasimu) Sekarang
            </h1>
            <p className="mb-4 fw-normal" style={ctaStyles.paragraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <a
              href="/cari-mobil" // This href is a fallback for when the user is already logged in
              className="btn btn-primary py-sm-2 px-sm-3 me-4"
              style={ctaStyles.button}
              onClick={handleButtonClick}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#fff"; // light gray
                e.target.style.color = "#5cb85f"; // lime green
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#5cb85f"; // lime green
                e.target.style.color = "#fff"; // light gray
              }}
            >
              Mulai Sewa Mobil
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
