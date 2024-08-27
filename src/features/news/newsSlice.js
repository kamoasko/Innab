import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (lang, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/${lang}/get_news`);
      const sortedNews = response?.data.sort((a, b) => {
        // Sort by `pined`, if pined is null, treat it as 0 (false)
        return (b.pined ? 1 : 0) - (a.pined ? 1 : 0);
      });
      return sortedNews;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const fetchNewsDetail = createAsyncThunk(
  "news/fetchNewsDetail",
  async ({ lang, slug }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/${lang}/get_news/${slug}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    news: [],
    detailedNews: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.news = action.payload;
      })
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchNewsDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detailedNews = action.payload;
      })
      .addCase(fetchNewsDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNewsDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default newsSlice.reducer;