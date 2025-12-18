// src/services/foodAggregator.js

import { getMealsByCategory } from "../api/mealdb";
import { getAllDatasetCards } from "../api/dataset";

/**
 * Convert MealDB meal → FoodCard format
 */
function mapMealDBToCard(meal) {
  return {
    id: meal.idMeal,
    title: meal.strMeal,
    image: meal.strMealThumb,
    source: "mealdb",
    raw: meal
  };
}

/**
 * Get combined cards for a category
 * MealDB + Dataset mixed
 */
export async function getCombinedCategory(category) {
  // 1. MealDB meals
  const mealdbMeals = await getMealsByCategory(category);
  const mealdbCards = mealdbMeals.map(mapMealDBToCard);

  // 2. Dataset meals (basic injection logic)
  const datasetCards = getAllDatasetCards().filter(item => {
    if (!item.raw?.course) return false;
    return item.raw.course.toLowerCase().includes(category.toLowerCase());
  });

  // 3. Merge (MealDB first, Dataset after)
  return [...mealdbCards, ...datasetCards];
}
