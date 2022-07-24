import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer.js";

function Layout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout