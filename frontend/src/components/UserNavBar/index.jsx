import { useNavigate, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../redux/slices/auth";
import Swal from "sweetalert2";

const UserNavbar = () => {
  const [isSolid, setIsSolid] = useState(false);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth); // Ambil token dari Redux (atau state global)
  const navigate = useNavigate(); // Menambahkan hook navigate untuk redirect
  const location = useLocation(); // Menggunakan hook useLocation untuk mendapatkan path saat ini

  const logout = (event) => {
    event.preventDefault();
    Swal.fire({
      title: "Confirm to log out",
      text: "Are you sure you want to log out?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#0d6efd",
      cancelButtonText: "No",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Menghapus token dari state dan localStorage
        dispatch(setToken(null));

        // Redirect ke halaman login
        navigate("/login");
      }
    });
  };

  // Memeriksa scroll dan mengubah navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSolid(true); // Navbar solid jika scroll lebih dari 50px
      } else {
        setIsSolid(false); // Navbar transparent jika scroll kurang dari 50px
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "background-color 0.3s ease",
  };

  const transparentStyles = {
    backgroundColor: "transparent",
  };

  const solidStyles = {
    backgroundColor: "#fff",
    boxShadow: "0 0 4px #151515",
  };

  const customOffcanvas = {
    "--bs-offcanvas-width": "200px",
  };

  const titleStyles = {
    fontSize: "14px",
    fontWeight: "700",
    lineHeight: "20px",
    color: "#151515",
  };

  const navItemStyles = {
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "20px",
    color: "#151515",
  };

  const buttonStyles = {
    backgroundColor: "#5cb85f",
    border: "none",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "700",
    lineHeight: "20px",
    padding: "8px 12px",
  };

  // Cek jika halaman saat ini adalah register
  if (location.pathname === "/register") {
    return null; // Tidak render navbar di halaman register
  }

  return (
    <Navbar
      expand="lg"
      fixed="top"
      style={{
        ...navStyles,
        ...(isSolid ? solidStyles : transparentStyles),
      }}
    >
      <Container>
        <Navbar.Brand href="#">
          <svg
            width="100"
            height="34"
            viewBox="0 0 100 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="100" height="34" fill="#0D28A6" />
          </svg>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          style={customOffcanvas}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel" style={titleStyles}>
              BCR
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="ms-auto">
              {["Our Services", "Why Us", "Testimonial", "FAQ"].map(
                (item, index) => (
                  <Nav.Link
                    className="active"
                    key={index}
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    style={navItemStyles}
                  >
                    {item}
                  </Nav.Link>
                )
              )}
              <Nav.Item>
                {token ? (
                  <Button onClick={logout} style={buttonStyles}>
                    Logout
                  </Button>
                ) : (
                  <Button href="/register" style={buttonStyles}>
                    Register
                  </Button>
                )}
              </Nav.Item>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default UserNavbar;
