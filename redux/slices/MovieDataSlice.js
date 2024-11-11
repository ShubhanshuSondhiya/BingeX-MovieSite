/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const trending = createAsyncThunk("fetchTrending", async () => {
  try {
    const [day, week] = await Promise.all([
      axios.get(
        "https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=" +
          import.meta.env.VITE_TMDB_API_KEY
      ),
      axios.get(
        "https://api.themoviedb.org/3/trending/movie/week?language=en-US&api_key=" +
          import.meta.env.VITE_TMDB_API_KEY
      ),
    ]);
    return {
      trendingByDay: day.data.results,
      trendingByWeek: week.data.results,
    };
  } catch (err) {
    return err;
  }
});
export const popular = createAsyncThunk("fetchPopular", async () => {
  try {
    const [movies, TVshows] = await Promise.all([
      axios.get(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=" +
          import.meta.env.VITE_TMDB_API_KEY
      ),
      axios.get(
        "https://api.themoviedb.org/3/tv/popular?language=en-US&api_key=" +
          import.meta.env.VITE_TMDB_API_KEY
      ),
    ]);
    return {
      popularMovies: movies.data.results,
      popularTVShows: TVshows.data.results,
    };
  } catch (err) {
    return err;
  }
});
export const topRated = createAsyncThunk("fetchTopRated", async () => {
  try {
    const [movies, TVshows] = await Promise.all([
      axios.get(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&api_key=" +
          import.meta.env.VITE_TMDB_API_KEY
      ),
      axios.get(
        "https://api.themoviedb.org/3/tv/top_rated?language=en-US&api_key=" +
          import.meta.env.VITE_TMDB_API_KEY
      ),
    ]);
    return {
      topRatedMovies: movies.data.results,
      topRatedTVShows: TVshows.data.results,
    };
  } catch (err) {
    return err;
  }
});
export const search = createAsyncThunk("fetchSearch", async (inputText) => {
  try {
    const [movies, TVshows] = await Promise.all([
      axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${inputText}&api_key=` +
          import.meta.env.VITE_TMDB_API_KEY
      ),
      axios.get(
        `https://api.themoviedb.org/3/search/tv?query=${inputText}&api_key=` +
          import.meta.env.VITE_TMDB_API_KEY
      ),
    ]);
    return {
      searchMovies: movies.data.results,
      searchTVShows: TVshows.data.results,
    };
  } catch (err) {
    return err;
  }
});
export const genre = createAsyncThunk("fetchGenre", async () => {
  try {
    const [movies, TVshows] = await Promise.all([
      axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=` +
          import.meta.env.VITE_TMDB_API_KEY
      ),
      axios.get(
        `https://api.themoviedb.org/3/genre/tv/list?language=en-US&api_key=` +
          import.meta.env.VITE_TMDB_API_KEY
      ),
    ]);
    return {
      genreMovies: movies.data.genres,
      genreTV: TVshows.data.genres,
    };
  } catch (err) {
    return err;
  }
});
export const credits = createAsyncThunk("fetchCredits", async ({type,id}) => {
  try {
    const cast = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/credits?language=en-US&api_key=` +
        import.meta.env.VITE_TMDB_API_KEY
    );

    return {
      allCredits: cast.data,
    };
  } catch (err) {
    return err;
  }
});
export const videos = createAsyncThunk("fetchVideos", async ({type,id}) => {
  try {
    const vid = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US&api_key=` +
        import.meta.env.VITE_TMDB_API_KEY
    );

    return {
      videos: vid.data.results,
    };
  } catch (err) {
    return err;
  }
});
export const recommendations = createAsyncThunk("fetchRecommendations", async ({type,id}) => {
  try {
    const recommended = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/recommendations?language=en-US&api_key=` +
        import.meta.env.VITE_TMDB_API_KEY
    );

    return {
      recommendation: recommended.data.results,
    };
  } catch (err) {
    return err;
  }
});
export const similar = createAsyncThunk("fetchSimilar", async ({type,id}) => {
  try {
    const similar = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/similar?language=en-US&api_key=` +
        import.meta.env.VITE_TMDB_API_KEY
    );

    return {
      simi: similar.data.results,
    };
  } catch (err) {
    return err;
  }
});

const movieDataSlice = createSlice({
  name: "movie",
  initialState: {
    trendingByDay: [],
    trendingByWeek: [],
    popularMovies: [],
    popularTVShows: [],
    topRatedMovies: [],
    topRatedTVShows: [],
    searchMovies: [],
    searchTVShows: [],
    genreMovies: [],
    genreTV: [],
    creditsArray:[],
    videosArray:[],
    recommendationsArray:[],
    similarArray:[],
    loading: false,
    error: false,
  },
  extraReducers: (builder) => {
    builder
      // Trending actions
      .addCase(trending.fulfilled, (state, action) => {
        state.trendingByDay = action.payload.trendingByDay;
        state.trendingByWeek = action.payload.trendingByWeek;
        state.loading = false; 
        state.error = false;  
      })
      .addCase(trending.pending, (state) => {
        state.loading = true;
        state.error = false; 
      })
      .addCase(trending.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
  
      // Popular actions
      .addCase(popular.fulfilled, (state, action) => {
        state.popularMovies = action.payload.popularMovies;
        state.popularTVShows = action.payload.popularTVShows;
        state.loading = false;
        state.error = false;
      })
      .addCase(popular.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(popular.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
  
      // Top Rated actions
      .addCase(topRated.fulfilled, (state, action) => {
        state.topRatedMovies = action.payload.topRatedMovies;
        state.topRatedTVShows = action.payload.topRatedTVShows;
        state.loading = false;
        state.error = false;
      })
      .addCase(topRated.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(topRated.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
  
      // Search actions
      .addCase(search.fulfilled, (state, action) => {
        state.searchMovies = action.payload.searchMovies;
        state.searchTVShows = action.payload.searchTVShows;
        state.loading = false;
        state.error = false;
      })
      .addCase(search.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(search.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
  
      // Genre actions
      .addCase(genre.fulfilled, (state, action) => {
        state.genreMovies = action.payload.genreMovies;
        state.genreTV = action.payload.genreTV;
        state.loading = false;
        state.error = false;
      })
      .addCase(genre.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(genre.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      // Cast actions
      .addCase(credits.fulfilled, (state, action) => {
        state.creditsArray = action.payload.allCredits;
        state.loading = false;
        state.error = false;
      })
      .addCase(credits.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(credits.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      // Videos actions
      .addCase(videos.fulfilled, (state, action) => {
        state.videosArray = action.payload.videos;
        state.loading = false;
        state.error = false;
      })
      .addCase(videos.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(videos.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      // Recommendation actions
      .addCase(recommendations.fulfilled, (state, action) => {
        state.recommendationsArray = action.payload.recommendation;
        state.loading = false;
        state.error = false;
      })
      .addCase(recommendations.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(recommendations.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      // Similar actions
      .addCase(similar.fulfilled, (state, action) => {
        state.similarArray = action.payload.simi;
        state.loading = false;
        state.error = false;
      })
      .addCase(similar.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(similar.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default movieDataSlice.reducer;
