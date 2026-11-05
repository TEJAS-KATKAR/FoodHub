import React, { useEffect, useState } from "react";
import { getCategories } from "../api/mealdb";
import { getCombinedCategory } from "../services/foodAggregator";
import CategoryRow from "../components/Categories/CategoryRow";

// Persistent cache outside the component
let categoriesCache = null;
let categoriesPromise = null;
const categoryCache = {};
const categoryPromises = {};

const CATEGORY_ORDER = [
  "Breakfast",
  "Dessert",
  "Pasta",
  "Vegan",
  "Vegetarian",
  "Miscellaneous",
  "Chicken",
  "Seafood",
  "Side",
  "Starter",
  "Lamb",
  "Pork",
  "Beef",
];

function sortCategories(cats) {
  return [...cats].sort((a, b) => {
    const indexA = CATEGORY_ORDER.indexOf(a);
    const indexB = CATEGORY_ORDER.indexOf(b);

    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });
}

// Cache category list
async function fetchCategories() {
  if (categoriesCache) return categoriesCache;
  if (categoriesPromise) return categoriesPromise;

  categoriesPromise = getCategories()
    .then((cats) => {
      categoriesCache = sortCategories(cats || []);
      return categoriesCache;
    })
    .catch((error) => {
      categoriesPromise = null;
      throw error;
    });

  return categoriesPromise;
}

// Cache individual category data
async function fetchCategory(cat) {
  if (categoryCache[cat]) return categoryCache[cat];
  if (categoryPromises[cat]) return categoryPromises[cat];

  categoryPromises[cat] = getCombinedCategory(cat)
    .then((items) => {
      categoryCache[cat] = items || [];
      delete categoryPromises[cat];
      return categoryCache[cat];
    })
    .catch((error) => {
      delete categoryPromises[cat];
      throw error;
    });

  return categoryPromises[cat];
}

