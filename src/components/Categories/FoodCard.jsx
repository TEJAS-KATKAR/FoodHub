import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ChefHat, ArrowUpRight, Utensils } from "lucide-react";
import { getMealDetails } from "../../api/mealdb";

const FAV_KEY = "foodhub_favourites";
const ingredientCache = new Map();
const pendingRequests = new Map();

const getRecipeKey = (item) => `${item.source || "unknown"}-${item.id}`;

const countIngredients = (meal) => {
  if (!meal) return 0;

  if (Array.isArray(meal.ingredients)) {
    return meal.ingredients.filter((ingredient) =>
      typeof ingredient === "string"
        ? ingredient.trim()
        : ingredient?.name?.trim() || ingredient?.ingredient?.trim()
    ).length;
  }

  let count = 0;

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]?.trim()) count++;
  }

  return count;
};

const getBaseFavouriteCount = (item) => {
  const key = getRecipeKey(item);
  let hash = 0;

  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) | 0;
  }

  return 45 + (Math.abs(hash) % 55);
};

export default function FoodCard({ item }) {
  const navigate = useNavigate();
  const cardRef = useRef(null);

  const [isFav, setIsFav] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const [simulatedCount, setSimulatedCount] = useState(() =>
    getBaseFavouriteCount(item)
  );

  const [ingredientCount, setIngredientCount] = useState(() => {
    const meal = item.raw || item;
    const count = countIngredients(meal);
    return count || null;
  });

  const title = item.title || item.strMeal || "Untitled Recipe";
  const image = item.source === "mealdb"
  ? `${item.image || item.strMealThumb}/medium`
  : item.image || item.strMealThumb;
  const category = item.category || item.strCategory || item.raw?.strCategory;

  const favouriteCount = simulatedCount + (isFav ? 1 : 0);
  const [displayCount, setDisplayCount] = useState(favouriteCount);
const [countDirection, setCountDirection] = useState("up");
const [countKey, setCountKey] = useState(0);
const [previousCount, setPreviousCount] = useState(null);

  const handleClick = () => {
    navigate(item.source === "mealdb" ? `/recipe/${item.id}` : `/dataset/${item.id}`);
  };

  // Favourite state
  useEffect(() => {
    const checkFavourite = () => {
      try {
        const favs = JSON.parse(localStorage.getItem(FAV_KEY)) || [];
        setIsFav(favs.some((f) => getRecipeKey(f) === getRecipeKey(item)));
      } catch {
        setIsFav(false);
      }
    };

    checkFavourite();
    window.addEventListener("foodhub-favourites-updated", checkFavourite);

    return () => window.removeEventListener("foodhub-favourites-updated", checkFavourite);
  }, [item.id, item.source]);
  useEffect(() => {
    if (favouriteCount === displayCount) return;
  
    setCountDirection(favouriteCount > displayCount ? "up" : "down");
    setPreviousCount(displayCount);
    setDisplayCount(favouriteCount);
    setCountKey((prev) => prev + 1);
  }, [favouriteCount]);
  
  // Automatic simulated favourite activity
  useEffect(() => {
    let timeout;

    const updateCount = () => {
      // Random chance that this card stays unchanged
      if (Math.random() > 0.35) {
        const change = Math.floor(Math.random() * 3) + 1;
        const direction = Math.random() > 0.3 ? 1 : -1;

        setSimulatedCount((prev) => Math.max(0, prev + change * direction));
      }

      // Different random interval for every update
      const nextInterval = Math.floor(Math.random() * 7000) + 5000;
      timeout = setTimeout(updateCount, nextInterval);
    };

    timeout = setTimeout(updateCount, Math.floor(Math.random() * 8000) + 3000);

    return () => clearTimeout(timeout);
  }, [item.id, item.source]);

  // Load ingredient count when the card approaches the viewport
  useEffect(() => {
    if (ingredientCount !== null || item.source !== "mealdb") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        observer.disconnect();

        const key = String(item.id);

        if (ingredientCache.has(key)) {
          setIngredientCount(ingredientCache.get(key));
          return;
        }

        if (!pendingRequests.has(key)) {
          pendingRequests.set(
            key,
            getMealDetails(item.id)
              .then((meal) => {
                const count = countIngredients(meal);
                ingredientCache.set(key, count);
                return count;
              })
              .catch(() => null)
              .finally(() => pendingRequests.delete(key))
          );
        }

        pendingRequests.get(key).then((count) => {
          if (count !== null) setIngredientCount(count);
        });
      },
      { rootMargin: "200px" }
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, [item.id, item.source, ingredientCount]);

  // Toggle favourite
  const toggleFavourite = (e) => {
    e.stopPropagation();

    let favs = [];

    try {
      favs = JSON.parse(localStorage.getItem(FAV_KEY)) || [];
    } catch {}

    const exists = favs.some((f) => getRecipeKey(f) === getRecipeKey(item));

    const updated = exists
      ? favs.filter((f) => getRecipeKey(f) !== getRecipeKey(item))
      : [...favs, item];

    localStorage.setItem(FAV_KEY, JSON.stringify(updated));
    setIsFav(!exists);
    window.dispatchEvent(new Event("foodhub-favourites-updated"));
  };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      className="group w-[210px] sm:w-[230px] shrink-0 overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-[175px] overflow-hidden bg-gray-100">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}

        {image && !imageError ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400">
            <ChefHat size={32} />
          </div>
        )}

        <button
          onClick={toggleFavourite}
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur shadow-sm hover:scale-110 transition z-10"
          aria-label="Toggle favourite"
        >
          <Heart size={17} className={isFav ? "fill-red-500 text-red-500" : "text-gray-600"} />
        </button>
      </div>

      {/* Details */}
      <div className="px-3.5 pt-2.5 pb-3">
        {/* Name + Category */}
        <div className="flex items-center gap-2 min-h-[30px]">
          <h3 className="min-w-0 flex-1 font-bold text-gray-800 text-[15px] leading-snug line-clamp-2 group-hover:text-orange-600 transition-colors">
            {title}
          </h3>

          {category && (
            <span className="shrink-0 px-2 py-1 rounded-md bg-orange-50 text-orange-700 text-[10px] font-bold">
              {category}
            </span>
          )}
        </div>

        
      {/* Favourite + Ingredients */}
      <div className="flex items-center justify-between gap-2 mt-2.5">
        <button
          type="button"
          onClick={toggleFavourite}
          aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
          className="favourite-badge flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Heart size={13} className="fill-rose-500" />

          <span className="relative h-[20px] min-w-[24px] overflow-hidden text-xs font-bold">
            {previousCount !== null && (
              <span className={`count-old count-old-${countDirection}`}>
                {previousCount}
              </span>
            )}

            <span key={countKey} className={`count-new count-new-${countDirection}`}>
              {displayCount}
            </span>
          </span>
        </button>

        {ingredientCount !== null && ingredientCount > 0 && (
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-orange-50 text-orange-700">
            <Utensils size={13} />
            <span className="text-xs font-semibold">{ingredientCount} Ingredients</span>
          </div>
        )}
      </div>
      

        {/* Footer */}
        <div className="flex items-center justify-between mt-2.5">
          <span className="text-xs font-medium text-gray-400">
            Explore Recipe
          </span>

          <div className="flex items-center gap-1 text-orange-600 text-xs font-semibold">
            View Recipe
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}