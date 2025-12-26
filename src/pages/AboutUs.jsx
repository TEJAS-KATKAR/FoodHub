// src/pages/AboutUs.jsx
import React from "react";

import {
  Flame,
  Database,
  Layers,
  Palette,
  HardDrive,
  Bot,
  Code,
  Link,
  Paintbrush,
} from "lucide-react";

export default function AboutUs() {
  const profile = "https://static.vecteezy.com/system/resources/previews/038/242/327/non_2x/user-profile-icon-in-circle-button-on-white-background-free-vector.jpg"
  return (
    <div className="p-1 flex justify-center">
      {/* ONE SINGLE WIDTH CONTAINER */}
      <div className="w-full max-w-6xl space-y-8">

        {/* ================= ABOUT FOODHUB ================= */}
        <div className="bg-[#0f172a] text-white rounded-3xl shadow-2xl p-4 lg:p-6 ">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

            <div className="md:col-span-7 bg-[#020617] rounded-2xl p-6">
              <h1 className="text-3xl font-bold mb-4 text-orange-400">
                About FoodHub
              </h1>
              <p className="text-gray-300 leading-relaxed text-[15px] lg:text-[16px]">
                FoodHub is built to let users explore food items using categories,
                filters, and detailed views in a smooth and structured way.
                <br /><br />
                While building this project, one major challenge was the lack of a
                perfect food API. Some APIs had images but no categories, others
                had strict request limits, and many datasets missed important
                details.
                <br /><br />
                Instead of relying on a single source, FoodHub combines live APIs
                with offline datasets to provide better coverage and reliability
                without breaking the user experience.
              </p>
            </div>

            <div className="md:col-span-5 grid gap-4">
              {[
                {
                  title: "Smart Data Handling",
                  text: "Combines APIs and datasets without forcing missing data into the UI.",
                },
                {
                  title: "Optimized Navigation",
                  text: "Filters and search reduce unnecessary reloads and API calls.",
                },
                {
                  title: "Real UI Challenges",
                  text: "Horizontal scrolling, mixed content cards, responsive layouts.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-[#1e293b] rounded-2xl p-4 transition-all duration-300
                             hover:scale-[1.04]
                             hover:shadow-[0_0_25px_rgba(255,115,0,0.25)]"
                >
                  <h3 className="text-lg font-semibold text-orange-300 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= TECH & PURPOSE ================= */}
        <div className="bg-[#020617] text-white rounded-3xl shadow-2xl p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

            <div className="md:col-span-6 bg-[#0f172a] rounded-2xl p-6 transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_25px_rgba(255,115,0,0.25)]">
              <h2 className="text-2xl font-bold mb-4 text-orange-400">
                Technologies Used
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 ">
                <Tech icon={<Flame />} label="React.js" />
                <Tech icon={<Bot />} label="AI Integration (API)" />
                <Tech icon={<Bot />} label="Backup AI (logic)" />
                <Tech icon={<Palette />} label="Tailwind CSS" />
                <Tech icon={<Layers />} label="Lucide Icons" />
                <Tech icon={<Link />} label="Multiple APIs" />
                <Tech icon={<Database />} label="Offline Dataset" />
                <Tech icon={<HardDrive />} label="LocalStorage Cache" />
              </div>
            </div>

            <div className="md:col-span-6 bg-[#0f172a] rounded-2xl p-6 transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_25px_rgba(255,115,0,0.25)]">
              <h2 className="text-2xl font-bold mb-4 text-orange-400">
                Why FoodHub Exists
              </h2>
              <p className="text-gray-300 leading-relaxed">
                FoodHub exists to provide a fast and organized way to browse food
                using filters, categories, and detailed views.
                <br /><br />
                It fetches data from external APIs as well as local datasets,
                reducing dependency on a single source and minimizing repeated
                requests.
                <br /><br />
                The focus is simplicity, performance, and a smooth browsing
                experience even with inconsistent data sources.
              </p>
            </div>
          </div>
        </div>

        {/* =========================
             SECTION 3: ABOUT ME
            ========================== */}
        <div className="bg-[#0f172a] text-white rounded-3xl shadow-2xl p-4 lg:p-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* LEFT: BIG PROFILE CARD */}
            <div className="lg:col-span-5 bg-[#020617] rounded-2xl p-8 flex flex-col items-center text-center">

              {/* PROFILE IMAGE */}
              <div className="w-44 h-44 rounded-full overflow-hidden bg-gray-700 mb-6">
                <img
                  src={profile} 
                  alt="Tejas Katkar"
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="text-3xl font-bold">Tejas Katkar</h2>
              <p className="text-orange-400 text-lg font-medium mt-1 transition-all duration-100 hover:scale-[1.04] hover:shadow-[0_0_25px_rgba(255,115,0,0.25)]">
                Frontend Developer
              </p>

              <p className="text-gray-400 text-base leading-relaxed mt-5 text-[14px] lg:text-[16px]">
                I build clean, structured, and user-focused frontend interfaces with
                strong attention to layout, navigation, and data organization.
              </p>

              {/* SOCIAL ICONS */}
              <div className="flex gap-6 mt-6 text-gray-400">
                <a href="#" className="hover:text-orange-400  duration-100 hover:scale-[1.04] hover:shadow-[0_0_25px_rgba(255,115,0,0.25)]">Twitter</a>
                <a href="#" className="hover:text-orange-400 transition duration-100 hover:scale-[1.04] hover:shadow-[0_0_25px_rgba(255,115,0,0.25)]">Instagram</a>
                <a href="https://www.linkedin.com/in/tejas-katkar1016" className="hover:text-orange-400 transition duration-100 hover:scale-[1.04] hover:shadow-[0_0_25px_rgba(255,115,0,0.25)]">LinkedIn</a>
              </div>
            </div>

            {/* RIGHT: SKILLS + ABOUT */}
            <div className="lg:col-span-7 flex flex-col gap-8">

              {/* SKILL PROFICIENCY */}
              <div className="bg-[#020617] rounded-2xl p-6 duration-300 hover:scale-[1.04] hover:shadow-[0_0_25px_rgba(255,115,0,0.25)]">
                <div className="flex items-center mb-6">
                  <p className="bg-orange-500/20 text-orange-400 text-sm font-semibold px-2 py-1 rounded-lg">
                    8.2
                  </p>
                  <p className="ml-2 font-medium text-gray-200">Excellent</p>
                  <span className="w-1 h-1 mx-2 rounded-full bg-gray-500"></span>
                  <span className="ml-auto text-sm font-medium text-orange-400">
                    Skill overview
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  {/* LEFT COLUMN */}
                  <div className="space-y-4">
                    {[
                      { label: "React", value: 82 },
                      { label: "Tailwind CSS", value: 88 },
                      { label: "Javascript", value: 65 },
                      { label: "UI Layout", value: 78 },
                      
                    ].map(item => (
                      <div key={item.label}>
                        <p className="text-sm font-medium text-gray-400 mb-1">
                          {item.label}
                        </p>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-700 rounded-full h-2.5 mr-2">
                            <div
                              className="bg-orange-500/80 h-2.5 rounded-full"
                              style={{ width: `${item.value}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-300">
                            {(item.value / 10).toFixed(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* RIGHT COLUMN */}
                  <div className="space-y-4">
                    {[
                      { label: "Problem Solving", value: 89 },
                      { label: "Clean Code", value: 70 },
                      { label: "AI usage (as low as good)", value: 46 },
                    ].map(item => (
                      <div key={item.label}>
                        <p className="text-sm font-medium text-gray-400 mb-1">
                          {item.label}
                        </p>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-700 rounded-full h-2.5 mr-2">
                            <div
                              className="bg-orange-500/80 h-2.5 rounded-full"
                              style={{ width: `${item.value}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-300">
                            {(item.value / 10).toFixed(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>


              {/* ABOUT ME TEXT */}
              <div className="bg-[#020617] rounded-2xl p-6 min-h-[220px] duration-300 hover:scale-[1.04] hover:shadow-[0_0_25px_rgba(255,115,0,0.25)]">
                <h3 className="text-xl font-semibold text-orange-400 mb-4">
                  About Me
                </h3>

                <p className="text-gray-300 text-base leading-relaxed ">
                  I enjoy working on frontend problems involving layout, navigation,
                  and data organization, focusing on clarity and maintainability rather
                  than just visuals.
                  <br /><br />
                  My goal is to design interfaces that feel simple to use while staying
                  scalable and clean underneath.
                </p>
              </div>

            </div>
          </div>

          {/* COLLABORATION BAR (SMALL & COMPACT) */}
          <div
            className="
              mt-10 rounded-xl px-6 py-4 text-center
              bg-linear-to-r from-yellow-300/80 to-orange-400/40
              border border-yellow-400/80 max-w-100 ml-auto mr-auto duration-100 hover:scale-[1.04] hover:shadow-[0_0_25px_rgba(255,115,0,0.25)]
            "
          >
            <h3 className="text-xl font-semibold mb-3 ">
              Want to collaborate?
            </h3>

            <a
              href="mailto:your-email-here"
              className="
                inline-block px-8 py-3 rounded-full font-semibold text-black
                bg-linear-to-r from-yellow-300 to-orange-400
                shadow-md transition-transform
                hover:scale-105 b-5 bg-neutral-800
              "
            >
              Let’s Talk
            </a>
          </div>

        </div>
        </div>
        </div>
          );
        }

        function Tech({ icon, label }) {
          return (
            <div className="flex items-center gap-3 bg-[#020617] rounded-xl p-3">
              <span className="text-orange-400">{icon}</span>
              <span className="text-sm text-gray-200">{label}</span>
            </div>
          );
        }
