import {
  combineReducers,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Event {
  id: number;
  title: string;
  release_date: string;
  runtime: number;
  mpaa_rating: string;
  description: string;
  image: string;
  genres: Genres[];
}

interface Genres {
  checked: boolean;
  genre: string;
  id: number;
}

interface Genre {
  id: number;
  genre: string;
}

interface GenresState {
  genres: Genre[];
}

interface EventState {
  event: Event;
  error: string | null;
  isLoading: boolean;
}

export const fetchEvent = createAsyncThunk<Event, string | undefined, any>(
  "event/fetchEvent",
  async (eventId: string | undefined, { rejectWithValue }) => {
    try {
      const res = await fetch(`${eventId}`);
      const data = await res.json();
      return data;
    } catch (err) {
      if (typeof err === "string") return rejectWithValue(err);
    }
  }
);

export const fetchGenres = createAsyncThunk<Genre[]>(
  "genres/fetchGenres",
  async () => {
    const response = await fetch("/genres");
    const data = await response.json();
    return data;
  }
);

const initialState: EventState = {
  event: {
    id: 0,
    title: "",
    release_date: "",
    runtime: 0,
    mpaa_rating: "",
    description: "",
    image: "",
    genres: [],
  },
  error: null,
  isLoading: false,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchEvent.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        fetchEvent.fulfilled,
        (state: any, action: PayloadAction<Event>) => {
          state.event = action.payload;
          state.isLoading = false;
          state.error = null;
        }
      )
      .addCase(
        fetchEvent.rejected,
        (state: any, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

const genresInitialState: GenresState = {
  genres: [],
};

const genresSlice = createSlice({
  name: "genres",
  initialState: genresInitialState,
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

const fetchEventReducer = combineReducers({
  event: eventSlice.reducer,
  genres: genresSlice.reducer,
});

export const selectCurrentEvent = (state: RootState) => state.fetchEvent.event;
export const selectGenres = (state: RootState) => state.fetchEvent.genres;

export default fetchEventReducer;
