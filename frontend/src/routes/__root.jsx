import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Container from "react-bootstrap/Container";
import AdminNavBar from "../components/AdminNavBar"; // Navbar untuk Admin
import UserNavBar from "../components/UserNavBar"; // Navbar untuk Pengguna biasa
import SideBar from "../components/SideBar"; // Sidebar untuk Admin
import { useSelector } from "react-redux";

export const Route = createRootRoute({
  component: () => {
    const location = useLocation();

    // Ambil user dari Redux state
    const user = useSelector((state) => state.auth.user);
    console.log(user);
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
                <Container>
                  <UserNavBar />
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
