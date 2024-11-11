import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { search } from "../../redux/slices/MovieDataSlice";
import { Link, useParams } from "react-router-dom";
import NoImage from "../assets/NoPhoto.jpg";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const SearchResults = () => {
  const { searchTerm } = useParams();
  const [page , setPage] = useState(1)
  const dispatch = useDispatch();
  const [optionChange, setOptionChange] = useState("op1");
  const { searchMovies, searchTVShows ,totalPages } = useSelector((state) => {
    return state.movieReducer;
  });
  console.log(searchMovies, searchTVShows);

  useEffect(() => { 
    window.scrollTo(0,0);
    dispatch(search({ inputText: searchTerm, page }));
  }, [dispatch, searchTerm , page]);

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  }

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  let moviePath = "https://image.tmdb.org/t/p/w500";
  function getVoteColor(vote) {
    if (vote === 0) return "#7f8c8d"; // gray for NR (no rating)
    if (vote >= 7) return "#27ae60"; // green for good ratings
    if (vote >= 6) return "#f39c12"; // orange for above average ratings
    if (vote >= 5) return "#f1c40f"; // yellow for average ratings
    if (vote >= 3.5) return "#e67e22"; // orange-red for below average ratings
    if (vote > 0) return "#e74c3c"; // red for low ratings
    return "#7f8c8d"; // default gray for no rating or invalid value
  }

  return (
    <div className="w-[90vw] bg-slate-950 text-white ml-auto mr-auto min-h-screen">
      <h1 className="mx-12 pt-6 text-xl sm:text-2xl">{`Search results for "${searchTerm}"`}</h1>
      <div className="mx-12 mt-4 inline-flex gap-1 p-1 rounded-3xl bg-slate-300 text-sm md:text-base">
        <p
          className={`${
            optionChange === "op1" ? "bg-black text-white" : "text-black"
          } px-1 md:px-2 rounded-xl cursor-pointer animated-option`}
          onClick={() => setOptionChange("op1")}
        >
          Movies
        </p>
        <p className="text-black">/</p>
        <p
          className={`${
            optionChange === "op2" ? "bg-black text-white" : "text-black"
          } px-1 md:px-2 rounded-xl cursor-pointer animated-option`}
          onClick={() => setOptionChange("op2")}
        >
          TV Shows
        </p>
      </div>
      <div className="flex flex-wrap gap-6 justify-center">
        {optionChange == "op1"
          ? searchMovies.map((movie, index) => {
              const voteAverage = movie.vote_average || 0;
              const percentage =
                voteAverage > 0 ? Math.round(voteAverage * 10) : 0;

              return (
                <Link
                  to={`/${optionChange == "op1" ? "movie" : "tv"}/${movie.id}`}
                  key={index}
                >
                  <div className="pt-8 w-48 sm:w-52" key={index}>
                    <div className="relative">
                      {/* Movie Poster */}
                      <img
                        className="rounded-xl w-48 sm:w-[200px] sm:h-[300px] 2xl:w-72 2xl:h-96 object-cover"
                        src={
                          movie.poster_path
                            ? moviePath + movie.poster_path
                            : NoImage
                        }
                        alt={movie.title || "No image available"}
                      />

                      {/* Circular Progress Bar - positioned absolute */}
                      <div
                        className="absolute"
                        style={{
                          bottom: -17, // Adjust this value to move it down further into the image
                          left: 8, // Adjust this to move it horizontally
                          width: 40, // Size of the circle
                          height: 40,
                          backgroundColor: "black", // Add white background
                          borderRadius: "50%", // Ensure the background is circular
                          padding: "4px", // Add padding to create some space around the progress bar
                        }}
                      >
                        <CircularProgressbar
                          value={percentage}
                          text={voteAverage === 0 ? "NR" : `${percentage}%`}
                          styles={buildStyles({
                            textSize: "30px",
                            pathColor: getVoteColor(voteAverage),
                            textColor: "white",
                            trailColor: "#d6d6d6",
                          })}
                        />
                      </div>
                    </div>
                    <p className="truncate text-sm sm:text-lg mt-4">
                      {movie.name ||
                        movie.original_name ||
                        movie.title ||
                        movie.original_title}
                    </p>
                    <p className="text-sm text-slate-500">
                      {movie.release_date
                        ? formatDate(movie.release_date)
                        : formatDate(movie.first_air_date)}
                    </p>
                  </div>
                </Link>
              );
            })
          : searchTVShows.map((movie, index) => {
              const voteAverage = movie.vote_average || 0;
              const percentage =
                voteAverage > 0 ? Math.round(voteAverage * 10) : 0;

              return (
                <Link
                  to={`/${optionChange == "op1" ? "movie" : "tv"}/${movie.id}`}
                  key={index}
                >
                  <div className="pt-8 w-48 sm:w-52" key={index}>
                    <div className="relative">
                      {/* Movie Poster */}
                      <img
                        className="rounded-xl w-48 sm:w-[200px] sm:h-[300px] 2xl:w-72 2xl:h-96 object-cover"
                        src={
                          movie.poster_path
                            ? moviePath + movie.poster_path
                            : NoImage
                        }
                        alt={movie.title || "No image available"}
                      />

                      {/* Circular Progress Bar - positioned absolute */}
                      <div
                        className="absolute"
                        style={{
                          bottom: -17, // Adjust this value to move it down further into the image
                          left: 8, // Adjust this to move it horizontally
                          width: 40, // Size of the circle
                          height: 40,
                          backgroundColor: "black", // Add white background
                          borderRadius: "50%", // Ensure the background is circular
                          padding: "4px", // Add padding to create some space around the progress bar
                        }}
                      >
                        <CircularProgressbar
                          value={percentage}
                          text={voteAverage === 0 ? "NR" : `${percentage}%`}
                          styles={buildStyles({
                            textSize: "30px",
                            pathColor: getVoteColor(voteAverage),
                            textColor: "white",
                            trailColor: "#d6d6d6",
                          })}
                        />
                      </div>
                    </div>
                    <p className="truncate text-sm sm:text-lg mt-4">
                      {movie.name ||
                        movie.original_name ||
                        movie.title ||
                        movie.original_title}
                    </p>
                    <p className="text-sm text-slate-500">
                      {movie.release_date
                        ? formatDate(movie.release_date)
                        : formatDate(movie.first_air_date)}
                    </p>
                  </div>
                </Link>
              );
            })}
      </div>
      <div className="flex justify-center mt-12">
        {page > 1 && (
          <button
            className="px-3 py-1 bg-blue-500 rounded-lg mr-2"
            onClick={() => handlePageChange(page - 1)}
          >
            Previous
          </button>
        )}
        <span className="text-sm sm:text-base text-gray-300 mx-4">
          Page {page} of {totalPages || 1}
        </span>
        {page < totalPages && (
          <button
            className="px-3 py-1 bg-blue-500 rounded-lg ml-2"
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
