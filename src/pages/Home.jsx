import React from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import CategoriesDropdown from "../components/Categories/CategoriesDropdown";
import burger from "../assets/burger.png";
import Ramen2 from "../assets/Ramen2.png";
import AutoSlider from "../components/AutoSlider";

export default function Home() {
  return (
    <div>
      <HeroSection />

      <section>
        <AutoSlider />
      </section>

      {/* ================= DESKTOP ONLY (LG+) ================= */}
      <div className="hidden lg:block">
        <div className="flex-col m-10 justify-center bg-black/5 rounded-3xl">
          <div className="flex-row">
            <h1 className="w-full text-center font-light text-3xl pt-8">
              Trending Foods This week
            </h1>
          </div>

          <div className="flex m-10 justify-center rounded-3xl">
            <div className="flex-col m-2">
              <a href="/recipe/53099">
                <div className="relative w-150 h-120 rounded-4xl border-2 mb-4 bg-red-200 border-black/0 shadow-xl ">
                  <img src={burger} />
                </div>
              </a>

              <div className="w-150 h-75 rounded-4xl mb-4 text-right">
                <h1 className="text-7xl font-extrabold underline mr-2 mask-radial-from-neutral-500/80">
                  RAMEN
                </h1>

                <div className="flex justify-end m-5">
                  {[
                    ["500K", "Cals"],
                    ["20g", "Fats"],
                    ["80g", "Carbs"],
                    ["25g", "Protein"],
                  ].map(([v, l]) => (
                    <div key={l} className="w-20 h-20 bg-gray-300 rounded-2xl m-2 flex flex-col justify-between shadow-xl">
                      <div className="text-center mt-5 text-2xl font-bold text-gray-800/80">
                        {v}
                      </div>
                      <div className="text-center mt-auto bg-gray-600 rounded-b-2xl text-white">
                        {l}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-gray-500 text-right">
                  Ramen is a flavorful japanese noodle dish made with wheat noodles served in a rich broth, topped with ingredients like soft-boiled eggs, meat slices, spring onions, and spices.
                </div>
              </div>
            </div>

            <div className="flex-col m-2">
              <div className="w-150 h-75 rounded-4xl mb-4">
                <h1 className="text-7xl font-extrabold underline mask-radial-from-neutral-500/80">
                  VEG BURGER
                </h1>

                <div className="flex m-5">
                  {[
                    ["300K", "Cals"],
                    ["12g", "Fats"],
                    ["30g", "Carbs"],
                    ["10g", "Protein"],
                  ].map(([v, l]) => (
                    <div key={l} className="w-20 h-20 bg-gray-300 rounded-2xl m-2 flex flex-col justify-between shadow-xl">
                      <div className="text-center mt-5 text-2xl font-bold text-gray-800/80">
                        {v}
                      </div>
                      <div className="text-center mt-auto bg-gray-600 rounded-b-2xl text-white">
                        {l}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-gray-500">
                  A veg burger is made with a patty of mashed vegetables like potatoes, peas, carrots, and spices, served inside a soft bun with lettuce, tomato, onions, and sauces.
                </div>
              </div>

              <a href="https://www.justonecookbook.com/easy-tonkotsu-ramen-recipe/#wprm-recipe-container-249407">
                <div className="w-150 h-120 rounded-4xl bg-amber-600/30 shadow-xl">
                  <img src={Ramen2} className="w-120 m-auto" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MOBILE + TABLET (SM + MD) ================= */}
      <div className="block lg:hidden px-4 py-8 bg-black/5 rounded-3xl">
        <h1 className="text-center font-light text-2xl mb-8">
          Trending Foods This week
        </h1>

        {/* VEG BURGER */}
        <div className="flex flex-col items-center gap-4 mb-12">
          <img src={burger} className="w-full max-w-[360px] aspect-square rounded-3xl shadow-xl bg-red-200" />

          <h2 className="text-4xl font-extrabold underline mask-radial-from-neutral-500/80">
            VEG BURGER
          </h2>

          <div className="flex gap-3 flex-wrap justify-center">
            {[
              ["300K", "Cals"],
              ["12g", "Fats"],
              ["30g", "Carbs"],
              ["10g", "Protein"],
            ].map(([v, l]) => (
              <div key={l} className="w-16 h-16 bg-gray-300 rounded-2xl flex flex-col justify-between shadow-xl">
                <div className="text-center mt-3 text-lg font-bold text-gray-800/80">
                  {v}
                </div>
                <div className="text-center bg-gray-600 rounded-b-2xl text-white text-xs">
                  {l}
                </div>
              </div>
            ))}
          </div>

          <p className="text-gray-500 text-sm text-center">
            A veg burger is made with a patty of mashed vegetables and spices, served inside a soft bun with lettuce, tomato, onions, and sauces.
          </p>
        </div>

        {/* RAMEN */}
        <div className="flex flex-col items-center gap-4">
          <img src={Ramen2} className="w-full max-w-[360px] aspect-square rounded-3xl shadow-xl bg-amber-600/30" />

          <h2 className="text-4xl font-extrabold underline mask-radial-from-neutral-500/80">
            RAMEN
          </h2>

          <div className="flex gap-3 flex-wrap justify-center">
            {[
              ["500K", "Cals"],
              ["20g", "Fats"],
              ["80g", "Carbs"],
              ["25g", "Protein"],
            ].map(([v, l]) => (
              <div key={l} className="w-16 h-16 bg-gray-300 rounded-2xl flex flex-col justify-between shadow-xl">
                <div className="text-center mt-3 text-lg font-bold text-gray-800/80">
                  {v}
                </div>
                <div className="text-center bg-gray-600 rounded-b-2xl text-white text-xs">
                  {l}
                </div>
              </div>
            ))}
          </div>

          <p className="text-gray-500 text-sm text-center">
            Ramen is a flavorful Japanese noodle dish served in a rich broth with wheat noodles, eggs, meat, spring onions, and spices.
          </p>
        </div>
      </div>

            <section className="w-full px-4 lg:px-16 py-20 bg-white">
      
      {/* TITLE */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-3xl lg:text-4xl font-light text-gray-900">
          How FoodHub Helps You Choose Better
        </h2>
        <p className="mt-4 text-gray-500 text-base lg:text-lg">
          Not just browsing food — making smarter food decisions.
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center">

        {/* LEFT SIDE – INFO BLOCKS */}
        <div className="flex flex-col gap-0 lg:gap-8 md:gap-8 ">

          <div className="
            bg-gray-50 rounded-2xl p-4 md:p-6
            transition-all duration-300
            hover:scale-[1.03]
            hover:shadow-lg
          ">
            <h3 className="text-[18px] lg:text-xl font-semibold text-orange-500 mb-2 ">
              Browse by Categories
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Explore food easily by categories and cuisines instead of endlessly
              scrolling through random dishes.
            </p>
          </div>

          <div className="
            bg-gray-50 rounded-2xl p-4 md:p-6
            transition-all duration-300
            hover:scale-[1.03]
            hover:shadow-lg
          ">
            <h3 className="text-[18px] lg:text-xl font-semibold text-orange-500 mb-2">
              Smart Filters
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Filter dishes based on what you actually want and reduce unnecessary
              reloads and clutter.
            </p>
          </div>

          <div className="
            bg-gray-50 rounded-2xl p-4 md:p-6
            transition-all duration-300
            hover:scale-[1.03]
            hover:shadow-lg
          ">
            <h3 className="text-[18px] lg:text-xl font-semibold text-orange-500 mb-2">
              Know What You Eat
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Get a quick idea about calories, macros, and food composition without
              diving into complicated nutrition charts.
            </p>
          </div>

          <div className="
            bg-gray-50 rounded-2xl p-4 md:p-6
            transition-all duration-300
            hover:scale-[1.03]
            hover:shadow-lg
          ">
            <h3 className="text-[18px] lg:text-xl font-semibold text-orange-500 mb-2">
              Ask AI When Unsure
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Use AI Cook to get food ideas, explanations, or suggestions when
              you’re confused about what to eat.
            </p>
          </div>

        </div>

        {/* RIGHT SIDE – VISUAL PLACEHOLDER */}
        <div className="
          w-full h-[300px] lg:h-[420px]
          rounded-3xl
          bg-orange-100/40
          border border-orange-200 flex
          flex-col items-center justify-center
          transition-all duration-300
          hover:scale-[1.02]
        ">
          <img src="https://img.freepik.com/premium-photo/table-with-many-different-food-items-including-food-drinks_1034924-12084.jpg" className="object-cover w-full"/>
          <p className="text-gray-500/90 mr-auto">© This is an AI genereated image.</p>
        </div>

      </div>
    </section>
      
    </div>
  );
}
