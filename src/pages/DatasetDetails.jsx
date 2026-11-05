// src/pages/DatasetDetails.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDatasetById } from "../api/dataset";
import { Heart, Share2, Sparkles, Clock, Utensils } from "lucide-react";

const FAV_KEY = "foodhub_favourites";

export default function DatasetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = getDatasetById(id);

  const [isFav, setIsFav] = useState(false);

  const ingredients = data?.ingredients
    ? data.ingredients.split(",").map(item => item.trim()).filter(Boolean)
    : [];

  // Favourite state
  useEffect(() => {
    if (!data) return;

    const checkFavourite = () => {
      try {
        const favs = JSON.parse(localStorage.getItem(FAV_KEY)) || [];
        setIsFav(favs.some(f => f.source === "dataset" && String(f.id) === String(id)));
      } catch {
        setIsFav(false);
      }
    };

    checkFavourite();
    window.addEventListener("foodhub-favourites-updated", checkFavourite);

    return () => window.removeEventListener("foodhub-favourites-updated", checkFavourite);
  }, [id, data]);

  if (!data) {
    return <div className="p-6 text-red-500">Dataset item not found.</div>;
  }

  // Favourite
  const toggleFavourite = () => {
    let favs = [];

    try {
      favs = JSON.parse(localStorage.getItem(FAV_KEY)) || [];
    } catch {}

    const exists = favs.some(f => f.source === "dataset" && String(f.id) === String(id));

    const recipe = {
      id,
      title: data.name,
      image: data.img_url,
      source: "dataset",
      raw: data
    };

    const updated = exists
      ? favs.filter(f => !(f.source === "dataset" && String(f.id) === String(id)))
      : [...favs, recipe];

    localStorage.setItem(FAV_KEY, JSON.stringify(updated));
    setIsFav(!exists);
    window.dispatchEvent(new Event("foodhub-favourites-updated"));
  };

  // Share
  const handleShare = async () => {
    const shareData = {
      title: data.name,
      text: `Check out this recipe: ${data.name}`,
      url: window.location.href
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

  // Ask AI
  const handleAskAI = () => {
    navigate("/aicook", {
      state: {
        recipeContext: {
          name: data.name,
          ingredients,
          category: data.course,
          cuisine: data.state,
          tags: `${data.diet}, ${data.flavor_profile}, ${data.region}`,
          instructions: null,
          prepTime: data.prep_time,
          cookTime: data.cook_time
        }
      }
    });
  };

  const totalTime = Number(data.prep_time || 0) + Number(data.cook_time || 0);

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl p-6 md:p-8">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

          {/* IMAGE */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="bg-gray-100 rounded-2xl p-3 shadow-md">
              <img
                src={data.img_url}
                alt={data.name}
                className="w-full h-56 object-cover rounded-xl"
              />
              <p className="mt-2 text-center text-sm text-gray-500">
                Indian Dataset Recipe
              </p>
            </div>
          </div>

          {/* TITLE + INFORMATION */}
          <div className="md:col-span-8 lg:col-span-9">
            <div className="bg-orange-50 rounded-2xl p-5 h-full flex flex-col">

              {/* TITLE + ACTIONS */}
              <div className="flex items-start justify-between gap-3">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {data.name}
                </h1>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={toggleFavourite}
                    aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
                    className={`w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm hover:scale-110 transition ${isFav ? "text-red-500" : "text-gray-600"}`}
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
                {data.course && (
                  <span className="px-3 py-1.5 rounded-full bg-white shadow-sm text-sm text-gray-700">
                    🍽 {data.course}
                  </span>
                )}

                {data.state && (
                  <span className="px-3 py-1.5 rounded-full bg-white shadow-sm text-sm text-gray-700">
                    📍 {data.state}
                  </span>
                )}

                {data.region && (
                  <span className="px-3 py-1.5 rounded-full bg-white shadow-sm text-sm text-gray-700">
                    🌍 {data.region}
                  </span>
                )}

                {data.diet && (
                  <span className="px-3 py-1.5 rounded-full bg-white shadow-sm text-sm text-gray-700">
                    🌱 {data.diet}
                  </span>
                )}

                {data.flavor_profile && (
                  <span className="px-3 py-1.5 rounded-full bg-white shadow-sm text-sm text-gray-700">
                    🍭 {data.flavor_profile}
                  </span>
                )}
              </div>

              {/* RECIPE STATISTICS */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">

                <div className="flex items-center gap-2 bg-white rounded-xl p-3 shadow-sm">
                  <Clock size={21} className="text-orange-500 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Total Time</p>
                    <p className="font-bold text-gray-800 text-sm">{totalTime} min</p>
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

          {/* COOKING TIME DETAILS */}
          <div className="md:col-span-6">
            <div className="bg-blue-50 rounded-2xl p-5 h-full">
              <h2 className="text-xl font-semibold mb-3">Preparation Time</h2>
              <p className="text-gray-700 font-medium">{data.prep_time || "Not available"} {data.prep_time ? "minutes" : ""}</p>
            </div>
          </div>

          <div className="md:col-span-6">
            <div className="bg-green-50 rounded-2xl p-5 h-full">
              <h2 className="text-xl font-semibold mb-3">Cooking Time</h2>
              <p className="text-gray-700 font-medium">{data.cook_time || "Not available"} {data.cook_time ? "minutes" : ""}</p>
            </div>
          </div>

          {/* INSTRUCTIONS */}
          <div className="md:col-span-12">
            <div className="bg-white border rounded-2xl p-5 shadow">
              <h2 className="text-xl font-semibold mb-2">Instructions</h2>
              <p className="leading-relaxed text-gray-600">
                Cooking instructions are not available in this dataset. Use the Ask AI button above to get a cooking method based on the ingredients.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}