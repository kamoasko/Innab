import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";

export const fetchBlogCategory = createAsyncThunk(
  "blogCategories/fetchBlogCategory",
  async ({ lang }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/${lang}/get_blogcategory`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const blogCategorySlice = createSlice({
  name: "blogCategories",
  initialState: {
    blogCategories: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogCategories = action.payload;
      })
      .addCase(fetchBlogCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default blogCategorySlice.reducer;
