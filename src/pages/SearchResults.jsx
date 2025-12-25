// src/pages/SearchResults.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchMealsByName } from "../api/mealdb";
import { searchDataset } from "../api/dataset";
import FoodCard from "../components/Categories/FoodCard";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// Convert MealDB result → FoodCard item
function mapMealDBToCard(meal) {
  return {
    id: meal.idMeal,
    title: meal.strMeal,
    image: meal.strMealThumb,
    source: "mealdb",
    raw: meal
  };
}

export default function SearchResults() {
  const q = useQuery().get("q") || "";
  const [results, setResults] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setResults(null);

    if (!q) {
      setResults([]);
      return;
    }

    async function runSearch() {
      try {
        // 1. Search MealDB
        const mealdbResults = await searchMealsByName(q);
        const mealdbCards = (mealdbResults || []).map(mapMealDBToCard);

        // 2. Search Dataset
        const datasetCards = searchDataset(q);

        // 3. Merge results
        const combined = [...mealdbCards, ...datasetCards];

        if (!cancelled) setResults(combined);
      } catch (err) {
        if (!cancelled) setResults([]);
      }
    }

    runSearch();

    return () => {
      cancelled = true;
    };
  }, [q]);

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">
        Search results for “{q}”
      </h2>

      {!q && <div>Type something in the search bar.</div>}
      {results === null && <div>Searching...</div>}
      {results && results.length === 0 && <div>No results found.</div>}

      {results && results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map(item => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
