import { useNavigate } from "react-router-dom";
import "../App.css";
import { useState, useEffect } from "react";

const SearchBar = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [inputText,setInputText] = useState("");
  const navigate = useNavigate();

  // Function to detect screen size
  const handleResize = () => {
    setIsLargeScreen(window.innerWidth >= 320); // Change the value to your break-point (768px for sm)
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Call it once initially

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleSubmit(e){
    e.preventDefault();
    navigate("/search/"+inputText);

  }

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="relative p-8 w-full sm:max-w-2xl sm:mx-auto">
        <div className="overflow-hidden z-0 rounded-full relative p-2">
          <form action="" onSubmit={handleSubmit} className="relative flex z-50 bg-white rounded-full">
            <input
              type="text"
              value={inputText}
              onChange={(e)=>setInputText(e.target.value)}
              placeholder="Enter your search here"
              className="w-9 rounded-full flex-1 px-2 py-2 sm:px-6 sm:py-4 text-gray-700 text-sm lg:text-base focus:outline-none"
            />
            <button type="submit" className="bg-indigo-500 text-white rounded-full font-semibold px-2 py-2 sm:px-8 sm:py-4 hover:bg-indigo-400 focus:bg-indigo-600 focus:outline-none">
              {isLargeScreen ? (
                "Search"
              ) : (
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
                    fill="#FFFFFF"
                  />
                </svg>
              )}
            </button>
          </form>
          <div className="glow glow-1 z-10 bg-pink-400 absolute"></div>
          <div className="glow glow-2 z-20 bg-purple-400 absolute"></div>
          <div className="glow glow-3 z-30 bg-yellow-400 absolute"></div>
          <div className="glow glow-4 z-40 bg-blue-400 absolute"></div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
