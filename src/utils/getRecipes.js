import data from "../data/recipes.json";

export const getAllRecipes = () => {
  return data;
};

// get unique categories (we’ll generate categories from Description or Ingredients)
export const getCategories = () => {
  const categories = new Set();

  data.forEach((item) => {
    // EXAMPLE: generate categories from keywords
    if (item.Ingredients.toLowerCase().includes("chicken")) categories.add("Chicken");
    if (item.Ingredients.toLowerCase().includes("pasta")) categories.add("Pasta");
    if (item.Ingredients.toLowerCase().includes("rice")) categories.add("Rice");
    if (item.Ingredients.toLowerCase().includes("bacon")) categories.add("Bacon");
    if (item.Ingredients.toLowerCase().includes("potato")) categories.add("Potato");
  });

  return Array.from(categories);
};

// get filtered recipes
export const getRecipesByCategory = (cat) => {
  return data.filter((item) =>
    item.Ingredients.toLowerCase().includes(cat.toLowerCase())
  );
};
