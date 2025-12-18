// src/api/dataset.js
import dataset from "../data/indianfood-dataset.json";

/**
 * Convert raw dataset item → FoodCard display format
 */
function mapToCard(item, index) {
  return {
    id: `data_${index}`,              // unique id for routing
    title: item.name,
    image: item.img_url,
    source: "dataset",
    // keep original for later (detail page use)
    raw: item
  };
}

/**
 * Get ALL dataset foods as card items
 */
export function getAllDatasetCards() {
  return dataset.map((item, index) => mapToCard(item, index));
}

/**
 * Filter dataset by course (dessert, main course, etc.)
 */
export function getDatasetByCourse(course) {
  return dataset
    .filter(item => item.course?.toLowerCase() === course.toLowerCase())
    .map((item, index) => mapToCard(item, index));
}

/**
 * Search dataset by name
 */
export function searchDataset(query) {
  if (!query) return [];

  return dataset
    .filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    )
    .map((item, index) => mapToCard(item, index));
}

/**
 * Get single dataset item by id
 * (for DatasetDetails page later)
 */
export function getDatasetById(id) {
  const index = Number(id.replace("data_", ""));
  return dataset[index] || null;
}
