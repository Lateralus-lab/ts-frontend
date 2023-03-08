import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = [];

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.push(action.payload);
    },
  },
});

export default eventSlice.reducer;
