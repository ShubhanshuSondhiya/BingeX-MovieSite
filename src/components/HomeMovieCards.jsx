/* eslint-disable react/prop-types */
import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../App.css";
import NoImage from "../assets/NoImage.jpg";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 431 },
    items: 3,
    slidesToSlide: 3,
  },
  mobile: {
    breakpoint: { max: 430, min: 320 },
    items: 2,
    slidesToSlide: 2,
  },
};

const HomeMovieCards = ({ heading, option1, option2, choice1, choice2 }) => {
  const [optionChange, setOptionChange] = useState("op1");
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

  const renderMovies = (movies = []) =>
    (movies || []).map((movie, index) => {
      const voteAverage = movie.vote_average || 0;
      const percentage = voteAverage > 0 ? Math.round(voteAverage * 10) : 0;

      return (
        <Link
          to={`/${heading=="Trending"?"movie":optionChange=="op1"?"movie":"tv"}/${movie.id}`}
          key={index}
        >
          <div className="p-2" key={index}>
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
            <p className="truncate text-sm sm:text-lg mt-4">
              {movie.name || movie.original_name || movie.title || movie.original_title}
            </p>
            <p className="text-sm text-slate-500">
              {movie.release_date
                ? formatDate(movie.release_date)
                : formatDate(movie.first_air_date)}
            </p>
          </div>
        </Link>
      );
    });

  return (
    <div className="w-[85vw] ml-auto mr-auto mb-12">
      <div className="flex justify-between mx-6 mb-6">
        <h1 className="text-lg md:text-3xl">{heading}</h1>
        <div className="flex gap-1 p-1 rounded-3xl bg-slate-300 text-sm md:text-base">
          <p
            className={`${
              optionChange === "op1" ? "bg-black text-white" : "text-black"
            } px-1 md:px-2 rounded-3xl cursor-pointer animated-option`}
            onClick={() => setOptionChange("op1")}
          >
            {choice1}
          </p>
          <p className="text-black">/</p>
          <p
            className={`${
              optionChange === "op2" ? "bg-black text-white" : "text-black"
            } px-1 md:px-2 rounded-3xl cursor-pointer animated-option`}
            onClick={() => setOptionChange("op2")}
          >
            {choice2}
          </p>
        </div>
      </div>
      <div className="mb-6">
        <Carousel
          responsive={responsive}
          autoPlay={false}
          swipeable
          draggable={false}
          infinite
          rewindWithAnimation
          partialVisible={false}
          dotListClass="custom-dot-list-style"
        >
          {optionChange === "op1" ? renderMovies(option1) : renderMovies(option2)}
        </Carousel>
      </div>
    </div>
  );
};

export default HomeMovieCards;
