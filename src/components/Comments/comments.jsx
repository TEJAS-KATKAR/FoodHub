import React, { useEffect, useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react"; // LUCIDE ICONS
import foodData from "../../data/foodComments.json";

export default function Comments({ preview }) {
  const [comments, setComments] = useState([]);

  // ----------- TIME AGO -------------
  function randomTimeAgo() {
    const days = Math.floor(Math.random() * 10) + 1;
    return `${days}d ago`;
  }

  // ----------- RANDOM COLOR FOR AVATAR -------------
  function randomColor() {
    const colors = [
      "#FFB6C1", "#FFD700", "#87CEEB", "#90EE90",
      "#DDA0DD", "#FFA07A", "#40E0D0", "#F4A460",
      "#98FB98"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // ----------- INITIAL LOAD (JSON + LOCALSTORAGE) -------------
  useEffect(() => {
    const saved = localStorage.getItem("comments");

    if (saved) {
      setComments(JSON.parse(saved));
      return;
    }

    // Enhance JSON comments
    const enhanced = foodData.comments.map((c) => ({
      ...c,
      createdAt: randomTimeAgo(),
      profileColor: randomColor(),
      upvotes: Math.floor(Math.random() * 150) + 20,
      downvotes: Math.floor(Math.random() * 40),
      userVote: null
    }));

    setComments(enhanced);
  }, []);

  // ----------- SAVE TO LOCAL STORAGE -------------
  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem("comments", JSON.stringify(comments));
    }
  }, [comments]);

  const display = preview ? comments.slice(0, 20) : comments;

  // ----------- VOTE FUNCTION -------------
  function vote(id, type) {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;

        let up = c.upvotes;
        let down = c.downvotes;

        if (c.userVote === "up") up--;
        if (c.userVote === "down") down--;

        const newVote = c.userVote === type ? null : type;

        if (newVote === "up") up++;
        if (newVote === "down") down++;

        return { ...c, upvotes: up, downvotes: down, userVote: newVote };
      })
    );
  }

  return (
    <div>
      {display.map((c) => (
        <div key={c.id} style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 12 }}>
            
            {/* Avatar */}
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: c.profileColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              {c.username.charAt(0)}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <p style={{ fontWeight: 600 }}>{c.username}</p>
                <span style={{ fontSize: 13, color: "#666" }}>• {c.createdAt}</span>
              </div>

              <p style={{ marginTop: 4 }}>{c.body}</p>

              {/* Voting */}
              <div style={{ display: "flex", gap: 20, marginTop: 10 }}>
                <div
                  onClick={() => vote(c.id, "up")}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    color: c.userVote === "up" ? "#2563eb" : "#555",
                  }}
                >
                  <ThumbsUp size={18} />
                  <span>{c.upvotes}</span>
                </div>

                <div
                  onClick={() => vote(c.id, "down")}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    color: c.userVote === "down" ? "#dc2626" : "#555",
                  }}
                >
                  <ThumbsDown size={18} />
                  <span>{c.downvotes}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr style={{ marginTop: 14, borderColor: "#e5e5e5" }} />
        </div>
      ))}
    </div>
  );
}
