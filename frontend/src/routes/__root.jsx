import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import AdminNavBar from "../components/Admin/AdminNavBar"; // Navbar untuk Admin
import UserNavBar from "../components/User/UserNavBar"; // Navbar untuk Pengguna biasa
import SideBar from "../components/Admin/SideBar"; // Sidebar untuk Admin
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

export const Route = createRootRoute({
  component: () => {
    const location = useLocation();

    // Ambil user dari Redux state
    const user = useSelector((state) => state.auth.user);
    const isAdmin = user?.roleId === 1; // Jika roleId 1, maka user adalah admin

    // Tentukan apakah NavBar dan SideBar harus ditampilkan
    const showNavAndSidebar = location.pathname !== "/login";

    // Periksa apakah admin berada di route "/", "/cars", atau "/cars/:id"
    const isUserNavbarRoute =
      location.pathname === "/" ||
      location.pathname === "/profile" ||
      location.pathname.startsWith("/cars");

    return (
      <>
        {showNavAndSidebar ? (
          <>
            {/* Render NavBar dan SideBar berdasarkan role dan route */}
            {isAdmin ? (
              isUserNavbarRoute ? (
                <>
                  <UserNavBar />
                  <Outlet />
                </>
              ) : (
                <>
                  <AdminNavBar />
                  <SideBar>
                    <Outlet />
                  </SideBar>
                </>
              )
            ) : (
              <>
                <UserNavBar />
                <Outlet />
              </>
            )}
          </>
        ) : (
          <Outlet />
        )}
        <TanStackRouterDevtools />

        {/* React Toastify */}
        <ToastContainer theme="colored" />
      </>
    );
  },
});
