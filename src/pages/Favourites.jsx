import React, { useEffect, useState } from "react";
import FoodCard from "../components/Categories/FoodCard";

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("foodhub_favourites")) || [];
    setFavourites(favs);
  }, []);

  if (favourites.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-500">
        ❤️ No favourites yet. Start adding some food!
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Favourites ❤️</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {favourites.map((item) => (
          <FoodCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
