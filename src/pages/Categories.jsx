import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../main";
import { AiOutlineClose } from "react-icons/ai";

const Categories = () => {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        BASE_URL + `/recipes/categories/all?search=${search}`
      );
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        BASE_URL + "/recipes/categories/create",
        {
          category,
        }
      );
      setCategory("");
      fetchCategories();
      setError("");
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        BASE_URL + `/recipes/${id}/categories`
      );
      setError("");
      fetchCategories();
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    }
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="bg-indigo-400 px-4 md:px-16  py-16 h-[85svh] relative">
      {error && (
        <div className="text-red-50 px-4 py-2 text-sm rounded bg-red-400 absolute top-2 w-fit left-0 right-0 mx-auto">
          {error}
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between ">
        <div className="text-indigo-50 font-semibold text-2xl">Categories</div>
        <form onSubmit={submitHandler} className="flex items-center gap-2">
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            type="text"
            className="px-2 py-1 rounded border-none focus:outline-none"
          />
          <button
            type="submit"
            className="bg-indigo-500 px-2 py-1 text-indigo-50 rounded"
          >
            Create
          </button>
        </form>
      </div>
      {categories.length > 0 && (
        <div className="mt-8">
          <form onSubmit={searchHandler}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              type="text"
              className="mb-2 border-none focus:outline-none rounded px-2 py-1"
            />
          </form>
          <div className="flex gap-2 flex-wrap border px-2 py-2">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="px-2 flex items-center gap-2 py-1 border border-indigo-50 font-semibold text-sm text-indigo-50"
              >
                {cat.category}
                <AiOutlineClose
                  onClick={() => deleteHandler(cat.id)}
                  size={18}
                  className="hover:text-indigo-500 cursor-pointer transition-all delay-75"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
