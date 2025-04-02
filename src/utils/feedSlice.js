import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeFeed: () => null,
    removeFeedByUser: (state, action) => {
      const newArray = state.filter((value) => value._id !== action.payload);
      return newArray;
    },
  },
});

export const { addFeed, removeFeed, removeFeedByUser } = feedSlice.actions;

export default feedSlice.reducer;
