import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateRecipe from "./pages/CreateRecipe";
import Categories from "./pages/Categories";
import RecipeDetail from "./pages/RecipeDetail";
import EditRecipe from "./pages/EditRecipe";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/recipes/:id/edit" element={<EditRecipe />} />
        <Route path="/recipes/create" element={<CreateRecipe />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
