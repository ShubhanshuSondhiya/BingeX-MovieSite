/* eslint-disable react/prop-types */
import SearchBar from "./SearchBar";
import { useState, useEffect, useMemo } from "react";

const Hero = ({
  trendingByDay,
  trendingByWeek,
  popularMovies,
}) => {
  const [randomBackdrop, setRandomBackdrop] = useState("");

  // Memoize the movies array
  const movies = useMemo(() => {
    return [
      ...trendingByDay,
      ...trendingByWeek,
      ...popularMovies,
    ];
  }, [trendingByDay, trendingByWeek, popularMovies]);

  useEffect(() => {
    // Function to set a random background image
    const updateRandomBackdrop = () => {
      if (movies.length > 0) {
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        setRandomBackdrop(
          `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`
        );
      }
    };

    // Update the backdrop immediately on load
    updateRandomBackdrop();

    // Set an interval to update the backdrop every 5 seconds
    const interval = setInterval(updateRandomBackdrop, 10000);

    // Clear the interval on unmount
    return () => clearInterval(interval);
  }, [movies]);

  return (
    <div className="h-[100vh] mb-16 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background image with gradient */}
      <div
        className="h-[100vh] absolute inset-0"
        style={{
          backgroundImage: `url(${randomBackdrop})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          zIndex: 5,
          transition: "background-image 1s ease-in-out", // Smooth transition effect
        }}
      ></div>

      {/* Dark overlay for blending */}
      <div
        className="h-[100vh] absolute inset-0 z-20"
        style={{
          backgroundImage: 
          `linear-gradient(180deg, rgba(2,6,23,1) 0%, rgba(2,6,23,0.9051995798319328) 9%, rgba(2,6,23,0.7371323529411764) 22%, rgba(2,6,23,0) 74%),
          linear-gradient(0deg, rgba(2,6,23,1) 0%, rgba(2,6,23,0.9051995798319328) 9%, rgba(2,6,23,0.7371323529411764) 22%, rgba(2,6,23,0) 74%)`,
        }}
      ></div>

      <div className="w-[95vw] relative z-20 text-center text-white">
        <h1 className="text-5xl md:text-7xl mb-4">Welcome.</h1>
        <p className="text-base p-4 md:text-xl">
          Your gateway to a universe of movies, TV shows, and famous faces.
          Explore now!
        </p>
        <SearchBar />
      </div>
    </div>
  );
};

export default Hero;
