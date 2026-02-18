import dataset from "../data/indianfood-dataset.json";

/**
 * Convert raw dataset item → FoodCard display format
 */
function mapToCard(item) {
  return {
    id: `data_${item.__index}`,   // use stored real index
    title: item.name,
    image: item.img_url,
    source: "dataset",
    raw: item
  };
}

/**
 * Attach permanent index to dataset once
 */
const datasetWithIndex = dataset.map((item, index) => ({
  ...item,
  __index: index
}));

/**
 * Get ALL dataset foods
 */
export function getAllDatasetCards() {
  return datasetWithIndex.map(item => mapToCard(item));
}

/**
 * Filter by course
 */
export function getDatasetByCourse(course) {
  return datasetWithIndex
    .filter(item =>
      item.course?.toLowerCase() === course.toLowerCase()
    )
    .map(item => mapToCard(item));
}

/**
 * Search dataset by name
 */
export function searchDataset(query) {
  if (!query) return [];

  return datasetWithIndex
    .filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    )
    .map(item => mapToCard(item));
}

/**
 * Get single dataset item by id
 */
export function getDatasetById(id) {
  const index = Number(id.replace("data_", ""));
  return dataset[index] || null;
}
