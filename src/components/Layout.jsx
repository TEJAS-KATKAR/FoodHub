import React from "react";
import { Outlet } from "react-router-dom";

import MainNavbar from "./Navbar/MainNavbar";
import SecondaryNavbar from "./Navbar/SecondaryNavbar";
import Footer from "./Footer/Footer";
import Rsidebar from "./Sidebar/Rsidebar";

export default function Layout() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* top navbars */}
      <MainNavbar />
      <SecondaryNavbar />
      <Rsidebar/>

      {/* main content area (pages render here) */}
      <main style={{ flex: 1, padding: "20px 24px", marginTop: "8px" }}>
        <Outlet />
      </main>

      {/* footer */}
      <Footer />
    </div>
  );
}

