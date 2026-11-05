import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Compass, Sparkles, Heart, Info } from "lucide-react";

export default function SecondaryNavbar() {
  const links = [
    { name: "Home", path: "/", Icon: Home, end: true },
    { name: "Explore", path: "/filters", Icon: Compass },
    { name: "AI Cook", path: "/aicook", Icon: Sparkles },
    { name: "Favourites", path: "/favourites", Icon: Heart },
    { name: "About Us", path: "/aboutus", Icon: Info },
  ];

  return (
    <>
      <style>{`
        @keyframes aiCookBounce {
          0%, 65%, 100% { transform: translateY(0); }
          5% { transform: translateY(-5px); }
          10% { transform: translateY(0); }
          15% { transform: translateY(-5px); }
          20% { transform: translateY(0); }
        }
        
        .ai-cook-icon {
          animation: aiCookBounce 3.5s ease-in-out infinite;
        }
      `}</style>

      <nav className="fixed bottom-[8px] left-1/2 -translate-x-1/2 z-50 w-fit max-w-[calc(100vw-24px)]">
        <div className="flex items-center justify-center gap-2 sm:gap-4 p-1.5 bg-[#f7f7f8]/95 backdrop-blur-xl rounded-2xl border border-gray-200/70 shadow-[0_8px_30px_rgba(0,0,0,0.10)] overflow-x-auto scrollbar-hide">

          {links.map(({ name, path, Icon, end }) => (
            <NavLink
              key={name}
              to={path}
              end={end}
              className={({ isActive }) =>
                `group relative flex flex-col items-center justify-center min-w-[76px] sm:min-w-[100px] px-3 sm:px-5 py-2.5 rounded-xl transition-all duration-300 ease-out ${
                  isActive
                    ? name === "AI Cook"
                      ? "bg-white text-fuchsia-600 shadow-[0_3px_12px_rgba(0,0,0,0.07)]"
                      : "bg-white text-orange-600 shadow-[0_3px_12px_rgba(0,0,0,0.07)]"
                    : name === "AI Cook"
                    ? "text-fuchsia-600 hover:bg-white/80"
                    : "text-gray-500 hover:bg-white/80 hover:text-gray-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={19}
                    strokeWidth={isActive ? 2.4 : 1.8}
                    className={`mb-1 transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:rotate-[-8deg] group-active:scale-90 ${
                      name === "AI Cook"
                        ? "ai-cook-icon text-violet-600"
                        : isActive
                        ? "text-orange-500 -translate-y-0.5"
                        : ""
                    }`}
                  />

                  <span className={`text-xs sm:text-[13px] whitespace-nowrap transition-all duration-200 ${
                    isActive ? "font-semibold" : "font-medium"
                  } ${name === "AI Cook" ? "font-semibold text-fuchsia-600" : ""}`}>
                    {name}
                  </span>

                  {isActive && (
                    <span className={`absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-5 h-[3px] rounded-full ${
                      name === "AI Cook"
                        ? "bg-fuchsia-500 shadow-[0_0_8px_rgba(217,70,239,0.4)]"
                        : "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]"
                    }`} />
                  )}
                </>
              )}
            </NavLink>
          ))}

        </div>
      </nav>
    </>
  );
}