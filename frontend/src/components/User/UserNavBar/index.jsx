import { useNavigate, useLocation, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Offcanvas,
  Image,
  Dropdown,
  NavLink,
  NavItem,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../../../redux/slices/auth";
import { profile } from "../../../services/auth";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const UserNavbar = () => {
  const [isSolid, setIsSolid] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token } = useSelector((state) => state.auth); // Ambil user dan token dari Redux

  // React Query untuk mendapatkan profil user jika token ada
  const { data, isSuccess, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: profile,
    enabled: !!token,
  });

  // Update Redux state jika data berhasil diambil
  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data));
    } else if (isError) {
      handleLogout(); // Logout otomatis jika ada error
    }
  }, [isSuccess, isError, data, dispatch]);

  // Logout handler
  const handleLogout = () => {
    dispatch(setUser(null));
    dispatch(setToken(null));
    navigate("/login");
  };

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
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
      }
    });
  };

  // Memeriksa scroll untuk mengubah navbar style
  useEffect(() => {
    const handleScroll = () => {
      setIsSolid(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Jika di halaman register, sembunyikan navbar
  if (location.pathname === "/register") {
    return null;
  }

  return (
    <Navbar
      expand="lg"
      fixed="top"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "background-color 0.3s ease",
        backgroundColor: isSolid ? "#fff" : "transparent",
        boxShadow: isSolid ? "0 0 4px #151515" : "none",
        paddingBottom: "20px",
      }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <Navbar.Text className="fs-4 text-primary fw-bold">
            BINAR RENTAL
          </Navbar.Text>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          style={{ "--bs-offcanvas-width": "200px" }}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title
              id="offcanvasNavbarLabel"
              style={{ fontWeight: 700, fontSize: "14px" }}
            >
              BCR
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="ms-auto mt-auto pt-2">
              {["Our Services", "Why Us", "Testimonial", "FAQ"].map(
                (item, index) => (
                  <Nav.Link
                    className="active"
                    key={index}
                    as={Link} 
                    to={`/#${item.toLowerCase().replace(" ", "-")}`}
                    style={{
                      fontWeight: 400,
                      fontSize: "14px",
                      color: "#151515",
                    }}
                  >
                    {item}
                  </Nav.Link>
                )
              )}
              <Nav.Item>
                {user ? (
                  <>
                    <Dropdown as={NavItem} id="nav-dropdown" className="me-5">
                      <Dropdown.Toggle as={NavLink}>
                        <Image
                          src={user?.profilePicture}
                          fluid
                          style={{
                            width: "30px",
                            height: "30px",
                            display: "inline-block",
                            overflow: "hidden",
                            borderRadius: "50%",
                          }}
                        />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>
                          <Nav.Link as={Link} to="/profile">
                            Profile
                          </Nav.Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Nav.Link onClick={logout}>Logout</Nav.Link>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                ) : (
                  <Container className="d-flex gap-2">
                    <Button as={Link} to="/register" variant="primary">
                      Register
                    </Button>

                    <Button as={Link} to="/login" variant="primary">
                      Login
                    </Button>
                  </Container>
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
