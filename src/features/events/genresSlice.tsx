import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Genre {
  id: number;
  genre: string;
}

interface GenresState {
  genres: Genre[];
}

const initialState: GenresState = {
  genres: [],
};

export const fetchGenres = createAsyncThunk<Genre[]>(
  "fetchGenres",
  async () => {
    const response = await fetch("/genres");
    const data = await response.json();
    return data;
  }
);

const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchGenres.fulfilled,
      (state, action: PayloadAction<Genre[]>) => {
        state.genres = action.payload;
      }
    );
  },
});

export const selectGenres = (state: RootState) => state.genres;

export default genresSlice.reducer;
