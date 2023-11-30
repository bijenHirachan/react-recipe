import React, { useState } from "react";

import { BASE_URL } from "../main";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateRecipe = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);
      // console.log(image);
      const { data } = await axios.post(BASE_URL + "/recipes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    }
    setLoading(false);
  };

  return (
    <div className="bg-indigo-400 px-4 h-[85svh] flex flex-col gap-4 justify-center items-center">
      {error && (
        <div className="text-xs bg-red-400 text-red-50 px-2 py-1 rounded">
          {error}
        </div>
      )}

      <form
        onSubmit={submitHandler}
        className="w-full md:w-1/2 xl:w-1/3 flex flex-col gap-4"
        encType="multipart/form-data"
      >
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-indigo-50">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-none focus:outline-none rounded px-1 py-2"
            type="text"
            placeholder="Title..."
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="dropzone-file"
            className="text-sm font-semibold text-indigo-50 "
          >
            Image
          </label>
          <input
            type="file"
            className="text-xs text-indigo-50 hover:file:bg-indigo-700 file:transition-all file:delay-75 file:cursor-pointer file:rounded-md file:border-none file:text-indigo-50 file:bg-indigo-600 file:px-2 file:py-1 file:text-xs"
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
            className="bg-indigo-600 hover:bg-indigo-700 transition-all delay-75 px-4 py-2 text-indigo-50 rounded w-full"
          >
            {loading ? "Loading..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipe;
