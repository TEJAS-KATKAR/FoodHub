import { getMealsByCategory } from "../api/mealdb";
import { getAllDatasetCards } from "../api/dataset";

function mapMealDBToCard(meal) {
  return {
    id: meal.idMeal,
    title: meal.strMeal,
    image: meal.strMealThumb,
    source: "mealdb",
    raw: meal
  };
}

export async function getCombinedCategory(category) {
  const mealdbMeals = await getMealsByCategory(category);
  const mealdbCards = mealdbMeals.map(mapMealDBToCard);

  const datasetCards = getAllDatasetCards().filter(item => {
    if (!item.raw?.course) return false;
    return item.raw.course.toLowerCase().includes(category.toLowerCase());
  });

  return [...mealdbCards, ...datasetCards];
}