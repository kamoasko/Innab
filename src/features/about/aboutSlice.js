import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";

export const fetchAboutCards = createAsyncThunk(
  "about/fetchAboutCards",
  async (lang, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/${lang}/get_about`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
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
