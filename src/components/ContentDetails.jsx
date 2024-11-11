/* eslint-disable no-unused-vars */
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Atom } from "react-loading-indicators";
import NoProfile from "../assets/profile.jpg";
import NoImage from "../assets/NoPhoto.jpg";
import { PlayButton } from "./PlayButton";
import { useDispatch, useSelector } from "react-redux";
import {
  credits,
  recommendations,
  similar,
  videos,
} from "../../redux/slices/MovieDataSlice";
import Carousel from "react-multi-carousel";
import VideoPopup from "./VideoPopup";

const ContentDetails = () => {
  const { type, id } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const { creditsArray, videosArray, recommendationsArray, similarArray } =
    useSelector((state) => state.movieReducer);

  const writer =
    creditsArray?.crew?.filter(
      (person) => person.known_for_department === "Writing"
    ) || [];
  const directing =
    creditsArray?.crew?.filter(
      (person) => person.known_for_department === "Directing"
    ) || [];

  useEffect(() => {
    setLoading(true);
    Promise.all([
      dispatch(credits({ type, id })),
      dispatch(videos({ type, id })),
      dispatch(recommendations({ type, id })),
      dispatch(similar({ type, id })),
    ])
      .catch(() => setError("Failed to fetch all data"))
      .finally(() => setLoading(false));
  }, [dispatch, id, type]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchContentDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}?api_key=${
            import.meta.env.VITE_TMDB_API_KEY
          }`
        );
        if (!response.ok) throw new Error("Failed to fetch content details");
        const data = await response.json();
        setTimeout(() => setContent(data), 500);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchContentDetails();
  }, [type, id]);

  console.log(content);
  console.log(creditsArray);

  const responsiveCast = {
    desktopLarge: { breakpoint: { max: 4000, min: 1600 }, items: 8 },
    desktop: { breakpoint: { max: 1599, min: 1024 }, items: 6 },
    tabletLarge: { breakpoint: { max: 1023, min: 768 }, items: 5 },
    tablet: { breakpoint: { max: 767, min: 600 }, items: 4 },
    tabletSmall: { breakpoint: { max: 599, min: 480 }, items: 3 },
    mobileLarge: { breakpoint: { max: 479, min: 360 }, items: 2 },
    mobile: { breakpoint: { max: 359, min: 280 }, items: 2 },
    mobileSmall: { breakpoint: { max: 279, min: 0 }, items: 1 },
  };

  const responsiveVideo = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 431 }, items: 3 },
    mobile: { breakpoint: { max: 430, min: 320 }, items: 1 },
  };
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 431 },
      items: 3,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 430, min: 320 },
      items: 2,
      slidesToSlide: 1,
    },
  };

  function formatDate(dateString) {
    if (!dateString) return "Unknown date";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  function getVoteColor(vote) {
    if (vote === 0) return "#7f8c8d";
    if (vote >= 7) return "#27ae60";
    if (vote >= 6) return "#f39c12";
    if (vote >= 5) return "#f1c40f";
    if (vote >= 3.5) return "#e67e22";
    return "#e74c3c";
  }

  if (error) return <p className="text-red-500">{error}</p>;

  if (loading || !content)
    return (
      <div className="bg-slate-950 h-screen w-full flex flex-col justify-center items-center -mt-12">
        <Atom color="#ff0067" size="medium" text="" textColor="#000000" />
        <p className="text-white">Loading...</p>
      </div>
    );

  const voteAverage = content.vote_average || 0;
  const percentage = voteAverage > 0 ? Math.round(voteAverage * 10) : 0;

  return (
    <div className="text-white">
      <div
        className="relative w-full h-auto lg:h-[100vh] text-white flex justify-center items-center"
        style={{
          backgroundImage: content.backdrop_path
            ? `linear-gradient(180deg, rgba(2,6,23,1) 0%, rgba(2,6,23,0.9) 20%, rgba(2,6,23,0.5) 50%, rgba(2,6,23,0.9) 80%, rgba(2,6,23,1) 100%), 
             url(https://image.tmdb.org/t/p/w1280${content.backdrop_path})`
            : "none",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-[90vw] mr-auto ml-auto">
          <div className="relative w-full lg:flex items-start z-10 m-6 bg-opacity-90">
            <img
              className="w-5/6 full lg:w-1/3 rounded-xl"
              src={
                content.poster_path
                  ? `https://image.tmdb.org/t/p/w500${content.poster_path}`
                  : NoImage
              }
              alt={content.title || content.name || "No image available"}
            />
            <div className="lg:ml-8 mt-4 lg:mt-0">
              <h1 className="text-3xl lg:text-5xl">
                {content.title || content.name}
              </h1>
              <p className="text-slate-300">{content?.tagline || ""}</p>
              <div className="flex gap-2 pt-3 flex-wrap">
                {content.genres?.map((genre, index) => (
                  <p
                    key={index}
                    className="bg-pink-600 rounded-lg px-2 text-sm "
                  >
                    {genre.name}
                  </p>
                ))}
              </div>
              <div className="flex gap-4 items-center mt-3">
                <div
                  style={{
                    width: 70,
                    height: 70,
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
                <div
                  className="videoItem m-3"
                  onClick={(e) => {
                    e.preventDefault();
                    setVideoId(videosArray[videosArray.length - 1].key);
                    setShow(true);
                  }}
                >
                  <PlayButton />
                </div>
              </div>
              <p className="text-2xl my-3">Overview</p>
              <p>{content.overview || "No overview available."}</p>
              <div className="flex gap-8 pt-8">
                <p>
                  Status:{" "}
                  <span className="text-slate-300">{content.status}</span>
                </p>
                <p>
                  Release Date:{" "}
                  <span className="text-slate-300">
                    {formatDate(
                      type === "movie"
                        ? content.release_date
                        : content.first_air_date
                    )}
                  </span>
                </p>
                <p>
                  Runtime:{" "}
                  <span className="text-slate-300">
                    {Math.floor(
                      (content.runtime || content.episode_run_time?.[0]) / 60
                    )}
                    h {(content.runtime || content.episode_run_time?.[0]) % 60}m
                  </span>
                </p>
              </div>

              <hr className="my-6 border-slate-500" />

              {/* Display Director */}

              <div className="flex flex-wrap">
                <p className="font-semibold mr-2">Director:</p>
                {directing.length > 0 ? (
                  <span className="text-slate-300">{directing[0].name}</span>
                ) : (
                  <p className="text-slate-300">
                    No Director information available
                  </p>
                )}
              </div>

              <hr className="my-6 border-slate-500" />

              {/* Display Producers */}
              <div className="flex flex-wrap">
                <p className="font-semibold mr-2">Writer:</p>
                {writer.length > 0 ? (
                  [...new Set(writer.map((producer) => producer.name))].map(
                    (producerName, index, uniqueProducers) => (
                      <span key={index} className="text-slate-300">
                        {producerName}
                        {index < uniqueProducers.length - 1 ? ",\u00A0" : "."}
                      </span>
                    )
                  )
                ) : (
                  <p className="text-slate-300">
                    No Producer information available
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[90vw] mr-auto ml-auto">
        <div className="mt-8">
          <h2 className="text-3xl">Top Cast</h2>
          <Carousel
            responsive={responsiveCast}
            swipeable
            draggable
            showDots={false}
            autoPlay={false}
            infinite={false}
            containerClass="carousel-container"
            itemClass="carousel-item-padding-40-px"
          >
            {creditsArray.cast.map((castMember, index) => (
              <div
                key={index}
                className="flex flex-col items-center w-40 text-center pt-6"
              >
                <img
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover mb-2 hover:scale-105 "
                  src={
                    castMember.profile_path
                      ? `https://image.tmdb.org/t/p/w185${castMember.profile_path}`
                      : NoProfile
                  }
                  alt={castMember.name}
                />
                <p className="font-bold">{castMember.name}</p>
                <p className="text-sm text-slate-300">{castMember.character}</p>
              </div>
            ))}
          </Carousel>
        </div>
        <div className="mt-8">
          <h2 className="text-3xl mb-8">
            {videosArray.length > 0 ? "Videos" : ""}
          </h2>
          <Carousel
            responsive={responsiveVideo}
            swipeable
            draggable
            showDots={false}
            autoPlay={false}
            infinite={true}
            containerClass="carousel-container"
            itemClass="carousel-item-padding-40-px"
          >
            {videosArray.map((video) => (
              <div
                key={video?.id}
                className="videoItem mx-3"
                onClick={() => {
                  setVideoId(video.key);
                  setShow(true);
                }}
              >
                <div className="videoThumbnail flex justify-center items-center">
                  <img
                    src={`https://img.youtube.com/vi/${video?.key}/mqdefault.jpg`}
                    className="rounded-lg"
                  />
                  <div className="glightbox_video absolute">
                    <svg
                      width="65"
                      height="65"
                      viewBox="0 0 131 131"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className="inner-circle"
                        d="M65 21C40.1488 21 20 41.1488 20 66C20 90.8512 40.1488 111 65 111C89.8512 111 110 90.8512 110 66C110 41.1488 89.8512 21 65 21Z"
                        fill="white"
                      ></path>
                      <circle
                        className="outer_circle"
                        cx="65.5"
                        cy="65.5"
                        r="64"
                        stroke="white"
                      ></circle>
                      <path
                        className="play"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M60 76V57L77 66.7774L60 76Z"
                        fill="#BF2428"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="videoTitle flex justify-center items-center">
                  {video?.name}
                </div>
              </div>
            ))}
          </Carousel>
          <VideoPopup
            show={show}
            setShow={setShow}
            videoId={videoId}
            setVideoId={setVideoId}
          />
        </div>

        {/* Similar Movies Section */}
        <div className="mt-8">
          <h2 className="text-3xl">
            {similarArray.length ? "Similar Movies" : ""}
          </h2>
          <Carousel
            responsive={responsive}
            swipeable
            draggable
            showDots={false}
            autoPlay={false}
            infinite={false}
            containerClass="carousel-container"
            itemClass="carousel-item-padding-40-px"
          >
            {similarArray.map((movie, index) => (
              <Link
                to={`/${type}/${movie.id}`}
                onClick={() => window.scrollTo(0, 0)}
                key={index}
              >
                <div className="flex flex-col items-center text-center pt-6 m-2">
                  <img
                    className="w-40 h-60 rounded-lg object-cover mb-2 hover:scale-105"
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                        : NoImage
                    }
                    alt={movie.title || movie.name}
                  />
                  <p className="font-bold">{movie.title || movie.name}</p>
                  <p className="text-sm text-slate-500">
                    {formatDate(movie.release_date)}
                  </p>
                </div>
              </Link>
            ))}
          </Carousel>
        </div>

        {/* Recommendations Section */}
        <div className="mt-8">
          <h2 className="text-3xl">
            {recommendationsArray.length ? "Recommendations" : ""}
          </h2>
          <Carousel
            responsive={responsive}
            swipeable
            draggable
            showDots={false}
            autoPlay={false}
            infinite={false}
            containerClass="carousel-container"
            itemClass="carousel-item-padding-40-px"
          >
            {recommendationsArray.map((movie, index) => (
              <Link
                to={`/${type}/${movie.id}`}
                onClick={() => window.scrollTo(0, 0)}
                key={index}
              >
                <div className="flex flex-col items-center text-center pt-6 m-2">
                  <img
                    className="w-40 h-60 rounded-lg object-cover mb-2 hover:scale-105"
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                        : NoImage
                    }
                    alt={movie.title || movie.name}
                  />
                  <p className="font-bold">{movie.title || movie.name}</p>
                  <p className="text-sm text-slate-500">
                    {formatDate(movie.release_date)}
                  </p>
                </div>
              </Link>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default ContentDetails;
