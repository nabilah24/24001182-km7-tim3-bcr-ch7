import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Container from "react-bootstrap/Container";
import AdminNavBar from "../components/Admin/AdminNavBar"; // Navbar untuk Admin
import UserNavBar from "../components/User/UserNavBar"; // Navbar untuk Pengguna biasa
import SideBar from "../components/Admin/SideBar"; // Sidebar untuk Admin
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../redux/slices/auth";
import { profile } from "../services/auth";
import { useEffect } from "react";

export const Route = createRootRoute({
  component: () => {
    const dispatch = useDispatch();
    const location = useLocation();

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
      };

      if (token) {
        // hit api auth get profile and pass the token to the function
        getProfile();
      }
    }, [dispatch, token]);

    // Ambil user dari Redux state
    const isAdmin = user?.roleId === 1; // Jika roleId 1, maka user adalah admin

    // Tentukan apakah NavBar dan SideBar harus ditampilkan
    const showNavAndSidebar = location.pathname !== "/login";

    return (
      <>
        {showNavAndSidebar ? (
          <>
            {/* Render NavBar dan SideBar berdasarkan role */}
            {isAdmin ? (
              <>
                <AdminNavBar />
                <SideBar>
                  <Outlet />
                </SideBar>
              </>
            ) : (
              <>
                <UserNavBar />
                <Container>
                  <Outlet />
                </Container>
              </>
            )}
          </>
        ) : (
          <Outlet />
        )}
        <TanStackRouterDevtools />
      </>
    );
  },
});
