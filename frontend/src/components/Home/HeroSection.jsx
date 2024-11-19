import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "@tanstack/react-router";

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth); // Mengambil token dari state Redux

  const heroStyles = {
    section: {
      background: "url(/img/hero_bg.png) center center no-repeat",
      backgroundSize: "cover",
      padding: "5rem 0",
    },
    heading: {
      fontSize: "36px",
      fontWeight: 700,
      lineHeight: "54px",
      color: "#151515", // var(--neutral05)
    },
    paragraph: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "20px",
      maxWidth: "468px",
      color: "#151515", // var(--neutral05)
    },
    button: {
      backgroundColor: "#5cb85f", // var(--limegreen04)
      border: "none",
      borderRadius: "3px",
      color: "#fff", // var(--neutral01)
      fontSize: "14px",
      fontWeight: 700,
      lineHeight: "20px",
      padding: "0.5rem 1rem",
      textDecoration: "none",
    },
    image: {
      position: "relative",
      width: "100%",
      height: "auto",
      transform: "scaleX(-1)",
    },
  };

  const handleButtonClick = (event) => {
    event.preventDefault();
    if (user) {
      // Jika pengguna sudah login, arahkan ke halaman cari mobil
      navigate({ to: "/cars" });
    } else {
      // Jika pengguna belum login, arahkan ke halaman landing
      navigate({ to: "/login" });
    }
  };

  return (
    <section style={heroStyles.section}>
      <div className="container">
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-md-6 text-lg-start">
            <h1 style={heroStyles.heading}>
              Sewa & Rental Mobil Terbaik di kawasan (Lokasimu)
            </h1>
            <p style={heroStyles.paragraph}>
              Selamat datang di Binar Car Rental. Kami menyediakan mobil
              kualitas terbaik dengan harga terjangkau. Selalu siap melayani
              kebutuhanmu untuk sewa mobil selama 24 jam.
            </p>
            <button
              onClick={handleButtonClick}
              style={heroStyles.button}
              className="me-3"
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#fff"; // light gray
                e.target.style.color = "#5cb85f"; // lime green
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#5cb85f"; // lime green
                e.target.style.color = "#fff"; // light gray
                e.target.style.border = "1px solid #5cb85f";
              }}
            >
              Mulai Sewa Mobil
            </button>
          </div>
          <div className="col-md-6 text-lg-end">
            <img src="/img/car.png" alt="Hero Car" style={heroStyles.image} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
