import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export const fetchEvent = createAsyncThunk<any, any, any>(
  "event/fetchEvent",
  async (eventId: string, { rejectWithValue }) => {
    try {
      const res = await fetch(`${eventId}`);
      const data = await res.json();
      return data;
    } catch (err) {
      if (typeof err === "string") return rejectWithValue(err);
    }
  }
);

interface EventState {
  event: Event;
  error: string | null;
  isLoading: boolean;
}

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
  extraReducers: {
    [fetchEvent.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchEvent.fulfilled.type]: (state, action: PayloadAction<Event>) => {
      state.event = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [fetchEvent.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { reducer: eventReducer } = eventSlice;
