// src/api/mealdb.js
const BASE = "https://www.themealdb.com/api/json/v1/1";

/** Get all categories */
export async function getCategories() {
  const res = await fetch(`${BASE}/list.php?c=list`);
  const data = await res.json();
  return data.meals.map(m => m.strCategory);
}

/** Get meals by category */
export async function getMealsByCategory(category) {
  const res = await fetch(`${BASE}/filter.php?c=${category}`);
  const data = await res.json();
  return data.meals; // [{ idMeal, strMeal, strMealThumb }]
}

/** Search meals */
export async function searchMealsByName(query) {
  const res = await fetch(`${BASE}/search.php?s=${query}`);
  const data = await res.json();
  return data.meals || [];
}

/** Get full meal details */
export async function getMealDetails(id) {
  const res = await fetch(`${BASE}/lookup.php?i=${id}`);
  const data = await res.json();
  return data.meals ? data.meals[0] : null;
}
