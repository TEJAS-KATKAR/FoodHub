import React, { useEffect, useMemo, useState } from "react";
import FoodCard from "../components/Categories/FoodCard";
import {
  Heart, Bookmark, Clock, Plus, Coffee, Sun, Cake, Utensils,
  Salad, Soup, Leaf, Folder, MoreHorizontal, Pencil, Trash2,
  Search, ArrowLeft, X, Check, BookOpen, Trash
} from "lucide-react";

const FAV_KEY = "foodhub_favourites";
const COLLECTION_KEY = "foodhub_favourite_collections";
const CATEGORY_KEY = "foodhub_recipe_categories";

const defaultCollections = [
  { id: "want-to-try", name: "Want to Try", description: "Recipes I want to cook", recipeKeys: [], default: true },
];

const categories = [
  { name: "All Recipes", icon: BookOpen },
  { name: "Breakfast", icon: Coffee },
  { name: "Lunch", icon: Sun },
  { name: "Desserts", icon: Cake },
  { name: "Dinner", icon: Utensils },
  { name: "Sides", icon: Salad },
  { name: "Snacks", icon: Bookmark },
  { name: "Soups", icon: Soup },
  { name: "Vegan", icon: Leaf },
];

const getRecipeKey = (item) => `${item.source || "unknown"}-${item.id}`;

const readStorage = (key, fallback) => {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
};

