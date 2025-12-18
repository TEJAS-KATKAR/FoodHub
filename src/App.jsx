import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Filters from "./pages/Filters";
import AiCook from "./pages/AiCook";
import Favourites from "./pages/Favourites";
import AboutUs from "./pages/AboutUs";
import RecipeDetails from "./pages/RecipeDetails";
import SearchResults from "./pages/SearchResults";
import DatasetDetails from "./pages/DatasetDetails";


function App() {
  return (
    <>
    
    <BrowserRouter>
      <Routes>
        {/* All pages are children of Layout so the navbars stay visible */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/filters" element={<Filters />} />
          <Route path="/aicook" element={<AiCook />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/dataset/:id" element={<DatasetDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
    
    
    </>
    
    
    
  );
}

export default App;
