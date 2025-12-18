// src/pages/DatasetDetails.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { getDatasetById } from "../api/dataset";

export default function DatasetDetails() {
  const { id } = useParams();
  const data = getDatasetById(id);

  if (!data) {
    return <div className="p-6 text-red-500">Dataset item not found.</div>;
  }

  return (
    <div className="p-6 flex justify-center">
      {/* MAIN CARD */}
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl p-6 md:p-8">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

          {/* IMAGE (ID CARD STYLE) */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="bg-gray-100 rounded-2xl p-3 shadow-md">
              <img
                src={data.img_url}
                alt={data.name}
                className="w-full h-56 object-cover rounded-xl"
              />
              <p className="mt-2 text-center text-sm text-gray-500">
                Dataset Food
              </p>
            </div>
          </div>

          {/* TITLE + SHORT INFO */}
          <div className="md:col-span-8 lg:col-span-9">
            <div className="bg-orange-50 rounded-2xl p-5 h-full">
              <h1 className="text-3xl font-bold mb-2">{data.name}</h1>

              <div className="flex flex-wrap gap-3 text-sm">
                <span className="px-3 py-1 rounded-full bg-white shadow">
                  🌱 {data.diet}
                </span>
                <span className="px-3 py-1 rounded-full bg-white shadow">
                  🍭 {data.flavor_profile}
                </span>
                <span className="px-3 py-1 rounded-full bg-white shadow">
                  🍽 {data.course}
                </span>
              </div>
            </div>
          </div>

          {/* PREP TIME */}
          <div className="md:col-span-4">
            <div className="bg-blue-50 rounded-2xl p-4 h-full">
              <p className="text-sm text-gray-500">Prep Time</p>
              <p className="text-2xl font-bold">{data.prep_time} min</p>
            </div>
          </div>

          {/* COOK TIME */}
          <div className="md:col-span-4">
            <div className="bg-green-50 rounded-2xl p-4 h-full">
              <p className="text-sm text-gray-500">Cook Time</p>
              <p className="text-2xl font-bold">{data.cook_time} min</p>
            </div>
          </div>

          {/* REGION */}
          <div className="md:col-span-4">
            <div className="bg-purple-50 rounded-2xl p-4 h-full">
              <p className="text-sm text-gray-500">Region</p>
              <p className="text-xl font-semibold">{data.region}</p>
            </div>
          </div>

          {/* INGREDIENTS — LARGE RECTANGLE */}
          <div className="md:col-span-12">
            <div className="bg-gray-100 rounded-2xl p-5">
              <h2 className="text-xl font-semibold mb-2">
                Ingredients
              </h2>
              <p className="leading-relaxed text-gray-700">
                {data.ingredients}
              </p>
            </div>
          </div>

          {/* STATE */}
          <div className="md:col-span-6">
            <div className="bg-yellow-50 rounded-2xl p-4 h-full">
              <p className="text-sm text-gray-500">State</p>
              <p className="text-xl font-semibold">{data.state}</p>
            </div>
          </div>

          {/* COURSE (REPEATED DIFFERENT STYLE) */}
          <div className="md:col-span-6">
            <div className="bg-red-50 rounded-2xl p-4 h-full">
              <p className="text-sm text-gray-500">Course Type</p>
              <p className="text-xl font-semibold capitalize">
                {data.course}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
