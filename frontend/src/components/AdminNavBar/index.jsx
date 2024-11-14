import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../../redux/slices/auth";
import { profile } from "../../services/auth";
import Swal from "sweetalert2";
import {
  Container,
  Dropdown,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Image,
} from "react-bootstrap";

const AdminNavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    const getProfile = async () => {
      // fetch get profile
      const result = await profile();
      if (result.success) {
        // set the user state here
        dispatch(setUser(result.data));
        return;
      }

      // If not success
      // delete the local storage here
      dispatch(setUser(null));
      dispatch(setToken(null));

      // redirect to login
      navigate({ to: "/login" });
    };

    if (token) {
      // hit api auth get profile and pass the token to the function
      getProfile();
    }
  }, [dispatch, navigate, token]);

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
        // delete the local storage here
        dispatch(setUser(null));
        dispatch(setToken(null));

        // redirect to login
        navigate({ to: "/login" });
      }
    });
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-primary shadow-sm"
      >
        <Container>
          <div className="text-body-secondary fs-4 fw-bold ">
            BINAR CAR RENTAL
          </div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* 
                {user && user?.role_id === 1 && (
                  <Nav.Link as={Link} to="/students/create">
                      Create Student
                  </Nav.Link>
                )} 
              */}
            </Nav>
            <Nav>
              {user ? (
                <>
                  <Nav.Link as={Link} to="/profile">
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
                  </Nav.Link>
                  <Dropdown as={NavItem} id="nav-dropdown">
                    <Dropdown.Toggle as={NavLink}>{user?.name}</Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Nav.Link as={Link} to="/admin/profile">
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
                <></>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavBar;
