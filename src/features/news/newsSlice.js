import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async ({ lang, slug = null }, { rejectWithValue }) => {
    try {
      let endpoint = `/${lang}/get_news`;
      if (slug) {
        endpoint += `/${slug}`;
      }
      const response = await axiosInstance.get(endpoint);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    news: [],
    detailedNews: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload.length) {
          state.news = action.payload;
          state.detailedNews = null;
        } else {
          state.detailedNews = action.payload;
        }
      })
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default newsSlice.reducer;