export default function Favourites() {
  const [favourites, setFavourites] = useState(() => readStorage(FAV_KEY, []));

  const [collections, setCollections] = useState(() => {
    const saved = readStorage(COLLECTION_KEY, []);
    const merged = [...saved];

    defaultCollections.forEach((defaultCollection) => {
      if (!merged.some((c) => c.id === defaultCollection.id)) {
        merged.unshift(defaultCollection);
      }
    });

    return merged;
  });

  const [recipeCategories, setRecipeCategories] = useState(() => readStorage(CATEGORY_KEY, {}));

  const [activeCollection, setActiveCollection] = useState("all");
  const [activeCategory, setActiveCategory] = useState("All Recipes");
  const [search, setSearch] = useState("");

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");
  const [editingCollection, setEditingCollection] = useState(null);
  const [menuCollection, setMenuCollection] = useState(null);

  const [showCategoryMenu, setShowCategoryMenu] = useState(null);

  // SAVE DATA
  useEffect(() => {
    localStorage.setItem(FAV_KEY, JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    localStorage.setItem(COLLECTION_KEY, JSON.stringify(collections));
  }, [collections]);

  useEffect(() => {
    localStorage.setItem(CATEGORY_KEY, JSON.stringify(recipeCategories));
  }, [recipeCategories]);

  // SYNC FAVOURITES WHEN FOOD CARD CHANGES THEM
  useEffect(() => {
    const syncFavourites = () => {
      setFavourites(readStorage(FAV_KEY, []));
    };

    window.addEventListener("foodhub-favourites-updated", syncFavourites);

    return () => {
      window.removeEventListener("foodhub-favourites-updated", syncFavourites);
    };
  }, []);

  const recipeKeys = useMemo(
    () => favourites.map(getRecipeKey),
    [favourites]
  );

  const activeCollectionData = collections.find(
    (collection) => collection.id === activeCollection
  );

  // FILTER COLLECTION RECIPES
  const collectionRecipes = useMemo(() => {
    if (activeCollection === "all") return favourites;

    if (activeCollection === "recent") {
      return [...favourites].reverse();
    }

    if (!activeCollectionData) return [];

    return favourites.filter((item) =>
      activeCollectionData.recipeKeys.includes(getRecipeKey(item))
    );
  }, [favourites, activeCollection, activeCollectionData]);

  // FILTER BY CATEGORY AND SEARCH
  const filteredRecipes = useMemo(() => {
    let result = collectionRecipes;

    if (activeCategory !== "All Recipes") {
      result = result.filter((item) => {
        const key = getRecipeKey(item);
        const assignedCategory = recipeCategories[key];

        const itemCategory = (
          item.category ||
          item.strCategory ||
          item.type ||
          item.mealType ||
          ""
        ).toLowerCase();

        return (
          assignedCategory === activeCategory ||
          itemCategory.includes(activeCategory.toLowerCase())
        );
      });
    }

    if (search.trim()) {
      result = result.filter((item) =>
        (item.title || item.strMeal || "").toLowerCase().includes(search.toLowerCase())
      );
    }

    return result;
  }, [collectionRecipes, activeCategory, search, recipeCategories]);

  // CREATE COLLECTION
  const createCollection = () => {
    if (!collectionName.trim()) return;

    const newCollection = {
      id: `collection-${Date.now()}`,
      name: collectionName.trim(),
      description: collectionDescription.trim(),
      recipeKeys: [],
      default: false,
    };

    setCollections((prev) => [...prev, newCollection]);
    setCollectionName("");
    setCollectionDescription("");
    setShowCreateModal(false);
  };

  // UPDATE COLLECTION
  const updateCollection = () => {
    if (!collectionName.trim() || !editingCollection) return;

    setCollections((prev) =>
      prev.map((collection) =>
        collection.id === editingCollection
          ? {
              ...collection,
              name: collectionName.trim(),
              description: collectionDescription.trim(),
            }
          : collection
      )
    );

    setEditingCollection(null);
    setCollectionName("");
    setCollectionDescription("");
    setShowCreateModal(false);
  };

  const openEditModal = (collection) => {
    setEditingCollection(collection.id);
    setCollectionName(collection.name);
    setCollectionDescription(collection.description || "");
    setShowCreateModal(true);
    setMenuCollection(null);
  };

  // DELETE COLLECTION
  const deleteCollection = (id) => {
    if (id === "want-to-try") {
      alert("The default Want to Try collection cannot be deleted.");
      return;
    }

    if (!window.confirm("Delete this collection? Your favourite recipes will not be removed.")) return;

    setCollections((prev) => prev.filter((collection) => collection.id !== id));

    if (activeCollection === id) {
      setActiveCollection("all");
    }

    setMenuCollection(null);
  };

  // ADD RECIPE TO COLLECTION
  const addToCollection = (collectionId, item) => {
    const key = getRecipeKey(item);

    setCollections((prev) =>
      prev.map((collection) =>
        collection.id === collectionId
          ? {
              ...collection,
              recipeKeys: collection.recipeKeys.includes(key)
                ? collection.recipeKeys
                : [...collection.recipeKeys, key],
            }
          : collection
      )
    );
  };

  // REMOVE RECIPE FROM COLLECTION
  const removeFromCollection = (collectionId, item) => {
    const key = getRecipeKey(item);

    setCollections((prev) =>
      prev.map((collection) =>
        collection.id === collectionId
          ? {
              ...collection,
              recipeKeys: collection.recipeKeys.filter((recipeKey) => recipeKey !== key),
            }
          : collection
      )
    );
  };

  // ASSIGN RECIPE CATEGORY
  const assignCategory = (item, category) => {
    const key = getRecipeKey(item);

    setRecipeCategories((prev) => {
      const updated = { ...prev };

      if (!category) {
        delete updated[key];
      } else {
        updated[key] = category;
      }

      return updated;
    });

    setShowCategoryMenu(null);
  };

  // REMOVE RECIPE FROM FAVOURITES
  const removeFavourite = (item) => {
    const key = getRecipeKey(item);

    if (!window.confirm("Remove this recipe from all favourites?")) return;

    const updatedFavourites = favourites.filter(
      (recipe) => getRecipeKey(recipe) !== key
    );

    setFavourites(updatedFavourites);

    setCollections((prev) =>
      prev.map((collection) => ({
        ...collection,
        recipeKeys: collection.recipeKeys.filter((recipeKey) => recipeKey !== key),
      }))
    );

    setRecipeCategories((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });

    localStorage.setItem(FAV_KEY, JSON.stringify(updatedFavourites));

    window.dispatchEvent(new Event("foodhub-favourites-updated"));
  };

  const openCreateModal = () => {
    setEditingCollection(null);
    setCollectionName("");
    setCollectionDescription("");
    setShowCreateModal(true);
  };

  // COLLECTION CARDS
  const collectionCards = [
    {
      id: "all",
      name: "All Favourites",
      description: "Every recipe you've saved",
      count: favourites.length,
      icon: Heart,
      color: "bg-rose-50 text-rose-500",
    },
    {
      id: "want-to-try",
      name: "Want to Try",
      description: "Recipes I want to cook",
      count: collections.find((c) => c.id === "want-to-try")?.recipeKeys.filter((key) => recipeKeys.includes(key)).length || 0,
      icon: Bookmark,
      color: "bg-amber-50 text-amber-600",
    },
    {
      id: "recent",
      name: "Recently Added",
      description: "Your latest saved recipes",
      count: favourites.length,
      icon: Clock,
      color: "bg-blue-50 text-blue-500",
    },
    ...collections
      .filter((collection) => collection.id !== "want-to-try")
      .map((collection) => ({
        ...collection,
        count: collection.recipeKeys.filter((key) => recipeKeys.includes(key)).length,
        icon: Folder,
        color: "bg-orange-50 text-orange-500",
      })),
  ];

  return (
    <div className="min-h-screen bg-[#fffdfa] px-4 py-7 sm:px-6 lg:px-10">

      {/* PAGE HEADER */}
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="mb-1 text-sm font-medium text-orange-500">YOUR PERSONAL RECIPE LIBRARY</p>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Collections</h1>
          <p className="mt-1 text-sm text-gray-500">Keep your favourite recipes organized in one place.</p>
        </div>

        <button onClick={openCreateModal} className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-orange-600">
          <Plus size={19} />
          New Collection
        </button>
      </div>

      {/* CATEGORY NAVIGATION */}
      <div className="mb-9">
        <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
          {categories.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => {
                setActiveCategory(name);
                setActiveCollection("all");
              }}
              className={`flex min-w-[85px] shrink-0 flex-col items-center gap-2 rounded-xl px-3 py-3 transition ${
                activeCategory === name
                  ? "bg-orange-50 text-orange-600"
                  : "text-gray-500 hover:bg-gray-50 hover:text-orange-500"
              }`}
            >
              <Icon size={25} strokeWidth={1.7} />
              <span className="text-xs font-medium">{name}</span>
              {activeCategory === name && <span className="h-0.5 w-7 rounded-full bg-orange-500" />}
            </button>
          ))}
        </div>
      </div>

      

      {/* RECIPE SECTION */}
      <section>
        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              {activeCollection !== "all" && (
                <button onClick={() => setActiveCollection("all")} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100">
                  <ArrowLeft size={19} />
                </button>
              )}
              <h2 className="text-xl font-bold text-gray-900">
                {activeCollectionData?.name || (activeCollection === "recent" ? "Recently Added" : activeCategory !== "All Recipes" ? activeCategory : "All Favourites")}
              </h2>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {filteredRecipes.length} {filteredRecipes.length === 1 ? "recipe" : "recipes"}
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search your recipes..." className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100" />
          </div>
        </div>

        {filteredRecipes.length > 0 ? (
          <div className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-visible overscroll-x-contain touch-pan-x pb-4 sm:grid sm:grid-cols-3 sm:snap-none sm:overflow-visible sm:pb-0 lg:grid-cols-4 xl:grid-cols-5">
            {filteredRecipes.map((item) => {
              const key = getRecipeKey(item);
              const isCustomCollection = activeCollection !== "all" && activeCollection !== "recent";

              return (
                <div key={key} className="w-[78vw] max-w-[300px] shrink-0 snap-start rounded-xl sm:w-auto sm:max-w-none sm:shrink">
  <FoodCard item={item} />

  {/* RECIPE ACTIONS */}
  <div className="relative z-30 mt-2 flex flex-wrap items-center gap-1.5">

    {/* ASSIGN CATEGORY */}
    <div className="relative min-w-0">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowCategoryMenu(showCategoryMenu === key ? null : key);
        }}
        className="max-w-[110px] truncate rounded-lg bg-white px-2 py-1.5 text-xs font-semibold text-gray-600 shadow-md hover:bg-orange-50 hover:text-orange-600 sm:max-w-none"
        title="Assign category"
      >
        {recipeCategories[key] || "Category"}
      </button>

      {showCategoryMenu === key && (
        <div className="absolute bottom-full left-0 z-50 mb-2 max-h-52 w-36 overflow-y-auto rounded-xl border border-gray-100 bg-white p-1 shadow-xl">
          {categories.filter((c) => c.name !== "All Recipes").map((category) => (
            <button
              key={category.name}
              onClick={(e) => {
                e.stopPropagation();
                assignCategory(item, category.name);
              }}
              className={`block w-full rounded-lg px-3 py-2 text-left text-xs hover:bg-orange-50 hover:text-orange-600 ${recipeCategories[key] === category.name ? "bg-orange-50 text-orange-600" : "text-gray-600"}`}
            >
              {category.name}
            </button>
          ))}

          <button
            onClick={(e) => {
              e.stopPropagation();
              assignCategory(item, "");
            }}
            className="block w-full rounded-lg px-3 py-2 text-left text-xs text-red-500 hover:bg-red-50"
          >
            Clear category
          </button>
        </div>
      )}
    </div>

    {/* ADD TO COLLECTION */}
    {activeCollection === "all" && (
      <select
        value=""
        onChange={(e) => {
          if (e.target.value) addToCollection(e.target.value, item);
        }}
        onClick={(e) => e.stopPropagation()}
        className="min-w-0 max-w-[105px] flex-1 cursor-pointer rounded-lg border border-gray-200 bg-white px-1.5 py-1.5 text-xs font-medium text-gray-600 shadow-md outline-none sm:max-w-[130px] sm:px-2"
        title="Add to collection"
      >
        <option value="">+ Folder</option>
        {collections.map((collection) => (
          <option key={collection.id} value={collection.id}>
            {collection.name}
          </option>
        ))}
      </select>
    )}

    {/* REMOVE FROM COLLECTION */}
    {isCustomCollection && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          removeFromCollection(activeCollection, item);
        }}
        className="shrink-0 rounded-lg bg-white p-1.5 text-red-500 shadow-md hover:bg-red-50"
        title="Remove from this collection"
      >
        <Trash size={15} />
      </button>
    )}


    {/* REMOVE FROM FAVOURITES */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        removeFavourite(item);
      }}
      className="shrink-0 rounded-lg bg-white p-1.5 text-red-500 shadow-md hover:bg-red-50"
      title="Remove from all favourites"
    >
      <X size={15} />
    </button>
  </div>
