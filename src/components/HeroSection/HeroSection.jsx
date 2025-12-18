import React from "react";
import Comments from "../Comments/comments";
import Herobanner from "../../assets/Herobanner.jpg"

export default function HeroSection() {
  return (
    <section style={{ display: "flex", gap: 20, marginBottom: 20 }}>
      {/* Left Hero Area */}
      <div className="Herobanner">
        <img src={Herobanner}/>
      </div>

      {/* Right Comments Preview */}
      <aside
        style={{
          width: 360,
          border: "1px solid #e6e6e6",
          borderRadius: 6,
          padding: 12,
        }}
      >
        <h3>Comments</h3>

        <div
          style={{
            height: 220,
            overflow: "auto",
            background: "#fff",
            padding: 8,
          }}
        >
          <Comments preview={true} />
        </div>

        <a href="/comments" style={{ display: "block", marginTop: 8, color: "blue" }}>
          Read more →
        </a>
      </aside>
    </section>
  );
}
