import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Instagram, Home, Linkedin, Twitter, Facebook } from "lucide-react";


export default function MainNavbar() {
  const nav = useNavigate();
  const [query, setQuery] = useState("");

  function handleSearch() {
    if (!query.trim()) return;
    nav(`/search?q=${encodeURIComponent(query.trim())}`);
    setQuery(""); // optional: clear after search
  }

  return (
    <>
      {/* RESPONSIVE CSS FOR HIDING TEXTS & MERGING SEARCH BAR */}
      <style>
        {`
          /* ICON TEXT HIDE BELOW 950PX */
          @media (max-width: 950px) {
            .icon-text {
              display: none;
            }
            .icon-link {
              gap: 4px !important;
            }
          }

          /* SEARCH + BUTTON MERGED BELOW 850PX */
          @media (max-width: 850px) {
            .search-container {
              display: flex;
              width: 100%;
              max-width: 350px;
            }
            .search-input {
              flex: 1;
              border-right: none !important;
              border-radius: 999px 0 0 999px !important;
            }
            .search-btn {
              border-radius: 0 999px 999px 0 !important;
            }
          }

          /* PREVENT THIRD LINE BELOW 600PX */
          @media (max-width: 600px) {
            .nav-wrapper {
              justify-content: center;
            }
            .right-wrapper {
              justify-content: center;
            }
          }
        `}
      </style>

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 60,
          background: "#ffffff",
          borderBottom: "1px solid #e6e6e6",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        {/* LEFT SECTION */}
        <div
          className="nav-wrapper"
          style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}
        >
          <a href="/">
            <h1 className="m-0 w-40 text-3xl" style={{ color: "#ff6b35" }}>
              FoodHub
            </h1>
          </a>

          <nav style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="/" className="icon-link" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Instagram className="w-5 h-5" />
              <span className="icon-text">Instagram</span>
            </a>

            <a href="/" className="icon-link" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Facebook className="w-5 h-5" />
              <span className="icon-text">Facebook</span>
            </a>

            <a
              href="https://www.linkedin.com/in/tejas-katkar1016"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link"
              style={{ display: "flex", alignItems: "center", gap: 6 }}
            >
              <Linkedin className="w-5 h-5" />
              <span className="icon-text">LinkedIn</span>
            </a>

            <a href="/" className="icon-link" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Twitter className="w-5 h-5" />
              <span className="icon-text">Twitter</span>
            </a>
          </nav>
        </div>

        {/* RIGHT SECTION */}
        <div
          className="right-wrapper"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          {/* SEARCH BAR */}
          <div className="search-container" style={{ display: "flex", gap: 0 }}>
            <input
              aria-label="search"
              placeholder="Search your dish..."
              className="search-input rounded-l-full"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              style={{
                padding: "8px 12px",
                border: "1px solid #ddd",
                width: "260px",
                maxWidth: "260px",
                minWidth: "200px",
                flexShrink: 1,
              }}
            />

            <button
              className="search-btn rounded-r-full shadow-md"
              onClick={handleSearch}
              style={{
                padding: "8px 18px",
                background: "#333",
                color: "#fff",
                minWidth: 80,
              }}
            >
              Search
            </button>
          </div>

          <Link 
            style={{
              padding: "8px 18px",
              borderRadius: 8,
              background: "#ff6b35",
              color: "#fff",
              minWidth: 80,
            }}
            to="/AiCook"
          >
            Ask AI
          </Link>

          <div style={{ display: "flex" }}>
            <button
              className="rounded-l-full"
              style={{
                padding: "8px 18px",
                border: "1px solid #ccc",
                minWidth: 80,
                textAlign: "center",
              }}
            >
              Log in
            </button>

            <button
              className="rounded-r-full"
              style={{
                padding: "8px 18px",
                background: "#333",
                color: "#fff",
                minWidth: 80,
                textAlign: "center",
              }}
            >
              Sign in
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
