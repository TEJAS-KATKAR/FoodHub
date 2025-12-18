// src/pages/RecipeDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMealDetails } from "../api/mealdb";

export default function RecipeDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getMealDetails(id);
      setMeal(data);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!meal) return <div className="p-6 text-red-500">No recipe found.</div>;

  // INGREDIENTS
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const mea = meal[`strMeasure${i}`];
    if (ing && ing.trim()) ingredients.push(`${mea || ""} ${ing}`);
  }

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl p-6 md:p-8">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

          {/* IMAGE */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="bg-gray-100 rounded-2xl p-3 shadow-md">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-56 object-cover rounded-xl"
              />
              <p className="mt-2 text-center text-sm text-gray-500">
                MealDB Recipe
              </p>
            </div>
          </div>

          {/* TITLE + TAGS */}
          <div className="md:col-span-8 lg:col-span-9">
            <div className="bg-orange-50 rounded-2xl p-5 h-full">
              <h1 className="text-3xl font-bold mb-3">{meal.strMeal}</h1>

              <div className="flex flex-wrap gap-3 text-sm">
                {meal.strCategory && (
                  <span className="px-3 py-1 rounded-full bg-white shadow">
                    🍽 {meal.strCategory}
                  </span>
                )}
                {meal.strArea && (
                  <span className="px-3 py-1 rounded-full bg-white shadow">
                    🌍 {meal.strArea}
                  </span>
                )}
                {meal.strTags &&
                  meal.strTags.split(",").map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-white shadow"
                    >
                      #{tag}
                    </span>
                  ))}
              </div>
            </div>
          </div>

          {/* INGREDIENTS */}
          <div className="md:col-span-12">
            <div className="bg-gray-100 rounded-2xl p-5">
              <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
              <ul className="list-disc list-inside columns-1 md:columns-2">
                {ingredients.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* INSTRUCTIONS */}
          <div className="md:col-span-12">
            <div className="bg-white border rounded-2xl p-5 shadow">
              <h2 className="text-xl font-semibold mb-2">Instructions</h2>
              <p className="leading-relaxed whitespace-pre-line">
                {meal.strInstructions}
              </p>
            </div>
          </div>

          {/* YOUTUBE FAKE SEARCH BAR */}
          {meal.strYoutube && (
            <div className="md:col-span-12 flex justify-center mt-4">

              <div className="bg-[#0F0F0F]/90 p-4 rounded-2xl w-full max-w-2xl">
                <a
                  href={meal.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 cursor-pointer"
                >
                  {/* YOUTUBE LOGO */}
                  <div className="flex items-center gap-1">
                    <svg width="30" height="35" viewBox="0 0 25 20" fill="#FF0000">
                      <path d="M23.5 6.2s-.2-1.7-.8-2.5c-.8-.9-1.6-.9-2-1C16.8 2.3 12 2.3 12 2.3h-.1s-4.8 0-8.7.4c-.4.1-1.2.1-2 1C.7 4.5.5 6.2.5 6.2S0 8.1 0 10v1.9c0 1.9.5 3.8.5 3.8s.2 1.7.8 2.5c.8.9 1.8.9 2.2 1 1.6.2 6.5.4 8.5.4h.2c0 .1 4.8 0 8.7-.4.4-.1 1.2-.1 2-1 .7-.8.8-2.5.8-2.5s.5-1.9.5-3.8V10c0-1.9-.5-3.8-.5-3.8zM9.7 13.6V8.4l5.8 2.6-5.8 2.6z"/>
                    </svg>

                    <span className="text-white font-bold text-xl tracking-tight">
                      YouTube
                    </span>
                    <span className="text-gray-400 text-xs mb-auto">IN</span>
                  </div>

                  {/* FAKE SEARCH */}
                  <div className="flex items-center grow bg-[#303134] border border-[#474747] rounded-full h-10 ml-4 overflow-hidden">
                    <span className="text-blue-400/70 ml-4">
                      Watch on YouTube
                    </span>
                    <div className="ml-auto bg-[#474747] px-4 h-full flex items-center justify-center">
                      <svg width="22" height="22" viewBox="0 0 24 24" stroke="white" strokeWidth="2" fill="none">
                        <circle cx="11" cy="11" r="7"></circle>
                        <line x1="16" y1="16" x2="22" y2="22"></line>
                      </svg>
                    </div>
                  </div>
                </a>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
