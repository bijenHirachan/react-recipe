import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL, IMAGE_URL } from "../main";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";

const EditRecipe = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [currentCategories, setCurrentCategories] = useState([]);
  const [steps, setSteps] = useState([]);
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [newStep, setNewStep] = useState("");

  const navigate = useNavigate();

  const fetchRecipe = async () => {
    try {
      const { data } = await axios.get(BASE_URL + `/recipes/${id}`);
      setTitle(data.data.title);
      setDescription(data.data.description);
      setCurrentImage(data?.data?.image_url ?? "");
      setCurrentCategories(data.data.categories);
      setSteps(data.data.steps);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(BASE_URL + `/recipes/categories/all`);
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);
      formData.append("_method", "PUT");
      const { data } = await axios.post(BASE_URL + `/recipes/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate(`/recipes/${id}`);
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    }
    setLoading(false);
  };

  const addCategory = async (catId) => {
    try {
      const { data } = await axios.post(
        BASE_URL + `/recipes/${id}/categories/add`,
        {
          categories: [catId],
        }
      );
      setError("");
      fetchRecipe();
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  const removeCategory = async (catId) => {
    try {
      const { data } = await axios.post(
        BASE_URL + `/recipes/${id}/categories/remove`,
        {
          categories: [catId],
          _method: "DELETE",
        }
      );
      setError("");
      fetchRecipe();
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  const addStepHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        BASE_URL + `/recipes/${id}/createstep`,
        {
          step: newStep,
        }
      );
      setNewStep("");
      setError("");
      fetchRecipe();
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  const removeStep = async (stepId) => {
    try {
      const { data } = await axios.post(BASE_URL + `/recipes/steps/${stepId}`, {
        _method: "DELETE",
      });
      setError("");
      fetchRecipe();
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchRecipe();
    fetchCategories();
  }, [id]);

  return (
    <div className="bg-indigo-400 px-4 md:px-16 min-h-[85svh]  grid grid-cols-12 py-16 gap-4">
      <div className="col-span-12 sm:col-span-6 flex justify-center flex-col items-center">
        {error && (
          <div className="text-xs bg-red-400 text-red-50 px-2 py-1 rounded">
            {error}
          </div>
        )}
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-3 w-full  border border-indigo-50 p-4 rounded shadow-md"
          encType="multipart/form-data"
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-indigo-50">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-none focus:outline-none rounded px-1 py-2"
              type="text"
              placeholder="Title..."
            />
          </div>

          {currentImage && (
            <div className="flex flex-col">
              <img
                className="h-24 w-32 object-contain object-center"
                src={IMAGE_URL + currentImage}
                alt=""
              />
              <p className="text-sm text-indigo-50">Current Image</p>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-indigo-50 ">
              Image
            </label>
            <input
              type="file"
              className="text-xs text-indigo-50 file:rounded-md file:border-none file:text-indigo-50 file:bg-indigo-600 file:px-2 file:py-1 file:text-xs"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-indigo-50">
              Description
            </label>
            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-none focus:outline-none rounded px-1 py-2"
              placeholder="Description..."
            />
          </div>

          <div>
            <button
              disabled={loading}
              type="submit"
              className="bg-indigo-600 px-4 py-2 text-indigo-50 rounded w-full"
            >
              {loading ? "Loading..." : "Update"}
            </button>
          </div>
        </form>
      </div>

      <div className="col-span-12 sm:col-span-6 flex justify-center flex-col items-center gap-4">
        {categories.length > 0 && (
          <div className="border px-2 py-2 w-full rounded shadow-md mt-4">
            <h2 className="text-indigo-50 text-sm font-semibold mb-1">
              All Categories
            </h2>

            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="border px-2 py-1 text-xs text-indigo-50 border-indigo-50 flex items-center gap-1"
                >
                  <span>{cat.category}</span>
                  <AiOutlinePlus
                    onClick={() => addCategory(cat.id)}
                    size={14}
                    className="hover:text-indigo-500 cursor-pointer transition-all delay-75"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {currentCategories.length > 0 && (
          <div className="border px-2 py-2 w-full rounded shadow-md ">
            <h2 className="text-indigo-50 text-sm font-semibold mb-1">
              Current Categories
            </h2>

            <div className="flex gap-2 flex-wrap">
              {currentCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="border px-2 py-1 text-xs text-indigo-50 border-indigo-50 flex items-center gap-1"
                >
                  <span>{cat.category}</span>
                  <AiOutlineClose
                    onClick={() => removeCategory(cat.id)}
                    size={14}
                    className="hover:text-indigo-500 cursor-pointer transition-all delay-75"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <form
          onSubmit={addStepHandler}
          className="border px-2 py-2 w-full rounded shadow-md"
        >
          <h2 className="text-indigo-50 text-sm font-semibold mb-1">
            Add Step
          </h2>

          <div className="flex w-full">
            <input
              className="w-10/12 text-sm px-2 py-1 rounded-l border-none focus:outline-none"
              value={newStep}
              placeholder="Step"
              onChange={(e) => setNewStep(e.target.value)}
            />
            <button
              type="submit"
              className="px-2 py-1 bg-indigo-600 w-2/12 text-xs rounded-r text-indigo-50"
            >
              Create
            </button>
          </div>
        </form>

        {steps.length > 0 && (
          <div className="border px-2 py-2 w-full rounded shadow-md ">
            <h2 className="text-indigo-50 text-sm font-semibold mb-1">Steps</h2>

            <div className="flex gap-2 flex-col">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="border px-2 py-1 text-xs text-indigo-50 border-indigo-50 relative"
                >
                  <span>{step.step}</span>
                  <AiOutlineClose
                    onClick={() => removeStep(step.id)}
                    size={14}
                    className="absolute top-1  right-1 hover:text-indigo-500 cursor-pointer transition-all delay-75"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditRecipe;
