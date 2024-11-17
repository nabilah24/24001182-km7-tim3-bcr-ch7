import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useCallback } from "react";
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
import { useQuery } from "@tanstack/react-query";


const AdminNavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);

  const handleLogout = useCallback(() => {
      // delete the local storage here
      dispatch(setUser(null));
      dispatch(setToken(null));

      // redirect to login
      navigate({ to: "/login" });
  }, [dispatch, navigate]);

  // Use react query to fetch API
  const { data, isSuccess, isError } = useQuery({
      queryKey: ["profile"],
      queryFn: () => profile(),
      enabled: token ? true : false,
  });

  useEffect(() => {
      if (isSuccess) {
          dispatch(setUser(data));
      } else if (isError) {
          handleLogout();
      }
  }, [isSuccess, isError, data, dispatch, handleLogout]);

  const logout = (event) => {
      event.preventDefault();
      handleLogout();
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
