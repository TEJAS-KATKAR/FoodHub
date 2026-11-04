import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Check, Eye, EyeOff, Heart, Sparkles } from "lucide-react";
import AnimalAvatar, { avatarChoices } from "../components/AnimalAvatar";

const accountsKey = "foodhub-demo-accounts";
const sessionKey = "foodhub-session";
const wait = (milliseconds) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));

async function hashPassword(password, salt) {
  if (!globalThis.crypto?.subtle) throw new Error("Secure browser storage is unavailable here. Please use a modern browser on localhost or HTTPS.");
  const bytes = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await globalThis.crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function publishSession(profile) {
  localStorage.setItem(sessionKey, JSON.stringify(profile));
  window.dispatchEvent(new Event("foodhub-auth-change"));
}

export default function AuthPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const signup = searchParams.get("mode") === "signup";
  const [selectedAvatar, setSelectedAvatar] = useState("fox");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function changeMode(nextSignup) {
    setSubmitted(false);
    setSearchParams(nextSignup ? { mode: "signup" } : {});
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await wait(350);
      const accounts = JSON.parse(localStorage.getItem(accountsKey) || "[]");
      const normalizedEmail = email.trim().toLowerCase();

      if (signup) {
        if (accounts.some((account) => account.email === normalizedEmail)) {
          throw new Error("An account with this email already exists. Log in instead.");
        }
        const salt = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        const account = {
          name: name.trim(),
          email: normalizedEmail,
          avatar: selectedAvatar,
          salt,
          passwordHash: await hashPassword(password, salt),
        };
        localStorage.setItem(accountsKey, JSON.stringify([...accounts, account]));
        publishSession({ name: account.name, firstName: account.name.split(/\s+/)[0], email: account.email, avatar: account.avatar });
      } else {
        const account = accounts.find((item) => item.email === normalizedEmail);
        if (!account || account.passwordHash !== await hashPassword(password, account.salt)) {
          throw new Error("That email and password combination was not found. Check your details or create an account.");
        }
        publishSession({ name: account.name, firstName: account.name.split(/\s+/)[0], email: account.email, avatar: account.avatar });
      }
      setSubmitted(true);
    } catch (submitError) {
      setError(submitError instanceof SyntaxError ? "Saved account data could not be read. Please clear this demo’s local storage and try again." : submitError.message || "Could not save your account on this browser.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto grid min-h-[680px] max-w-6xl overflow-hidden rounded-[2rem] border border-orange-100 bg-white shadow-[0_20px_60px_rgba(78,45,15,0.12)] lg:grid-cols-[0.92fr_1.08fr]">
      <aside className="relative flex min-h-[280px] flex-col justify-between overflow-hidden bg-[#20251f] p-7 text-white sm:p-10 lg:min-h-full">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[38px] border-orange-400/10" />
        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-orange-500/10 blur-2xl" />
        <div className="relative">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white"><ArrowLeft size={16} /> Back to exploring</Link>
          <div className="mt-12 max-w-md sm:mt-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200/20 bg-orange-300/10 px-3 py-1.5 text-xs font-semibold text-orange-200"><Sparkles size={14} /> YOUR TABLE IS READY</span>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">A little more<br /><span className="text-orange-400">you</span> at FoodHub.</h1>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/65 sm:text-base">Save the recipes you love, keep your kitchen inspiration close, and find your people around the table.</p>
          </div>
        </div>
        <div className="relative mt-10 max-w-md rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm sm:p-5">
          <div className="flex items-center gap-1 text-orange-300"><Heart size={15} fill="currentColor" /><Heart size={15} fill="currentColor" /><Heart size={15} fill="currentColor" /><Heart size={15} fill="currentColor" /><Heart size={15} fill="currentColor" /></div>
          <p className="mt-3 text-sm leading-relaxed text-white/85">“I came for dinner ideas and left with a whole new list of things to cook.”</p>
          <p className="mt-3 text-xs font-semibold text-white/50">— Someone who loves a good meal</p>
        </div>
      </aside>

      <section className="flex items-center justify-center px-5 py-9 sm:px-10 sm:py-12 lg:px-14">
        <div className="w-full max-w-md">
          <div className="mb-7 flex items-center gap-1 rounded-xl bg-[#f7f5f1] p-1.5">
            <button type="button" onClick={() => changeMode(false)} className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition ${!signup ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-800"}`}>Log in</button>
            <button type="button" onClick={() => changeMode(true)} className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition ${signup ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-800"}`}>Create account</button>
          </div>

          {submitted ? (
            <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700"><Check size={24} /></div>
              <h2 className="mt-4 text-xl font-bold text-gray-900">{signup ? "Welcome to the table!" : "You’re all set!"}</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">Your demo profile is saved in this browser. No account service is connected.</p>
              <Link to="/" className="mt-5 inline-flex rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-500">Explore FoodHub</Link>
            </div>
          ) : <>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-500">{signup ? "Make yourself at home" : "Welcome back"}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">{signup ? "Join the table." : "Good to see you."}</h2>
            <p className="mt-2 text-sm text-gray-500">{signup ? "Create your free FoodHub profile." : "Log in and pick up where you left off."}</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {signup && <>
                <div><label htmlFor="auth-name" className="mb-1.5 block text-xs font-bold text-gray-700">Your name</label><input id="auth-name" required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="What should we call you?" className="w-full rounded-xl border border-gray-200 bg-[#fffdfa] px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-orange-300 focus:ring-4 focus:ring-orange-50" /></div>
                <fieldset><legend className="mb-2 block text-xs font-bold text-gray-700">Pick your little kitchen sidekick</legend><div className="grid grid-cols-5 gap-2">{avatarChoices.map((avatar) => <button key={avatar.id} type="button" onClick={() => setSelectedAvatar(avatar.id)} aria-label={`Choose ${avatar.name} avatar`} aria-pressed={selectedAvatar === avatar.id} className={`relative flex flex-col items-center rounded-2xl p-1 transition hover:-translate-y-1 ${selectedAvatar === avatar.id ? "bg-orange-500 shadow-lg shadow-orange-200 ring-2 ring-orange-200" : "bg-white ring-1 ring-gray-200 hover:ring-orange-300"}`}>{selectedAvatar === avatar.id && <span className="absolute -right-1 -top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-white"><Check size={12} /></span>}<AnimalAvatar type={avatar.id} size={58} /><span className="pb-1 text-[10px] font-bold text-gray-600">{avatar.name}</span></button>)}</div><p className="mt-2 text-[11px] text-gray-400">Choose a polygon pal. You can change it anytime.</p></fieldset>
              </>}
              <div><label htmlFor="auth-email" className="mb-1.5 block text-xs font-bold text-gray-700">Email address</label><input id="auth-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="w-full rounded-xl border border-gray-200 bg-[#fffdfa] px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-orange-300 focus:ring-4 focus:ring-orange-50" /></div>
              <div><div className="mb-1.5 flex items-center justify-between"><label htmlFor="auth-password" className="text-xs font-bold text-gray-700">Password</label>{!signup && <span className="text-[11px] text-gray-400">Local demo account</span>}</div><div className="relative"><input id="auth-password" type={showPassword ? "text" : "password"} required minLength={6} autoComplete={signup ? "new-password" : "current-password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder={signup ? "At least 6 characters" : "Enter your password"} className="w-full rounded-xl border border-gray-200 bg-[#fffdfa] px-4 py-3 pr-12 text-sm outline-none transition placeholder:text-gray-400 focus:border-orange-300 focus:ring-4 focus:ring-orange-50" /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></div>
              {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm leading-relaxed text-red-700">{error}</p>}
              <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-gray-900/10 transition hover:-translate-y-0.5 hover:bg-orange-500 disabled:cursor-wait disabled:opacity-70">{loading ? "One moment…" : signup ? "Create my account" : "Log in to FoodHub"}<span aria-hidden="true">→</span></button>
            </form>
            <p className="mt-5 text-center text-xs leading-relaxed text-gray-400">By continuing, you agree to keep this a welcoming place for food lovers.</p>
          </>}
        </div>
      </section>
    </div>
  );
}
