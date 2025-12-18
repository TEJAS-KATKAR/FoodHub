import React, { useState } from "react";

export default function CategoriesDropdown() {
  const [active, setActive] = useState(null);

  const categories = {
    Drinks: ["Smoothie", "Beer", "Wine"],
    Desserts: ["Cake", "Ice Cream", "Cookies"],
    Spices: ["Cumin", "Turmeric", "Chili"]
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {Object.keys(categories).map((cat) => (
          <button
            key={cat}
            onMouseEnter={() => setActive(cat)}
            onMouseLeave={() => setActive(null)}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid #ddd",
              background: active === cat ? "#ffefea" : "#fff",
              cursor: "pointer"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {active && (
        <div style={{
          marginTop: 8,
          padding: 12,
          borderRadius: 8,
          boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
          background: "#fff",
          width: "100%",
          maxWidth: 900
        }}>
          <strong>{active}</strong>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            {categories[active].map((item) => (
              <div key={item} style={{ padding: 8, border: "1px solid #eee", borderRadius: 6 }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
