import React from "react";
import { Accordion } from "react-bootstrap";

const FaqSection = () => {
  const faqStyles = {
    accordionItem: {
      marginBottom: "15px",
      border: "1px solid #D1D1D1", // neutral light gray
      borderRadius: "0.25rem",
      fontSize: "14px",
      fontWeight: "300",
      lineHeight: "20px",
      color: "#5A5A5A", // neutral dark gray
    },
    accordionButton: {
      fontSize: "14px",
      fontWeight: "300",
      lineHeight: "20px",
      color: "#5A5A5A", // neutral dark gray
    },
    accordionCollapse: {
      borderTop: "1px solid #D1D1D1", // neutral light gray
    },
    heading: {
      fontSize: "24px",
      lineHeight: "36px",
    },
    paragraph: {
      fontSize: "14px",
      lineHeight: "20px",
    },
  };

  return (
    <section id="faq">
      <div className="container-xxl faq">
        <div className="container">
          <div className="row text-start">
            <div className="col-lg-4">
              <h3
                className="heading text-start fw-bold mb-3 mt-5"
                style={faqStyles.heading}
              >
                Frequently Asked Question
              </h3>
              <p className="mb-3 fw-normal" style={faqStyles.paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
            </div>
            <div className="col-lg-8">
              <div className="container mt-5">
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0" style={faqStyles.accordionItem}>
                    <Accordion.Header style={faqStyles.accordionButton}>
                      Apa saja syarat yang dibutuhkan?
                    </Accordion.Header>
                    <Accordion.Body>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Enim nisi exercitationem eius saepe earum qui non quo quis
                      beatae perferendis ratione repudiandae unde quas tempore,
                      amet quam quod culpa a, sed nulla? Neque praesentium minus
                      eligendi ea omnis? Odit quidem aliquam doloremque?
                      Dignissimos doloribus, libero tenetur eos similique
                      corrupti nihil.
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="1" style={faqStyles.accordionItem}>
                    <Accordion.Header style={faqStyles.accordionButton}>
                      Berapa hari minimal sewa mobil lepas kunci?
                    </Accordion.Header>
                    <Accordion.Body>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Culpa ipsam molestias quam. Accusamus voluptas error omnis
                      optio aperiam modi quae similique quisquam ipsum ad
                      voluptatem, deserunt odit ipsam a, quos quo hic nesciunt
                      excepturi harum eaque culpa ea, pariatur distinctio nisi.
                      Labore, at excepturi. Amet quam ullam magnam reiciendis
                      dignissimos.
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="2" style={faqStyles.accordionItem}>
                    <Accordion.Header style={faqStyles.accordionButton}>
                      Berapa hari sebelumnya sebaiknya booking sewa mobil?
                    </Accordion.Header>
                    <Accordion.Body>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Veritatis quam ullam tenetur maiores iure dolore
                      consequuntur commodi laborum, ducimus deserunt quos amet.
                      Eius dolores accusantium, ex distinctio deleniti ipsa
                      magni vitae, commodi similique vero unde consequuntur
                      beatae! Voluptatem saepe temporibus quod eaque fugiat
                      nulla, nihil ad corporis inventore cumque neque!
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="3" style={faqStyles.accordionItem}>
                    <Accordion.Header style={faqStyles.accordionButton}>
                      Apakah Ada biaya antar-jemput?
                    </Accordion.Header>
                    <Accordion.Body>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Provident earum quas numquam modi doloremque obcaecati
                      fuga voluptatum error minus dolor veritatis maiores,
                      eveniet ipsum perferendis odio rerum maxime suscipit
                      ratione corporis a aliquam, vel saepe. Officia, magni
                      repellat quia distinctio et explicabo, perferendis sequi
                      delectus molestiae quam a esse reiciendis.
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="4" style={faqStyles.accordionItem}>
                    <Accordion.Header style={faqStyles.accordionButton}>
                      Bagaimana jika terjadi kecelakaan?
                    </Accordion.Header>
                    <Accordion.Body>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Reprehenderit, ad. Libero in maxime vel deserunt
                      laudantium optio necessitatibus. Sequi libero tenetur,
                      voluptates vitae optio alias aperiam nesciunt perferendis
                      cupiditate recusandae inventore ullam ut beatae rerum ea
                      quam, id repellendus voluptatum. Alias rem doloremque
                      placeat repellat atque odit non facilis numquam.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