</div>
              );
            })}
          </div>
        ) : (
          <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white px-5 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-orange-400">
              {activeCollection === "all" ? <Heart size={30} /> : <Folder size={30} />}
            </div>
            <h3 className="text-lg font-bold text-gray-800">
              {activeCollection === "all" ? "No recipes found" : "Nothing here yet"}
            </h3>
            <p className="mt-2 max-w-sm text-sm text-gray-500">
              {activeCategory !== "All Recipes"
                ? `No recipes are currently assigned to ${activeCategory}. Assign a category using the Category button on a recipe.`
                : activeCollection === "all"
                  ? "Save recipes using the heart button and they'll appear here."
                  : "Add recipes from All Favourites to this collection."}
            </p>
            {activeCollection !== "all" && (
              <button onClick={() => setActiveCollection("all")} className="mt-5 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600">
                Browse All Favourites
              </button>
            )}
          </div>
        )}
      </section>

      {/* COLLECTIONS */}
      <section className="my-15">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Your Collections</h2>
            <p className="mt-1 text-sm text-gray-500">Explore and organize your saved recipes.</p>
          </div>
          <span className="text-sm text-gray-400">{collectionCards.length} collections</span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {collectionCards.map((collection) => {
            const Icon = collection.icon;
            const isActive = activeCollection === collection.id;

            return (
              <div
                key={collection.id}
                onClick={() => {
                  setActiveCollection(collection.id);
                  setActiveCategory("All Recipes");
                  setSearch("");
                }}
                className={`group relative cursor-pointer rounded-2xl border p-5 transition duration-200 hover:-translate-y-1 hover:shadow-md ${
                  isActive
                    ? "border-orange-300 bg-orange-50/50 shadow-sm"
                    : "border-gray-100 bg-white hover:border-orange-200"
                }`}
              >
                {collection.id !== "all" && collection.id !== "recent" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuCollection(menuCollection === collection.id ? null : collection.id);
                    }}
                    className="absolute right-3 top-3 rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                  >
                    <MoreHorizontal size={19} />
                  </button>
                )}

                {menuCollection === collection.id && (
                  <div className="absolute right-3 top-12 z-30 w-36 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-xl">
                    <button onClick={(e) => { e.stopPropagation(); openEditModal(collection); }} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
                      <Pencil size={14} /> Rename
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); deleteCollection(collection.id); }} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50">
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                )}

                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${collection.color}`}>
                  <Icon size={23} strokeWidth={1.8} />
                </div>

                <h3 className="font-bold text-gray-900">{collection.name}</h3>
                <p className="mt-1 line-clamp-1 text-sm text-gray-500">{collection.description}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-400">
                    {collection.count} {collection.count === 1 ? "recipe" : "recipes"}
                  </span>
                  <span className={`text-xs font-semibold ${isActive ? "text-orange-600" : "text-gray-400 group-hover:text-orange-500"}`}>
                    {isActive ? "Selected" : "View collection →"}
                  </span>
                </div>
              </div>
            );
          })}

          <button onClick={openCreateModal} className="flex min-h-[180px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white p-5 text-gray-400 transition hover:border-orange-300 hover:bg-orange-50/30 hover:text-orange-500">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-gray-50">
              <Plus size={23} />
            </div>
            <span className="font-semibold">Create Collection</span>
            <span className="mt-1 text-xs">Organize your recipes</span>
          </button>
        </div>
      </section>

      {/* CREATE / EDIT COLLECTION MODAL */}
      {showCreateModal && (
        <div onClick={() => setShowCreateModal(false)} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {editingCollection ? "Edit Collection" : "New Collection"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">Give your recipe collection a name.</p>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100">
                <X size={19} />
              </button>
            </div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">Collection Name</label>
            <input autoFocus value={collectionName} onChange={(e) => setCollectionName(e.target.value)} placeholder="e.g. Weekend Cooking" maxLength={30} className="mb-4 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" />

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Description <span className="font-normal text-gray-400">(Optional)</span>
            </label>
            <textarea value={collectionDescription} onChange={(e) => setCollectionDescription(e.target.value)} placeholder="What kind of recipes belong here?" rows={3} maxLength={100} className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" />

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setShowCreateModal(false)} className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={editingCollection ? updateCollection : createCollection} disabled={!collectionName.trim()} className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50">
                <Check size={16} />
                {editingCollection ? "Save Changes" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}