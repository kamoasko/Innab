import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";

export const fetchVideoLessons = createAsyncThunk(
  "videos/fetchVideoLessons",
  async ({ lang, categoryId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/${lang}/get_videolessons/${categoryId}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const videoLessonSlice = createSlice({
  name: "videos",
  initialState: {
    videos: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideoLessons.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVideoLessons.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.videos = action.payload;
      })
      .addCase(fetchVideoLessons.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default videoLessonSlice.reducer;
