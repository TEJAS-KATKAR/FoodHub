import React from "react";
import { Outlet } from "react-router-dom";

import MainNavbar from "./Navbar/MainNavbar";
import SecondaryNavbar from "./Navbar/SecondaryNavbar";
import Footer from "./Footer/Footer";
import Rsidebar from "./Sidebar/Rsidebar";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* top navbars */}
      <MainNavbar />
      <SecondaryNavbar />
      <Rsidebar />

      {/* main content area (pages render here) */}
      <main className="flex-1 mt-2 py-3.5 px-4 lg:py-5 lg:px-6">
        <Outlet />
      </main>

      {/* footer */}
      <Footer />
    </div>
  );
}


