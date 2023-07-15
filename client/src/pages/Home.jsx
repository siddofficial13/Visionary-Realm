import React from "react";
import { useState, useEffect } from "react";
import { Loader, Card, FormField } from "../components";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return (
    <h2 className="mt-5 font-medium text-[#6469ff] text-lg uppercase tracking-wide">
      {title}
    </h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const result = await response.json();

          setAllPosts(result.data.reverse());
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchResults = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResults);
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div className="text-center">
        <h1 className="font-extrabold text-[#222328] text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight mb-12">
          <span className="relative">
            Visionary
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 mix-blend-multiply opacity-70 z-[-1]"></span>
          </span>
          Realm
        </h1>

        <p className="mt-4 text-[#666e75] text-lg max-w-[500px] mx-auto">
          Explore an extraordinary gallery of{" "}
          <span className="font-bold text-[#4649ff]">AI-generated</span>{" "}
          masterpieces, showcasing the unparalleled fusion of artistry and
          cutting-edge technology.
        </p>
      </div>

      <div className="mt-16">
        <FormField
          labelName={
            <span className="text-2xl font-bold text-[#4649ff] relative">
              Explore here...
              <span className="absolute inset-0 bg-gradient-to-r from-[#4649ff] via-[#8f50fb] to-[#ca82fe] mix-blend-lighten opacity-70 animate-pulse z-[-1]"></span>
            </span>
          }
          type="text"
          name="text"
          placeholder="Search posts"
          value={searchText}
          handleChange={handleSearchChange}
          inputProps={{
            className:
              "border border-gray-300 bg-blue-100 text-gray-600 placeholder-blue-400 rounded-lg px-4 py-2 outline-none",
          }}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-2xl mb-3">
                <span className="text-[#6469ff]">Showing results for:</span>{" "}
                <span className="text-[#222328] font-bold">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No search results found"
                />
              ) : (
                <RenderCards data={allPosts} title="No posts found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
