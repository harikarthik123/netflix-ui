import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY, TMDB_BASE_URL } from "../utils/constants";
import axios from "axios";
import { db } from "../utils/firebase-config";
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc, setDoc } from "firebase/firestore";

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
};

export const getGenres = createAsyncThunk("netflix/genres", async () => {
  const { data: { genres } } = await axios.get(
    `${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  );
  return genres;
});

const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path) {
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
    }
  });
};

const getRawData = async (api, genres, paging) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const { data: { results }, } = await axios.get(
      `${api}${paging ? `&page=${i}` : ""}`
    );
    createArrayFromRawData(results, moviesArray, genres);
    return moviesArray; // moved outside loop so it returns after fetching all
  }
};

export const fetchMovies = createAsyncThunk(
  "netflix/trending",
  async ({ type }, thunkApi) => {
    const { netflix: { genres } } = thunkApi.getState();
    return  getRawData(
      `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
      genres,
      true
    );
    
  }
);

export const fetchTvShows = createAsyncThunk(
  "netflix/tvShows",
  async ({ type }, thunkApi) => {
    const { netflix: { genres } } = thunkApi.getState();
    return  getRawData(
      `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
      genres,
      true
    );
    
  }
);

export const fetchDataByGenre = createAsyncThunk(
  "netflix/moviesByGenres",
  async ({ genre,type }, thunkApi) => {
    const { netflix: { genres } } = thunkApi.getState();
    return  getRawData(
      `${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
      genres,
      false
    );
    
  }
);

export const getUserLikedMovies = createAsyncThunk(
  "netflix/getLikedMovies",
  async (email) => {
    const userDocRef = doc(db, "users", email);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return userDoc.data().likedMovies || [];
    } else {
      return [];
    }
  }
);

export const removeMovieFromLiked = createAsyncThunk(
  "netflix/deleteLikedMovie",
  async ({ movieId, email }) => {
    const userDocRef = doc(db, "users", email);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const likedMovies = userDoc.data().likedMovies;
      const updatedLikedMovies = likedMovies.filter((movie) => movie.id !== movieId);

      await updateDoc(userDocRef, {
        likedMovies: updatedLikedMovies,
      });
      return updatedLikedMovies;
    } else {
      return []; // No document, so no movies to remove
    }
  }
);

export const addMovieToLiked = createAsyncThunk(
  "netflix/addLikedMovie",
  async ({ email, movieData }) => {
    const userDocRef = doc(db, "users", email);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      await updateDoc(userDocRef, {
        likedMovies: arrayUnion(movieData),
      });
    } else {
      await setDoc(userDocRef, {
        likedMovies: [movieData],
      });
    }
    // After adding, fetch the updated list to keep state consistent
    const updatedUserDoc = await getDoc(userDocRef);
    return updatedUserDoc.data().likedMovies;
  }
);

export const fetchMoviesBySearch = createAsyncThunk(
  "netflix/search",
  async (query, thunkApi) => {
    try {
      const { netflix: { genres } } = thunkApi.getState();
      const { data: { results } } = await axios.get(
        `${TMDB_BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`
      );
      const moviesArray = [];
      createArrayFromRawData(results, moviesArray, genres);
      return moviesArray;
    } catch (error) {
      console.error("Error fetching movies by search:", error);
      return [];
    }
  }
);

export const NetflixSlice = createSlice({
  name: "Netflix",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchTvShows.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(getUserLikedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(addMovieToLiked.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchMoviesBySearch.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
  
});

export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
});
