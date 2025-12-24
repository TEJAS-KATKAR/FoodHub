import React from "react";
import Comments from "../Comments/comments";
import Herobanner from "../../assets/Herobanner.jpg";

export default function HeroSection() {
  return (
    <section className="flex gap-5 mb-5 flex-col lg:flex-row">
      
      {/* Left Hero Area */}
      <div className="w-full">
        <img src={Herobanner} className="w-full h-auto object-cover rounded-md" />
      </div>

      {/* Right Comments Preview (HIDDEN ON MOBILE) */}
      <aside className="hidden h-[310px] lg:block w-[460px] border border-[#e6e6e6] rounded-md p-3">
        <h3>Comments</h3>

        <div className="h-[230px] overflow-auto bg-white p-2">
          <Comments preview={true} />
        </div>

        <a href="/comments" className="block mt-2 text-blue-600">
          Read more →
        </a>
      </aside>
    </section>
  );
}
