import React from "react";

const ServiceSection = () => {
  const serviceStyles = {
    section: {
      padding: "5rem 0",
      margin: "5rem 0",
    },
    heading: {
      fontSize: "24px",
      lineHeight: "36px",
      color: "#151515", // var(--neutral05)
    },
    paragraph: {
      fontSize: "14px",
      fontWeight: "300",
      lineHeight: "20px",
      maxWidth: "460px",
      color: "#151515", // var(--neutral05)
    },
    listItem: {
      fontSize: "14px",
      fontWeight: "300",
      lineHeight: "20px",
      color: "#151515", // var(--neutral05)
    },
    icon: {
      fontSize: "18px",
      fontWeight: "900",
      color: "#091b6f", // var(--darkblue05)
      background: "#cfd4ed", // var(--darkblue01)
      padding: "2px",
      width: "24px",
      height: "24px",
      borderRadius: "100%",
    },
    image: {
      width: "75%",
      animation: "zoomIn 0.3s",
    },
  };

  return (
    <section
      style={serviceStyles.section}
      className="service-section"
      id="our-services"
    >
      <div className="container">
        <div className="row g-5 d-flex align-items-center">
          <div className="col-lg-6 text-center">
            <img
              src="/img/img_service.png"
              alt="Service Image"
              style={serviceStyles.image}
              className="img-fluid"
            />
          </div>
          <div className="col-lg-6">
            <h3
              className="Heading text-start fw-bold mb-4"
              style={serviceStyles.heading}
            >
              Best Car Rental for any kind of trip in (Lokasimu)!
            </h3>
            <p
              className="mb-3"
              style={serviceStyles.paragraph}
            >
              Sewa mobil di (Lokasimu) bersama Binar Car Rental jaminan harga
              lebih murah dibandingkan yang lain, kondisi mobil baru, serta
              kualitas pelayanan terbaik untuk perjalanan wisata, bisnis,
              wedding, meeting, dll.
            </p>
            <ul className="list-unstyled text-start point-service">
              <li
                className="mb-3 d-flex align-items-center"
                style={serviceStyles.listItem}
              >
                <i
                  className="bi bi-check-lg me-2"
                  style={serviceStyles.icon}
                ></i>{" "}
                Sewa Mobil Dengan Supir di Bali 12 Jam
              </li>
              <li
                className="mb-3 d-flex align-items-center"
                style={serviceStyles.listItem}
              >
                <i
                  className="bi bi-check-lg me-2"
                  style={serviceStyles.icon}
                ></i>{" "}
                Sewa Mobil Lepas Kunci di Bali 24 Jam
              </li>
              <li
                className="mb-3 d-flex align-items-center"
                style={serviceStyles.listItem}
              >
                <i
                  className="bi bi-check-lg me-2"
                  style={serviceStyles.icon}
                ></i>{" "}
                Sewa Mobil Jangka Panjang Bulanan
              </li>
              <li
                className="mb-3 d-flex align-items-center"
                style={serviceStyles.listItem}
              >
                <i
                  className="bi bi-check-lg me-2"
                  style={serviceStyles.icon}
                ></i>{" "}
                Gratis Antar - Jemput Mobil di Bandara
              </li>
              <li
                className="mb-3 d-flex align-items-center"
                style={serviceStyles.listItem}
              >
                <i
                  className="bi bi-check-lg me-2"
                  style={serviceStyles.icon}
                ></i>{" "}
                Layanan Airport Transfer / Drop In Out
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
