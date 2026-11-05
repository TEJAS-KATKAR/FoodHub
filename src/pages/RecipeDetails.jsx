import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMealDetails } from "../api/mealdb";
import { Heart, Share2, Sparkles, Clock, Utensils } from "lucide-react";

const FAV_KEY = "foodhub_favourites";

export default function RecipeDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFav, setIsFav] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getMealDetails(id);
        setMeal(data);
      } catch (error) {
        setMeal(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  // Favourite state
  useEffect(() => {
    if (!meal) return;

    const checkFavourite = () => {
      try {
        const favs = JSON.parse(localStorage.getItem(FAV_KEY)) || [];
        setIsFav(favs.some((f) => f.source === "mealdb" && String(f.id) === String(meal.idMeal)));
      } catch {
        setIsFav(false);
      }
    };

    checkFavourite();
    window.addEventListener("foodhub-favourites-updated", checkFavourite);

    return () => window.removeEventListener("foodhub-favourites-updated", checkFavourite);
  }, [meal]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!meal) return <div className="p-6 text-red-500">No recipe found.</div>;

  // Ingredients
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const mea = meal[`strMeasure${i}`];

    if (ing && ing.trim()) {
      ingredients.push(`${mea || ""} ${ing}`.trim());
    }
  }

  // Favourite
  const toggleFavourite = () => {
    let favs = [];

    try {
      favs = JSON.parse(localStorage.getItem(FAV_KEY)) || [];
    } catch {}

    const exists = favs.some((f) => f.source === "mealdb" && String(f.id) === String(meal.idMeal));

    const recipe = {
      id: meal.idMeal,
      title: meal.strMeal,
      image: meal.strMealThumb,
      source: "mealdb",
      raw: meal,
    };

    const updated = exists
      ? favs.filter((f) => !(f.source === "mealdb" && String(f.id) === String(meal.idMeal)))
      : [...favs, recipe];

    localStorage.setItem(FAV_KEY, JSON.stringify(updated));
    setIsFav(!exists);
    window.dispatchEvent(new Event("foodhub-favourites-updated"));
  };

  // Share
  const handleShare = async () => {
    const shareData = {
      title: meal.strMeal,
      text: `Check out this recipe: ${meal.strMeal}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Recipe link copied!");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        alert("Unable to share this recipe.");
      }
    }
  };

  const handleAskAI = () => {
    navigate("/aicook", {
      state: {
        recipeContext: {
          name: meal.strMeal,
          ingredients,
          category: meal.strCategory,
          cuisine: meal.strArea,
          tags: meal.strTags,
          instructions: meal.strInstructions,
        },
      },
    });
  };

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl p-6 md:p-8">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

          {/* IMAGE */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="bg-gray-100 rounded-2xl p-3 shadow-md">
              <img
                src={`${meal.strMealThumb}/medium`}
                alt={meal.strMeal}
                className="w-full h-56 object-cover rounded-xl"
              />
              <p className="mt-2 text-center text-sm text-gray-500">
                MealDB Recipe
              </p>
            </div>
          </div>

          {/* TITLE + INFORMATION */}
          <div className="md:col-span-8 lg:col-span-9">
            <div className="bg-orange-50 rounded-2xl p-5 h-full flex flex-col">

              {/* TITLE + ACTIONS */}
              <div className="flex items-start justify-between gap-3">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {meal.strMeal}
                </h1>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={toggleFavourite}
                    aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
                    className={`w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm hover:scale-110 transition ${
                      isFav ? "text-red-500" : "text-gray-600"
                    }`}
                  >
                    <Heart size={19} className={isFav ? "fill-red-500" : ""} />
                  </button>

                  <button
                    onClick={handleShare}
                    aria-label="Share recipe"
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-gray-600 shadow-sm hover:scale-110 transition"
                  >
                    <Share2 size={18} />
                  </button>
                </div>
              </div>

              {/* CATEGORY + AREA + TAGS */}
              <div className="flex flex-wrap gap-2 mt-3">
                {meal.strCategory && (
                  <span className="px-3 py-1.5 rounded-full bg-white shadow-sm text-sm text-gray-700">
                    🍽 {meal.strCategory}
                  </span>
                )}

                {meal.strArea && (
                  <span className="px-3 py-1.5 rounded-full bg-white shadow-sm text-sm text-gray-700">
                    🌍 {meal.strArea}
                  </span>
                )}

                {meal.strTags &&
                  meal.strTags.split(",").filter(Boolean).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full bg-white shadow-sm text-sm text-gray-700"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
              </div>

              {/* RECIPE STATISTICS */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">

                <div className="flex items-center gap-2 bg-white rounded-xl p-3 shadow-sm">
                  <Clock size={21} className="text-orange-500 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Estimated Time</p>
                    <p className="font-bold text-gray-800 text-sm">50 min</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-white rounded-xl p-3 shadow-sm">
                  <Utensils size={21} className="text-orange-500 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Ingredients</p>
                    <p className="font-bold text-gray-800 text-sm">{ingredients.length} Items</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-white rounded-xl p-3 shadow-sm col-span-2 sm:col-span-1">
                  <Heart size={21} className="text-orange-500 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Your Collection</p>
                    <p className="font-bold text-gray-800 text-sm">{isFav ? "Favourited" : "Add to Favourites"}</p>
                  </div>
                </div>

              </div>

              {/* ASK AI */}
              <div className="mt-auto pt-5">
                <button
                  type="button"
                  onClick={handleAskAI}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  <Sparkles size={18} />
                  Ask AI About This Recipe
                </button>
              </div>

            </div>
          </div>

          {/* INGREDIENTS */}
          <div className="md:col-span-12">
            <div className="bg-gray-100 rounded-2xl p-5">
              <h2 className="text-xl font-semibold mb-2">
                Ingredients ({ingredients.length})
              </h2>

              <ul className="list-disc list-inside columns-1 md:columns-2">
                {ingredients.map((item, i) => (
                  <li key={i} className="mb-1 break-inside-avoid">
                    {item}
                  </li>
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

          {/* YOUTUBE */}
          {meal.strYoutube && (
            <div className="md:col-span-12 flex justify-center mt-4">
              <div className="bg-[#0F0F0F]/90 p-4 rounded-2xl w-full max-w-2xl">
                <a
                  href={meal.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <div className="flex items-center gap-1">
                    <svg width="30" height="35" viewBox="0 0 25 20" fill="#FF0000">
                      <path d="M23.5 6.2s-.2-1.7-.8-2.5c-.8-.9-1.6-.9-2-1C16.8 2.3 12 2.3 12 2.3h-.1s-4.8 0-8.7.4c-.4.1-1.2.1-2 1C.7 4.5.5 6.2.5 6.2S0 8.1.5 10v1.9c0 1.9.5 3.8.5 3.8s.2 1.7.8 2.5c.8.9 1.8.9 2.2 1 1.6.2 6.5.4 8.5.4h.2c0 .1 4.8 0 8.7-.4.4-.1 1.2-.1 2-1 .7-.8.8-2.5.8-2.5s.5-1.9.5-3.8V10c0-1.9-.5-3.8-.5-3.8zM9.7 13.6V8.4l5.8 2.6-5.8 2.6z"/>
                    </svg>

                    <span className="text-white font-bold text-xl tracking-tight">
                      YouTube
                    </span>
                    <span className="text-gray-400 text-xs mb-auto">IN</span>
                  </div>

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