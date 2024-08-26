import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";

export const fetchVideoLessonCategory = createAsyncThunk(
  "videoCategories/fetchVideoLessonCategory",
  async ({ lang }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/${lang}/get_videolessonscategory`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const videoCategorySlice = createSlice({
  name: "videoCategories",
  initialState: {
    categories: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideoLessonCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchVideoLessonCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVideoLessonCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default videoCategorySlice.reducer;
