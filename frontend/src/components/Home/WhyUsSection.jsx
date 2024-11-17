import React from "react";

const WhyUsSection = () => {
  const whyUsStyles = {
    section: {
      marginBottom: "5rem",
    },
    heading: {
      fontSize: "24px",
      lineHeight: "36px",
      color: "#151515", // --neutral05
    },
    paragraph: {
      fontSize: "14px",
      fontWeight: 300,
      lineHeight: "20px",
      color: "#151515", // --neutral05
    },
    card: {
      boxSizing: "border-box",
      height: "196px",
      boxShadow: "0 0 4px #f1f3ff", // --darkblue00
    },
    cardIcon: {
      fontSize: "18px",
      fontWeight: 900,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#ffffff", // --neutral01
      width: "32px",
      height: "32px",
      padding: "0",
      borderRadius: "50%",
    },
    cardTitle: {
      fontSize: "16px",
      fontWeight: 700,
      lineHeight: "24px",
      color: "#151515", // --neutral05
    },
    cardText: {
      fontSize: "14px",
      fontWeight: 300,
      lineHeight: "20px",
      color: "#151515", // --neutral05
    },
  };

  return (
    <section className="container-lg" style={whyUsStyles.section} id="why-us">
      <div className="container">
        <div className="row g-4">
          <h3
            className="heading text-start fw-bold"
            style={whyUsStyles.heading}
          >
            Why Us?
          </h3>
          <p className="mt-2 mb-0" style={whyUsStyles.paragraph}>
            Mengapa harus pilih Binar Car Rental?
          </p>

          <div className="col-lg-3 col-sm-6">
            <div className="why-us-item rounded pt-3">
              <div className="card" style={whyUsStyles.card}>
                <div className="card-body">
                  <div className="card-icon mb-3">
                    <i
                      className="bi bi-hand-thumbs-up"
                      style={{
                        ...whyUsStyles.cardIcon,
                        backgroundColor: "#f9cc00", // --warning
                      }}
                    ></i>
                  </div>
                  <h3
                    className="mb-4 text-start fw-bold"
                    style={whyUsStyles.cardTitle}
                  >
                    Mobil Lengkap
                  </h3>
                  <p className="mb-2" style={whyUsStyles.cardText}>
                    Tersedia banyak pilihan mobil kondisi masih baru, bersih dan
                    terawat
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6">
            <div className="why-us-item rounded pt-3">
              <div className="card" style={whyUsStyles.card}>
                <div className="card-body">
                  <div className="card-icon mb-3">
                    <i
                      className="bi bi-tag"
                      style={{
                        ...whyUsStyles.cardIcon,
                        backgroundColor: "#fa2c5a", // --danger
                      }}
                    ></i>
                  </div>
                  <h5
                    className="mb-4 text-start fw-bold"
                    style={whyUsStyles.cardTitle}
                  >
                    Harga Murah
                  </h5>
                  <p className="mb-2" style={whyUsStyles.cardText}>
                    Harga murah dan bersaing, bisa bandingkan harga kamu dengan
                    rental mobil lain
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6">
            <div className="why-us-item rounded pt-3">
              <div className="card" style={whyUsStyles.card}>
                <div className="card-body">
                  <div className="card-icon mb-3">
                    <i
                      className="bi bi-clock"
                      style={{
                        ...whyUsStyles.cardIcon,
                        backgroundColor: "#091b6f", // --darkblue05
                      }}
                    ></i>
                  </div>
                  <h5
                    className="mb-4 text-start fw-bold"
                    style={whyUsStyles.cardTitle}
                  >
                    Layanan 24 Jam
                  </h5>
                  <p className="mb-2" style={whyUsStyles.cardText}>
                    Siap melayani kebutuhan Anda selama 24 jam nonstop. Kami
                    juga tersedia di akhir minggu
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6">
            <div className="why-us-item rounded pt-3">
              <div className="card" style={whyUsStyles.card}>
                <div className="card-body">
                  <div className="card-icon mb-3">
                    <i
                      className="bi bi-award"
                      style={{
                        ...whyUsStyles.cardIcon,
                        backgroundColor: "#5cb85f", // --limegreen04
                      }}
                    ></i>
                  </div>
                  <h5
                    className="mb-4 text-start fw-bold"
                    style={whyUsStyles.cardTitle}
                  >
                    Sopir Profesional
                  </h5>
                  <p className="mb-2" style={whyUsStyles.cardText}>
                    Sopir yang profesional, berpengalaman, jujur, ramah dan
                    selalu tepat waktu
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
