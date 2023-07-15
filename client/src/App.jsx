import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { logo } from "./assets";
import { Home, CreatePost } from "./pages";
const App = () => {
  return (
    <BrowserRouter>
      <header
       className="w-full flex justify-between items-center sm:px-8 py-4 border-b border-b-[#e6ebf4]"
        style={{
          background: "linear-gradient(to right, #23154f, #341d6e, #14142b)",
        }}
      >
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="w-28 object-contain"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </Link>
        <Link
          to="/create-post"
          className="font-inter font-medium bg-purple-600 text-white px-4 py-2 rounded-md transition-all duration-300 hover:scale-105 hover:bg-purple-700"
        >
          CreatePost
        </Link>
      </header>
      {/* sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)] */}
      <main className="sm:p-8 px-4 py-8 w-full bg-gradient-to-br from-purple-300 to-blue-200 min-h-[calc(100vh-73px)] ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
