import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronDown, Heart, MessageCircle, Search, Send, UtensilsCrossed } from "lucide-react";
import foodData from "../data/foodComments.json";

const storageKey = "foodhub-community-comments-v2";
const palette = ["#f97316", "#16a34a", "#8b5cf6", "#0ea5e9", "#db2777", "#ca8a04"];

function makeComments() {
  const times = ["12 min ago", "38 min ago", "1 hour ago", "3 hours ago", "5 hours ago", "yesterday"];

  return foodData.comments.map((comment, index) => ({
    ...comment,
    createdAt: times[index % times.length],
    likes: 18 + ((index * 17) % 190),
    replies: comment.replies || [],
  }));
}

function initialComments() {
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) return JSON.parse(saved);
  } catch {
    // Use sample comments if browser storage is unavailable or invalid.
  }

  return makeComments();
}

function Avatar({ name, index = 0, small = false }) {
  return (
    <div className={`${small ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm"} flex shrink-0 items-center justify-center rounded-full font-bold text-white`} style={{ backgroundColor: palette[index % palette.length] }} aria-hidden="true">
      {name.slice(0, 1).toUpperCase()}
    </div>
  );
}

export default function CommentsPage() {
  const [comments, setComments] = useState(initialComments);
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("popular");
  const [replyTo, setReplyTo] = useState(null);
  const [replyDraft, setReplyDraft] = useState("");

  function save(next) {
    setComments(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // Page remains usable without storage.
    }
  }

  function addComment(event) {
    event.preventDefault();
    if (!draft.trim()) return;

    save([
      {
        id: Date.now(),
        username: "You",
        body: draft.trim(),
        createdAt: "just now",
        likes: 0,
        replies: [],
      },
      ...comments,
    ]);

    setDraft("");
  }

  function addReply(event, comment) {
    event.preventDefault();
    if (!replyDraft.trim()) return;

    save(
      comments.map((item) =>
        item.id === comment.id
          ? {
              ...item,
              replies: [...(item.replies || []), ["You", replyDraft.trim(), "just now"]],
            }
          : item
      )
    );

    setReplyDraft("");
    setReplyTo(null);
  }

  function like(id) {
    save(
      comments.map((item) =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
  }

  const visibleComments = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return comments
      .filter((item) => `${item.username} ${item.body}`.toLowerCase().includes(normalized))
      .sort((a, b) =>
        sort === "popular"
          ? b.likes - a.likes
          : comments.indexOf(a) - comments.indexOf(b)
      );
  }, [comments, query, sort]);

  const replyCount = comments.reduce(
    (total, item) => total + (item.replies?.length || 0),
    0
  );

  return (
    <div className="mx-auto max-w-5xl pb-12">
      <Link to="/" className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-orange-600">
        <ArrowLeft size={17} /> Back to FoodHub
      </Link>

      <section className="overflow-hidden rounded-3xl border border-orange-100 bg-[#fffaf4] shadow-[0_12px_35px_rgba(74,48,20,0.08)]">
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-500 to-amber-400 px-6 py-8 text-white sm:px-10 sm:py-10">
          <div className="absolute -right-8 -top-12 h-48 w-48 rounded-full border-[28px] border-white/10" />

          <div className="relative flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20">
              <UtensilsCrossed size={23} />
            </div>

            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-orange-50">
                The FoodHub table
              </p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Food worth talking about
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-orange-50 sm:text-base">
                Share your kitchen wins, swap a tip, and see what the FoodHub community is cooking.
              </p>
            </div>
          </div>

          <div className="relative mt-7 flex flex-wrap gap-3 text-sm font-medium">
            <span className="rounded-full bg-white/20 px-3 py-1.5">{comments.length} comments</span>
            <span className="rounded-full bg-white/20 px-3 py-1.5">{replyCount} replies</span>
            <span className="rounded-full bg-white/20 px-3 py-1.5">A little more delicious together</span>
          </div>
        </div>

        <div className="grid gap-6 p-4 sm:p-7 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-8">
          <div className="min-w-0">
            <form onSubmit={addComment} className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm sm:p-5">
              <label htmlFor="new-comment" className="mb-3 block text-sm font-bold text-gray-800">
                Join the conversation
              </label>

              <textarea
                id="new-comment"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="What have you been cooking lately?"
                rows={3}
                className="w-full resize-y rounded-xl border border-gray-200 bg-[#fffdfa] px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-orange-300 focus:ring-4 focus:ring-orange-50"
              />

              <div className="mt-3 flex justify-end">
                <button
                  type="submit"
                  disabled={!draft.trim()}
                  className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  <Send size={15} /> Post comment
                </button>
              </div>
            </form>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Community conversation <span className="ml-1 text-sm font-medium text-gray-400">{comments.length}</span>
              </h2>

              <label className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500">
                <span className="sr-only">Sort comments</span>
                <ChevronDown size={16} />
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  className="bg-transparent font-medium text-gray-700 outline-none"
                >
                  <option value="popular">Most loved</option>
                  <option value="recent">Newest first</option>
                </select>
              </label>
            </div>

            <div className="mt-4 space-y-3">
              {visibleComments.map((comment, index) => (
                <article key={comment.id} className="rounded-2xl border border-orange-100/80 bg-white p-4 sm:p-5">
                  <div className="flex gap-3">
                    <Avatar name={comment.username} index={index} />

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <h3 className="text-sm font-bold text-gray-900">{comment.username}</h3>
                        <span className="text-xs text-gray-400">· {comment.createdAt}</span>
                      </div>

                      <p className="mt-2 text-sm leading-relaxed text-gray-700">{comment.body}</p>

                      <div className="mt-3 flex flex-wrap items-center gap-4">
                        <button
                          onClick={() => like(comment.id)}
                          className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-semibold text-gray-500 transition hover:bg-rose-50 hover:text-rose-500"
                          aria-label={`Like ${comment.username}'s comment`}
                        >
                          <Heart size={15} /> {comment.likes}
                        </button>

                        <button
                          onClick={() => {
                            setReplyTo(replyTo === comment.id ? null : comment.id);
                            setReplyDraft("");
                          }}
                          className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-semibold text-gray-500 transition hover:bg-orange-50 hover:text-orange-600"
                        >
                          <MessageCircle size={15} /> Reply
                        </button>

                        {comment.replies.length > 0 && (
                          <span className="text-xs text-gray-400">
                            {comment.replies.length} {comment.replies.length === 1 ? "reply" : "replies"}
                          </span>
                        )}
                      </div>

                      {replyTo === comment.id && (
                        <form onSubmit={(event) => addReply(event, comment)} className="mt-3 flex gap-2">
                          <input
                            autoFocus
                            value={replyDraft}
                            onChange={(event) => setReplyDraft(event.target.value)}
                            placeholder={`Reply to ${comment.username}…`}
                            className="min-w-0 flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-orange-300"
                          />
                          <button
                            disabled={!replyDraft.trim()}
                            className="rounded-xl bg-orange-500 px-3 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-40"
                          >
                            Send
                          </button>
                        </form>
                      )}

                      {comment.replies.length > 0 && (
                        <div className="mt-4 space-y-4 border-l-2 border-orange-100 pl-3 sm:pl-4">
                          {comment.replies.map(([name, body, time], replyIndex) => (
                            <div key={`${comment.id}-${replyIndex}`} className="flex gap-2.5">
                              <Avatar name={name} index={index + replyIndex + 2} small />

                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-x-2">
                                  <span className="text-xs font-bold text-gray-800">{name}</span>
                                  <span className="text-[11px] text-gray-400">· {time}</span>
                                </div>
                                <p className="mt-1 text-sm leading-relaxed text-gray-600">{body}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}

              {visibleComments.length === 0 && (
                <div className="rounded-2xl border border-dashed border-orange-200 bg-white p-8 text-center text-sm text-gray-500">
                  No comments match “{query}”. Try another search.
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-4 lg:pt-1">
            <div className="rounded-2xl border border-orange-100 bg-white p-4">
              <h2 className="font-bold text-gray-900">Find a conversation</h2>

              <label className="mt-3 flex items-center gap-2 rounded-xl border border-gray-200 bg-[#fffdfa] px-3 py-2.5 focus-within:border-orange-300">
                <Search size={16} className="shrink-0 text-gray-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search comments"
                  className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-gray-400"
                />
              </label>
            </div>

            <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50 p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-orange-500 shadow-sm">
                <MessageCircle size={19} />
              </div>

              <h2 className="font-bold text-gray-900">Good food brings us together</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Tell us what worked, share a little kitchen wisdom, and keep the conversation kind.
              </p>

              <Link to="/" className="mt-4 inline-flex text-sm font-semibold text-orange-600 hover:text-orange-700">
                Explore recipes <span className="ml-1">→</span>
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}