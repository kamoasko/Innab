import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBlogPosts = createAsyncThunk(
  "blog/fetchBlogPosts",
  async (languageCode) => {
    const apiUrl = `https://innab.coder.az/api/${languageCode}/get_blog/5`;
    const response = await axios.get(apiUrl);
    return response.data.data;
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchBlogPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default blogSlice.reducer;
