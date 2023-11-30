import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/recipemanager.png";

const Header = () => {
  return (
    <header className="h-[10svh] bg-indigo-600 flex items-center justify-between px-4 md:px-16 py-8">
      <Link className="text-indigo-100 text-xl font-bold" to={"/"}>
        <img className="h-14" src={logo} alt="" />
      </Link>
      <ul className="flex gap-4">
        <li className="text-indigo-50 font-semibold text-sm">
          <Link to={"/recipes/create"}>Create Recipe</Link>
        </li>
        <li className="text-indigo-50 font-semibold text-sm">
          <Link to={"/categories"}>Categories</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
