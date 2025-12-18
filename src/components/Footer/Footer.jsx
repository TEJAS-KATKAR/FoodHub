import React from "react";
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone } from "lucide-react";
import qrcode from "../../assets/qrcode.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-16 px-6 md:px-16 shadow-[-0px_-4px_10px_-2px_rgba(0,0,0,0.3)]
]
">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">

        {/* 1️⃣ Navigation */}
        <div >
          <h3 className="text-white font-semibold text-lg mb-4">Navigation</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" onClick={() => window.scrollTo(0, 0)} className="hover:text-orange-400 transition">
                Home
              </Link>
            </li>

            <li>
              <Link to="/filters" onClick={() => window.scrollTo(0, 0)} className="hover:text-orange-400 transition">
                Categories
              </Link>
            </li>

            <li>
              <Link to="/aicook" onClick={() => window.scrollTo(0, 0)} className="hover:text-orange-400 transition">
                AI Cook
              </Link>
            </li>

            <li>
              <Link to="/favourites" onClick={() => window.scrollTo(0, 0)} className="hover:text-orange-400 transition">
                Favorites
              </Link>
            </li>

            <li>
              <Link to="/newsletter" onClick={() => window.scrollTo(0, 0)} className="hover:text-orange-400 transition">
                Newsletter
              </Link>
            </li>
          </ul>
        </div>

        {/* 2️⃣ Technologies Used */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Technologies</h3>
          <ul className="space-y-2">
            <li>React.js</li>
            <li>Vite</li>
            <li>TailwindCSS</li>
            <li>React Router</li>
            <li>Lucide Icons</li>
            <li>LocalStorage</li>
            <li>MealDB Dataset</li>
          </ul>
        </div>

        {/* 3️⃣ Developer Tools */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Developer Tools</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="https://www.kaggle.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.scrollTo(0, 0)}
                className="hover:text-orange-400 transition"
              >
                Kaggle (Dataset)
              </a>
            </li>

            <li>
              <a
                href="https://www.fooddive.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.scrollTo(0, 0)}
                className="hover:text-orange-400 transition"
              >
                FoodDive (Newsletters)
              </a>
            </li>

            <li>
              <a
                href="https://developer.mozilla.org"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.scrollTo(0, 0)}
                className="hover:text-orange-400 transition"
              >
                MDN Web Docs
              </a>
            </li>

            <li>
              <a
                href="https://react.dev"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.scrollTo(0, 0)}
                className="hover:text-orange-400 transition"
              >
                React Documentation
              </a>
            </li>

            <li>
              <a
                href="https://tailwindcss.com/docs"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.scrollTo(0, 0)}
                className="hover:text-orange-400 transition"
              >
                Tailwind Docs
              </a>
            </li>
          </ul>
        </div>

        {/* 4️⃣ Social + Contact */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Connect With Us</h3>
          <ul className="space-y-3">

            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.scrollTo(0, 0)}
                className="flex items-center gap-2 hover:text-orange-400 transition"
              >
                <Instagram size={18} /> Instagram
              </a>
            </li>

            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.scrollTo(0, 0)}
                className="flex items-center gap-2 hover:text-orange-400 transition"
              >
                <Facebook size={18} /> Facebook
              </a>
            </li>

            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.scrollTo(0, 0)}
                className="flex items-center gap-2 hover:text-orange-400 transition"
              >
                <Linkedin size={18} /> LinkedIn
              </a>
            </li>

            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.scrollTo(0, 0)}
                className="flex items-center gap-2 hover:text-orange-400 transition"
              >
                <Twitter size={18} /> Twitter
              </a>
            </li>

          </ul>

          {/* Contact */}
          <div className="mt-6">
            <h3 className="text-white font-semibold text-lg mb-2">Contact</h3>
            <ul className="space-y-3">

              <li>
                <a
                  href="mailto:support@foodhub.com"
                  onClick={() => window.scrollTo(0, 0)}
                  className="flex items-center gap-2 hover:text-orange-400 transition"
                >
                  <Mail size={18} /> support@foodhub.com
                </a>
              </li>

              <li>
                <a
                  href="tel:+919999888877"
                  onClick={() => window.scrollTo(0, 0)}
                  className="flex items-center gap-2 hover:text-orange-400 transition"
                >
                  <Phone size={18} /> +91 9999 8888 77
                </a>
              </li>

            </ul>
          </div>
        </div>

        {/* 5️⃣ About */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">About Us</h3>
          <ul className="space-y-2">

            <li>
              <Link to="/aboutus" onClick={() => window.scrollTo(0, 0)} className="hover:text-orange-400 transition">
                FoodHub
              </Link>
            </li>

            <li>
              <Link to="/aboutme" onClick={() => window.scrollTo(0, 0)} className="hover:text-orange-400 transition">
                About Me
              </Link>
            </li>

            <li>
              <Link to="/team" onClick={() => window.scrollTo(0, 0)} className="hover:text-orange-400 transition">
                Team
              </Link>
            </li>

            <li>
              <Link to="/terms" onClick={() => window.scrollTo(0, 0)} className="hover:text-orange-400 transition">
                Terms & Conditions
              </Link>
            </li>

            <li>
              <Link to="/privacy" onClick={() => window.scrollTo(0, 0)} className="hover:text-orange-400 transition">
                Privacy Policy
              </Link>
            </li>

          </ul>

          <div className="mt-6">
            <h3 className="text-white font-semibold text-lg mb-4">Want to Collaborate?</h3>
            <a href="mailto:tkatkar1256@email.com" onClick={() => window.scrollTo(0, 0)}>
              <img src={qrcode} alt="qrcode" className="w-34" />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="text-center text-gray-400 mt-12 text-sm">
        © {new Date().getFullYear()} FoodHub • All Rights Reserved
      </div>
    </footer>
  );
}
