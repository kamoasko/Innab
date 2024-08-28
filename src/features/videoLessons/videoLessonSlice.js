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

export const fetchVideoLessonCategory = createAsyncThunk(
  "videos/fetchVideoLessonCategory",
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

export const fetchVideoLessonContent = createAsyncThunk(
  "videos/fetchVideoLessonContent",
  async ({ lang, videoSlug }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/${lang}/get_videolesson_content/${videoSlug}`
      );

      const links = response?.data?.map((link) => link.links);
      // console.log(links.flat(Infinity).map((a) => a.id));
      

      return {
        data: response?.data,
        links: links.flat(Infinity)[0],
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const videoLessonSlice = createSlice({
  name: "videos",
  initialState: {
    videos: [],
    videoCategories: [],
    videoLesson: [],
    links: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideoLessons.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.videos = action.payload;
      })
      .addCase(fetchVideoLessons.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVideoLessons.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchVideoLessonCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.videoCategories = action.payload;
      })
      .addCase(fetchVideoLessonCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVideoLessonCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchVideoLessonContent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.videoLesson = action.payload;
        state.links = action.payload;
      })
      .addCase(fetchVideoLessonContent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVideoLessonContent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default videoLessonSlice.reducer;
