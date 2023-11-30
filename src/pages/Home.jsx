import React, { useEffect, useState } from "react";
import { BASE_URL } from "../main";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});

  const fetchRecipes = async () => {
    try {
      const { data } = await axios.get(BASE_URL + "/recipes");
      setRecipes(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(BASE_URL + "/recipes/categories/all");
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const selectCategory = async (cat) => {
    setSelectedCategory(cat);
    if (cat.id === 9999) {
      fetchRecipes();
    } else {
      try {
        const { data } = await axios.get(
          BASE_URL + `/recipes/${cat?.id}/categories`
        );

        setRecipes(data.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchRecipes();
    fetchCategories();
  }, []);
  return (
    <div className="bg-indigo-400 min-h-[100svh] px-16 pt-4 pb-8">
      <div className="text-center text-indigo-50 font-semibold text-2xl my-4">
        Recipes
      </div>
      {categories.length > 0 && (
        <div className="flex gap-2 my-4 justify-start lg:justify-center overflow-x-scroll overflow-y-hidden px-2">
          <div
            onClick={() => selectCategory({ id: 9999, category: "ALL" })}
            className={`text-sm hover:text-indigo-600 hover:border-indigo-600 transition-all delay-75 cursor-pointer border px-2 py-1 ${
              selectedCategory?.id === 9999
                ? "text-indigo-600 border-indigo-600"
                : "text-indigo-50 border-indigo-50"
            }`}
          >
            ALL
          </div>
          {categories.map((cat) => (
            <div
              onClick={() => selectCategory(cat)}
              className={`text-sm hover:text-indigo-600 hover:border-indigo-600 transition-all delay-75 cursor-pointer border px-2 py-1 ${
                selectedCategory?.id === cat.id
                  ? "text-indigo-600 border-indigo-600"
                  : "text-indigo-50 border-indigo-50"
              }`}
              key={cat.id}
            >
              {cat.category}
            </div>
          ))}
        </div>
      )}

      {selectedCategory?.category && (
        <h2 className="text-indigo-50 text-sm text-center my-4">
          Results for category {selectedCategory?.category}
        </h2>
      )}
      {recipes.length > 0 ? (
        <div className="flex gap-4 flex-wrap justify-center">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-xl text-indigo-50 text-center my-24">
          No recipes found
        </div>
      )}
    </div>
  );
};

export default Home;