// Loading placeholder
function CategorySkeleton({ title = "Loading..." }) {
  return (
    <div className="mb-5 animate-pulse">
      <div className="h-6 w-36 bg-gray-200 rounded-md ml-2 mb-3" />

      <div className="grid grid-rows-2 grid-flow-col auto-cols-[210px] sm:auto-cols-[230px] gap-4 overflow-hidden">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl bg-white shadow-sm overflow-hidden"
          >
            <div className="h-36 bg-gray-200" />
            <div className="p-3 space-y-3">
              <div className="h-4 w-4/5 bg-gray-200 rounded" />
              <div className="h-3 w-2/5 bg-gray-200 rounded" />
              <div className="h-8 w-full bg-gray-200 rounded-lg mt-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Filters() {
  const [categories, setCategories] = useState(categoriesCache || []);
  const [rows, setRows] = useState({ ...categoryCache });
  const [visibleCount, setVisibleCount] = useState(5);
  const [activeFilter, setActiveFilter] = useState(null);
  const [loadingCategories, setLoadingCategories] = useState(new Set());
  const [initialLoading, setInitialLoading] = useState(!categoriesCache);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadInitial() {
      try {
        const cats = await fetchCategories();

        if (!mounted) return;

        setCategories(cats);
        setInitialLoading(false);

        const firstFive = cats.slice(0, 5);
        const missing = firstFive.filter((cat) => !categoryCache[cat]);

        if (missing.length > 0) {
          setLoadingCategories(new Set(missing));

          const results = await Promise.all(
            missing.map(async (cat) => ({
              cat,
              items: await fetchCategory(cat),
            }))
          );

          if (!mounted) return;

          setRows((prev) => {
            const updated = { ...prev };
            results.forEach(({ cat, items }) => {
              updated[cat] = items;
            });
            return updated;
          });

          setLoadingCategories(new Set());
        } else {
          setRows({ ...categoryCache });
        }
      } catch (err) {
        console.error("Failed to load categories:", err);
        if (mounted) {
          setError(true);
          setInitialLoading(false);
          setLoadingCategories(new Set());
        }
      }
    }

    loadInitial();

    return () => {
      mounted = false;
    };
  }, []);

  async function loadMore() {
    const nextCats = categories.slice(0, visibleCount + 5);
    const missing = nextCats.filter((cat) => !categoryCache[cat]);

    setLoadingCategories((prev) => new Set([...prev, ...missing]));

    try {
      const results = await Promise.all(
        missing.map(async (cat) => ({
          cat,
          items: await fetchCategory(cat),
        }))
      );

      setRows((prev) => {
        const updated = { ...prev };
        results.forEach(({ cat, items }) => {
          updated[cat] = items;
        });
        return updated;
      });

      setVisibleCount((c) => Math.min(c + 5, categories.length));
    } catch (err) {
      console.error("Failed to load more categories:", err);
    } finally {
      setLoadingCategories((prev) => {
        const updated = new Set(prev);
        missing.forEach((cat) => updated.delete(cat));
        return updated;
      });
    }
  }

  async function handleFilterClick(cat) {
    setActiveFilter(cat);

    if (categoryCache[cat]) {
      setRows((prev) => ({ ...prev, [cat]: categoryCache[cat] }));
      return;
    }

    setLoadingCategories((prev) => new Set(prev).add(cat));

    try {
      const items = await fetchCategory(cat);
      setRows((prev) => ({ ...prev, [cat]: items }));
    } catch (err) {
      console.error(`Failed to load ${cat}:`, err);
    } finally {
      setLoadingCategories((prev) => {
        const updated = new Set(prev);
        updated.delete(cat);
        return updated;
      });
    }
  }

  const displayedCategories = activeFilter
    ? [activeFilter]
    : categories.slice(0, visibleCount);

  return (
    <div className="p-0 lg:p-4">
      <h1 className="text-2xl font-bold mb-1 lg:mb-3">Filter Foods</h1>
      <hr className="border-t-2 border-gray-300 mb-1" />

      {/* FILTER BUTTONS */}
      <div className="my-3 block w-full min-w-0 max-w-full overflow-x-auto overflow-y-hidden overscroll-x-contain touch-pan-x py-2 scrollbar-hide">
        <div className="flex w-max min-w-full flex-nowrap items-center gap-2.5 whitespace-nowrap">
          <button
            onClick={() => setActiveFilter(null)}
            className={`shrink-0 px-4 py-2 rounded-full font-medium text-sm sm:text-base whitespace-nowrap border transition-all duration-200 ${
              activeFilter === null
                ? "bg-orange-500 text-white shadow-lg scale-105"
                : "bg-white text-gray-700 hover:bg-orange-100"
            }`}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterClick(cat)}
              className={`shrink-0 px-4 py-2 rounded-full font-medium text-sm sm:text-base whitespace-nowrap border transition-all duration-200 ${
                activeFilter === cat
                  ? "bg-orange-500 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-orange-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        </div>


          {/* CATEGORY ROWS */}
          {initialLoading ? (
            <>
              {Array.from({ length: 5 }).map((_, index) => (
                <CategorySkeleton key={index} />
              ))}
            </>
          ) : error ? (
            <div className="py-12 text-center text-gray-500">
              Unable to load categories. Please refresh the page.
            </div>
          ) : (
            <>
              {displayedCategories.map((cat) =>
                loadingCategories.has(cat) ? (
                  <CategorySkeleton key={cat} />
                ) : (
                  <CategoryRow key={cat} title={cat} items={rows[cat]} />
                )
              )}
            </>
          )}

          {/* LOAD MORE */}
          {!initialLoading &&
            !activeFilter &&
            visibleCount < categories.length && (
              <div className="flex justify-center">
                <button
                  onClick={loadMore}
                  className="mt-8 px-10 py-3 bg-orange-500 text-white rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95"
                >
                  Load more categories
                </button>
              </div>
            )}
    </div>
  );
}