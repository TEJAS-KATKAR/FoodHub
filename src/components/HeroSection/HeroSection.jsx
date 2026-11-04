import React from "react";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Comments from "../Comments/comments";
import Herobanner from "../../assets/Herobanner.png";

export default function HeroSection() {
  return (
    <section className="flex gap-5 mb-6 flex-col lg:flex-row w-full">

      {/* Left Hero Area */}
      <div className="w-full lg:flex-1 lg:w-0 min-w-0 overflow-hidden rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.07)]">
        <img
          src={Herobanner}
          alt="Explore delicious recipes"
          className="block w-full h-auto object-cover"
        />
      </div>

      {/* Right Comments Preview */}
      <aside className="hidden lg:flex lg:flex-col shrink-0 w-[380px] h-[355px] rounded-2xl border border-[#f0e7dc] bg-[#fffaf4] p-4 shadow-[0_8px_25px_rgba(0,0,0,0.05)]">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-orange-100 text-orange-500">
              <MessageCircle size={18} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Comments</h3>
          </div>

          <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold">
            Latest
          </span>
        </div>

        {/* Comments */}
        <div className="flex-1 min-h-0 overflow-y-auto rounded-xl bg-white p-3 border border-orange-50">
          <Comments preview={true} />
        </div>

        {/* Read More */}
        <Link
          to="/comments"
          className="flex items-center gap-1.5 w-fit mt-3 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors group"
        >
          Read more
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>

      </aside>
    </section>
  );
}
