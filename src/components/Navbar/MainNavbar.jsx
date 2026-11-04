import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Instagram, Linkedin, Twitter, Facebook, Search, Sparkles } from "lucide-react";
import AnimalAvatar from "../AnimalAvatar";

export default function MainNavbar() {
  const nav = useNavigate();
  const [query, setQuery] = useState("");
  const [profile, setProfile] = useState(() => {
    try { return JSON.parse(localStorage.getItem("foodhub-session") || "null"); } catch { return null; }
  });
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  useEffect(() => {
    function refreshProfile() {
      try { setProfile(JSON.parse(localStorage.getItem("foodhub-session") || "null")); } catch { setProfile(null); }
    }
    window.addEventListener("foodhub-auth-change", refreshProfile);
    window.addEventListener("storage", refreshProfile);
    return () => {
      window.removeEventListener("foodhub-auth-change", refreshProfile);
      window.removeEventListener("storage", refreshProfile);
    };
  }, []);

  function logout() {
    localStorage.removeItem("foodhub-session");
    setProfile(null);
    setProfileMenuOpen(false);
    window.dispatchEvent(new Event("foodhub-auth-change"));
  }

  function handleSearch() {
    if (!query.trim()) return;
    nav(`/search?q=${encodeURIComponent(query.trim())}`);
    setQuery("");
  }

  return (
    <header className="sticky top-0 z-[60] bg-white border-b border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.07)]">
      <div className="max-w-[1800px] mx-auto px-5 lg:px-9">
        <div className="min-h-[80px] flex flex-wrap xl:flex-nowrap items-center justify-between gap-3 py-3.5">

          {/* BRAND + SOCIALS */}
          <div className="flex items-center gap-6 shrink-0">

            <Link to="/" className="group flex flex-col">
            <h1 className="text-[35px] font-semibold tracking-[-1.5px] leading-none text-gray-900">
  Food<span className="font-bold text-orange-500">Hub</span>
</h1>
              <span className="text-[9px] tracking-[3px] uppercase text-gray-400 mt-2 font-medium">
                Discover something delicious
              </span>
            </Link>

            <div className="hidden lg:block h-11 w-px bg-gray-200" />

            <div className="hidden lg:flex items-center gap-2">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/tejas-katkar1016" },
                { Icon: Twitter, label: "Twitter" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href ? "_blank" : undefined}
                  rel={href ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:text-orange-500 hover:bg-orange-50 transition-all duration-200"
                >
                  <Icon size={17} strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>

          {/* SEARCH */}
          <div className="order-3 xl:order-2 w-full xl:flex-1 xl:max-w-[570px]">
            <div className="flex items-center gap-3 bg-[#f6f6f4] border border-transparent focus-within:border-orange-200 focus-within:bg-white focus-within:shadow-[0_4px_20px_rgba(0,0,0,0.04)] rounded-2xl px-5 py-1.5 transition-all duration-200">
              <Search size={20} className="text-gray-400 shrink-0" />

              <input
                type="text"
                aria-label="Search food"
                placeholder="What are you craving today?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 min-w-0 bg-transparent py-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none"
              />

              <button
                onClick={handleSearch}
                className="px-5 py-2.5 bg-gray-900 hover:bg-orange-500 text-white rounded-xl text-sm font-medium transition-colors"
              >
                Search
              </button>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="order-2 xl:order-3 flex items-center gap-2.5 shrink-0">

            <Link
              to="/AiCook"
              className="flex items-center gap-2 px-4 py-3 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-xl text-sm font-semibold transition-colors"
            >
              <Sparkles size={17} />
              <span>Ask AI</span>
            </Link>

            <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block" />

            {profile ? (
              <div className="relative" onMouseEnter={() => setProfileMenuOpen(true)} onMouseLeave={() => setProfileMenuOpen(false)}>
                <button type="button" onClick={() => setProfileMenuOpen((open) => !open)} aria-expanded={profileMenuOpen} aria-haspopup="menu" className="flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50/70 py-1.5 pl-1.5 pr-3 transition hover:border-orange-300 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-300">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 via-fuchsia-400 to-sky-400 p-[2px]"><span className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white"><AnimalAvatar type={profile.avatar} size={36} /></span></span>
                  <span className="max-w-24 truncate text-sm font-semibold text-gray-800">{profile.firstName || profile.name?.split(/\s+/)[0] || "Foodie"}</span>
                </button>
                {profileMenuOpen && <div role="menu" className="absolute right-0 top-full z-[70] w-56 rounded-2xl border border-orange-100 bg-white p-2 shadow-[0_12px_35px_rgba(0,0,0,0.14)]">
                  <div className="border-b border-gray-100 px-3 py-2.5"><p className="truncate text-sm font-bold text-gray-900">{profile.name}</p><p className="truncate text-xs text-gray-500">{profile.email}</p></div>
                  <button type="button" role="menuitem" onClick={logout} className="mt-1 w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-gray-700 transition hover:bg-orange-50 hover:text-orange-700">Log out</button>
                </div>}
              </div>
            ) : <>
              <Link to="/login" className="px-4 py-3 text-gray-700 hover:text-orange-500 text-sm font-medium transition-colors">Log in</Link>
              <Link to="/login?mode=signup" className="px-5 py-3 bg-gray-900 hover:bg-orange-500 text-white rounded-xl text-sm font-medium transition-colors">Sign in</Link>
            </>}

          </div>

        </div>
      </div>
    </header>
  );
}
