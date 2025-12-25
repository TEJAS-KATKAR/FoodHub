import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Instagram, Linkedin, Twitter, Facebook } from "lucide-react";

export default function MainNavbar() {
  const nav = useNavigate();
  const [query, setQuery] = useState("");

  function handleSearch() {
    if (!query.trim()) return;
    nav(`/search?q=${encodeURIComponent(query.trim())}`);
    setQuery("");
  }

  return (
    <header className="lg:sticky top-0 z-60 bg-white border-b border-gray-200 px-6 py-3 lg:py-3 flex flex-wrap items-center gap-3">
      <div className="w-full">

        {/* LEFT SECTION */}
      <div className="flex flex-wrap items-center justify-center lg:justify-start w-full lg:w-auto gap-2 lg:gap-5">

        {/* LOGO */}
        <Link
          to="/"
          className="w-full lg:w-auto text-center lg:text-left"
        >
          <h1 className="text-4xl mt-1 lg:m-2 m-0 text-orange-500 font-extralight lg:text-5xl ">
            FoodHub
          </h1>
        </Link>

      {/* RIGHT SECTION */}
<div className=" flex flex-wrap lg:mt-0 sm:mt-0 lg:flex-nowrap items-center justify-center gap-3 lg:ml-auto lg:mr-auto">

  {/* SEARCH */}
  <div className="flex w-full max-w-[350px] lg:min-w-[400px] lg:px-6 lg:py-3">
    <input
      aria-label="search"
      placeholder="Search your dish..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      className="flex-1 px-3 py-2 lg:px-6 lg:py-3 border border-gray-300 rounded-l-full text-sm focus:outline-none min-w-[200px]"
    />

    <button
      onClick={handleSearch}
      className="px-5 py-2 lg:px-6 lg:py-3 bg-gray-800 text-white rounded-r-full shadow-md text-sm min-w-20"
    >
      Search
    </button>
  </div>

  {/* AI BUTTON */}
  <Link
    to="/AiCook"
    className="px-5 py-2 lg:px-6 lg:py-3 bg-orange-500 text-white rounded-lg text-sm min-w-20 text-center"
  >
    Ask AI
  </Link>

  {/* LOGIN / SIGNUP */}
  <div className="flex">
    <button className="px-4 py-2 lg:px-6 lg:py-3 border border-gray-300 rounded-l-full text-sm min-w-20 ">
      Log in
    </button>
    <button className="px-4 py-2 bg-gray-800 text-white rounded-r-full text-sm min-w-20">
      Sign in
    </button>
  </div>

</div>

      </div>
      {/* SOCIAL LINKS */}
        <nav className="hidden lg:flex gap-5 ml-0 lg:ml-10">
          <a className="flex items-center gap-2">
            <Instagram className="w-5 h-5" />
            <span className="hidden xl:inline">Instagram</span>
          </a>

          <a className="flex items-center gap-2">
            <Facebook className="w-5 h-5" />
            <span className="hidden xl:inline">Facebook</span>
          </a>

          <a
            href="https://www.linkedin.com/in/tejas-katkar1016"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Linkedin className="w-5 h-5" />
            <span className="hidden xl:inline">LinkedIn</span>
          </a>

          <a className="flex items-center gap-2">
            <Twitter className="w-5 h-5" />
            <span className="hidden xl:inline">Twitter</span>
          </a>
        </nav>
      
      </div>
      
    </header>
  );
}
