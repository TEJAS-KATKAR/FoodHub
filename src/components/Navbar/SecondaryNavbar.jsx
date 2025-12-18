import React from "react";
import { NavLink } from "react-router-dom";

export default function SecondaryNavbar() {
  const base = { padding: "12px 18px", textDecoration: "none", color: "#333", fontWeight: 600 };
  const active = { color: "#ff6b35", textDecoration: "underline" };

  return (
    <nav style={{
      position: "sticky",
      top: 64, /* adjust if main navbar height changes */
      zIndex: 50,
      background: "#f7f7f7",
      borderBottom: "1px solid #e6e6e6",
      display: "flex",
      justifyContent: "center",
      gap: 24,
      padding: "10px 12px"
    }}>
      <NavLink to="/" style={({ isActive }) => (isActive ? { ...base, ...active } : base)}>Home</NavLink>
      <NavLink to="/filters" style={({ isActive }) => (isActive ? { ...base, ...active } : base)}>Filters</NavLink>
      <NavLink to="/aicook" style={({ isActive }) => (isActive ? { ...base, ...active } : base)}>AiCook</NavLink>
      <NavLink to="/favourites" style={({ isActive }) => (isActive ? { ...base, ...active } : base)}>Favourites</NavLink>
      <NavLink to="/aboutus" style={({ isActive }) => (isActive ? { ...base, ...active } : base)}>About Us</NavLink>
    </nav>
  );
}
