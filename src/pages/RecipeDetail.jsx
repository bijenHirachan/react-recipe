import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL, IMAGE_URL } from "../main";
import placeholder from "../assets/placeholder.png";
import { AiOutlineEdit } from "react-icons/ai";

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();

  const fetchRecipe = async () => {
    try {
      const { data } = await axios.get(BASE_URL + `/recipes/${id}`);
      setRecipe(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  return (
    <div className="min-h-[85svh] bg-indigo-400 py-4 px-4 sm:px-16">
      {recipe && (
        <div className="bg-indigo-200 px-4 py-4 rounded shadow-2xl relative">
          <Link
            to={`/recipes/${id}/edit`}
            className="absolute bottom-1 right-1 hover:bg-gray-100 transition-all delay-75 flex items-center gap-1 border border-gray-400 text-gray-500 px-2 py-1 rounded cursor-pointer"
          >
            <AiOutlineEdit />
            <span className="text-xs font-semibold">Edit</span>
          </Link>
          <div className="flex justify-center my-4">
            {recipe.image_url ? (
              <img
                className="object-contain rounded object-center w-full md:w-4/5 xl:w-2/5"
                src={IMAGE_URL + recipe.image_url}
                alt=""
              />
            ) : (
              <img
                className="object-contain object-center"
                src={placeholder}
                alt=""
              />
            )}
          </div>
          <div className="">
            <h3 className="text-gray-700 text-2xl font-semibold mb-1">
              {recipe.title}
            </h3>
            {recipe.categories.length > 0 && (
              <div className="flex gap-1 flex-wrap mt-2 mb-4">
                {recipe.categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="border text-xs px-2 py-1 text-gray-500 border-gray-400"
                  >
                    {cat.category}
                  </div>
                ))}
              </div>
            )}
            <p className="text-gray-500 text-sm">{recipe.description}</p>
            {recipe.steps.length > 0 && (
              <div className="my-6">
                <h3 className="text-gray-600 font-semibold">Steps</h3>
                <ul className="text-gray-500 text-sm">
                  {recipe.steps.map((step) => (
                    <li key={step.id} className="list-decimal ml-4">
                      {step.step}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default RecipeDetail;
