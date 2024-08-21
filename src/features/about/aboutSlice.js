import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAboutCards = createAsyncThunk(
  "about/fetchAboutCards",
  async (languageCode) => {
    const apiUrl = `https://innab.coder.az/api/${languageCode}/get_about`;
    const response = await axios.get(apiUrl);

    return response.data.data;
  }
);

const aboutSlice = createSlice({
  name: "about",
  initialState: {
    about: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutCards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAboutCards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.about = action.payload;
      })
      .addCase(fetchAboutCards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default aboutSlice.reducer;
