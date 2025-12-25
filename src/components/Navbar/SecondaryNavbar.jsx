import React from "react";
import { NavLink } from "react-router-dom";

export default function SecondaryNavbar() {
  const baseClass = "px-2 py-2 sm:px-3 sm:py-2 lg:px-[18px] lg:py-[12px] text-xs sm:text-sm lg:text-base text-[#333] font-semibold";
  const activeClass = "text-[#ff6b35] underline";

  return (
    <nav className="lg:sticky top-16 z-50 bg-[#f7f7f7] border-b border-[#e6e6e6] flex lg:justify-center justify-evenly gap-2 sm:gap-3 lg:gap-6 px-2 sm:px-3 py-3 sm:py-2.5">
      <NavLink to="/" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}>Home</NavLink>
      <NavLink to="/filters" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}>Filters</NavLink>
      <NavLink to="/aicook" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}>AiCook</NavLink>
      <NavLink to="/favourites" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}>Favourites</NavLink>
      <NavLink to="/aboutus" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}>About Us</NavLink>
    </nav>
  );
}
