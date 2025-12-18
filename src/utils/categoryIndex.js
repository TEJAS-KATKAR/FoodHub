// src/utils/categoryIndex.js
import raw from "../data/recipes.json";

/**
 * Simple keyword-based category mapping.
 * Add or tune keywords to expand categories.
 */

const KEYWORD_CATEGORIES = {
  Pastries: ["pastry", "croissant", "danish", "donut", "muffin", "scone", "tart", "biscuit", "bakery", "bread", "bun", "puff", "strudel", "cookie", "cake"],
  Cakes: ["cake", "brownie", "cupcake", "cheesecake", "torte"],
  Beverages: ["shake", "smoothie", "juice", "coffee", "tea", "shake", "cocktail", "margarita", "lemonade", "sangria", "latte"],
  Rice: ["rice", "biryani", "fried rice", "pilaf", "risotto", "paella"],
  Pasta: ["pasta", "spaghetti", "lasagna", "penne", "macaroni", "ravioli"],
  Chicken: ["chicken", "souvlaki", "tikka", "butter chicken", "fried chicken", "chicken breast", "chicken thighs"],
  Beef: ["beef", "steak", "ground beef", "meatloaf", "roast beef", "burger"],
  Seafood: ["shrimp", "prawns", "salmon", "tuna", "crab", "fish", "scampi", "oyster", "clams", "seafood"],
  Vegetarian: ["vegetarian", "vegetable", "veggie", "tofu", "paneer", "quinoa", "lentil"],
  Vegan: ["vegan"],
  Desserts: ["dessert", "ice cream", "pudding", "custard", "fudge", "sweet"],
  Breakfast: ["breakfast", "pancake", "waffle", "omelet", "flapjack", "french toast", "granola"],
  Snacks: ["snack", "samosa", "chips", "fries", "bites", "appetizer", "fingerfood", "finger food"],
  Soups: ["soup", "broth", "chowder", "gumbo", "bisque"],
  Salads: ["salad"],
  Breads: ["bread", "roll", "bagel", "naan"],
  International: ["italian", "indian", "mexican", "thai", "chinese", "japanese", "french", "greek", "spanish", "korean", "mediterranean"]
};

// helper lower-case text
function textOf(r) {
  return ((r.Name || "") + " " + (r.Ingredients || "") + " " + (r.Description || "")).toLowerCase();
}

// build index (id + normalized fields)
export function buildIndex() {
  // If cached in localStorage, use it
  try {
    const cached = localStorage.getItem("recipes_index_v1");
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (e) {}

  const recipes = raw.map((r, i) => {
    return {
      id: i, // stable id based on file order
      name: r.Name || "",
      rating: r.Rating || null,
      description: r.Description || "",
      prepTime: r["Prep Time"] || "",
      cookTime: r["Cook Time"] || "",
      totalTime: r["Total Time"] || "",
      servings: r.Servings || null,
      ingredients: r.Ingredients || "",
      image: r["Image URL"] === "None" ? null : r["Image URL"],
      raw: r
    };
  });

  // initialize buckets
  const buckets = {};
  Object.keys(KEYWORD_CATEGORIES).forEach((k) => (buckets[k] = []));

  // also prepare a 'Misc' bucket and 'All'
  buckets["All"] = [];
  buckets["Misc"] = [];

  // fill buckets
  for (const recipe of recipes) {
    const txt = textOf(recipe);
    let matched = false;

    // check specific categories first
    for (const [cat, kws] of Object.entries(KEYWORD_CATEGORIES)) {
      for (const kw of kws) {
        if (txt.includes(kw)) {
          buckets[cat].push(recipe);
          matched = true;
          break;
        }
      }
    }

    // push into All always
    buckets["All"].push(recipe);

    if (!matched) {
      buckets["Misc"].push(recipe);
    }
  }

  // Optionally create "Top Rated" and "Quick Meals" buckets
  buckets["Top Rated"] = recipes.filter(r => Number(r.rating) >= 4.6).slice(0, 500);
  buckets["Quick (≤30m)"] = recipes.filter(r => {
    const t = r.totalTime || r.cookTime || r.prepTime;
    // naive check for "30" in string
    return /\b(30|min|minutes|m)\b/i.test(String(t)) || /\b\d+\s*mins?\b/i.test(String(t)) && /30/.test(String(t)) ? String(t).toLowerCase().includes("30") : (String(t).toLowerCase().includes("15") || String(t).toLowerCase().includes("20"));
  }).slice(0, 500);

  const index = { recipes, buckets, categories: Object.keys(buckets) };

  try {
    localStorage.setItem("recipes_index_v1", JSON.stringify(index));
  } catch (e) {}

  return index;
}
