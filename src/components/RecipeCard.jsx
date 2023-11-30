import React from "react";
import placeholder from "../assets/placeholder.png";
import { IMAGE_URL } from "../main";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <Link
      to={`/recipes/${recipe.id}`}
      key={recipe?.id}
      className="flex-shrink-0 w-72 h-64 rounded-lg bg-indigo-200"
    >
      {recipe?.image_url ? (
        <img
          src={IMAGE_URL + recipe?.image_url}
          className="rounded-t-lg w-72 h-48 object-cover object-center"
          alt=""
        />
      ) : (
        <img
          src={placeholder}
          className="rounded-t-lg w-72 h-48 object-cover object-center"
          alt=""
        />
      )}
      <h2 className="text-gray-500 text-sm px-2 pt-2 font-semibold">
        {recipe?.title}
      </h2>
      <p className="text-gray-500 text-xs px-2 pb-2">
        {recipe?.description.substr(0, 38)}...
      </p>
    </Link>
  );
};

export default RecipeCard;
