import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";
const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatinImg, setGeneratinImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratinImg(true);
        const response = await fetch("http://localhost:8080/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });
        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
      } finally {
        setGeneratinImg(false);
      }
    } else {
      alert("Please enter a valid prompt");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        await response.json();
        navigate("/");
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please generate a prompt first");
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight">
          Design
        </h1>
        <p className="mt-12 mb-8 text-[#666e75] text-lg max-w-[500px]">
          Unleash your creativity with{" "}
          <span className="font-bold text-[#6469ff]">AI-generated</span>{" "}
          masterpieces, a fusion of artistry and cutting-edge technology, and
          share them with the community.
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName={
              <span className="text-lg font-semibold text-[#6469ff]">
                Enter Your Name
              </span>
            }
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName={<span className="text-lg font-semibold text-[#6469ff]">Prompt To The AI</span>}
            type="text"
            name="prompt"
            placeholder="Two futuristic towers with a skybridge covered in lush foliage, digital art"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div
            className="relative bg-gray-50 border 
          border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
          focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center"
          >
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
            {generatinImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 hover:bg-[#4649ff] hover:shadow-md transition-colors duration-300"
          >
            {generatinImg ? "Generating..." : "Generate"}
          </button>
        </div>
        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            {" "}
            Join the creative community and share your masterpiece with fellow
            enthusiasts!
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-green-500 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-green-600 hover:shadow-md transition-colors duration-300"
          >
            {loading ? "Contributing..." : "Become a Contributor"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
