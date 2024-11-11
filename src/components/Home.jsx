/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  genre,
  popular,
  topRated,
  trending,
} from "../../redux/slices/MovieDataSlice";
import Hero from "./Hero";
import HomeMovieCards from "./HomeMovieCards";
import "../App.css";
const Home = () => {
  const dispatch = useDispatch();
  const {
    trendingByDay,
    trendingByWeek,
    popularMovies,
    popularTVShows,
    topRatedMovies,
    topRatedTVShows,
    genreMovies,
    genreTV,
  } = useSelector((state) => {
    return state.movieReducer;
  });
  useEffect(() => {
    dispatch(trending());
  }, [dispatch]);

  useEffect(() => {
    dispatch(popular());
  }, [dispatch]);

  useEffect(() => {
    dispatch(topRated());
  }, [dispatch]);

  useEffect(() => {
    dispatch(genre());
  }, [dispatch]);

  return (
    <div className="bg-slate-950 text-white pb-7">
      <Hero
        trendingByDay={trendingByDay}
        trendingByWeek={trendingByWeek}
        popularMovies={popularMovies}
        popularTVShows={popularTVShows}
      />
      <HomeMovieCards
        heading="Trending"
        option1={trendingByDay}
        option2={trendingByWeek}
        choice1="Day"
        choice2="Week"
      />
      <HomeMovieCards
        heading="Popular"
        option1={popularMovies}
        option2={popularTVShows}
        choice1="Movies"
        choice2="TV Shows"
      />
      <HomeMovieCards
        heading="Top Rated"
        option1={topRatedMovies}
        option2={topRatedTVShows}
        choice1="Movies"
        choice2="TV Shows"
      />
    </div>
  );
};

export default Home;
