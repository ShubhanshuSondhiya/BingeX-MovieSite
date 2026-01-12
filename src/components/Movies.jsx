import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Link } from "react-router-dom";
import NoImage from "../assets/NoImage.jpg";
import { Atom } from "react-loading-indicators";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const moviePath = "https://image.tmdb.org/t/p/w500";

  function formatDate(dateString) {
    if (!dateString) return "Unknown date";
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  }

  function getVoteColor(vote) {
    if (vote === 0) return "#7f8c8d";
    if (vote >= 7) return "#27ae60";
    if (vote >= 6) return "#f39c12";
    if (vote >= 5) return "#f1c40f";
    if (vote >= 3.5) return "#e67e22";
    if (vote > 0) return "#e74c3c";
    return "#7f8c8d";
  }

  // Fetch genres dynamically
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${
            import.meta.env.VITE_TMDB_API_KEY
          }`
        );
        const data = await response.json();
        setGenres(data.genres || []);
      } catch (err) {
        setGenres([]);
      }
    };
    fetchGenres();
  }, []);

  // Fetch movies based on filters
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      window.scrollTo(0, 0);

      const filters = new URLSearchParams({
        with_genres: selectedGenre,
        language: selectedLanguage,
        page: currentPage,
      });

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${
            import.meta.env.VITE_TMDB_API_KEY
          }&${filters.toString()}`
        );
        const data = await response.json();
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (err) {
        setMovies([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [selectedGenre, selectedLanguage, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      {/* Loading Spinner */}
      {loading ? (
        <div className="bg-slate-950 h-screen w-full flex flex-col justify-center items-center -mt-12">
          <Atom color="#ff0067" size="medium" text="" textColor="#000000" />
          <p className="text-white">Loading...</p>
        </div>
      ) : (
        <>
          {/* Filter Section */}
          <div className="filters flex flex-wrap gap-4 justify-center p-4">
            {/* Genre Filter */}
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="px-4 py-2 bg-gray-800 text-white rounded"
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>

            {/* Language Filter */}
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-4 py-2 bg-gray-800 text-white rounded"
            >
              <option value="">All Languages</option>
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
              {/* Add more languages as needed */}
            </select>

            {/* Reset Filters */}
            <button
              onClick={() => {
                setSelectedGenre("");
                setSelectedLanguage("");
                setCurrentPage(1);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Reset Filters
            </button>
          </div>

          {/* Movie List */}
          <div className="py-6 movies-container flex flex-wrap text-white w-[90vw] ml-auto mr-auto justify-evenly">
            {movies.map((movie) => {
              const voteAverage = movie.vote_average || 0;
              const percentage =
                voteAverage > 0 ? Math.round(voteAverage * 10) : 0;

              return (
                <Link to={`/movie/${movie.id}`} key={movie.id}>
                  <div className="p-2">
                    <div className="relative">
                      <img
                        className="rounded-xl w-36 h-52 sm:w-[200px] sm:h-[300px] object-cover"
                        src={
                          movie.poster_path
                            ? moviePath + movie.poster_path
                            : NoImage
                        }
                        alt={movie.title || "No image available"}
                      />
                      <div
                        className="absolute"
                        style={{
                          bottom: -17,
                          left: 8,
                          width: 40,
                          height: 40,
                          backgroundColor: "black",
                          borderRadius: "50%",
                          padding: "4px",
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
                    <p className="w-36 truncate text-sm sm:text-lg mt-4">
                      {movie.title ||
                        movie.name ||
                        movie.original_title ||
                        movie.original_name}
                    </p>
                    <p className="text-sm text-slate-500">
                      {formatDate(movie.release_date || movie.first_air_date)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Pagination Controls */}
          <div className="pagination mt-4 flex justify-center items-center space-x-4">
            <button
              onClick={handlePrevPage}
              className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Movies;
