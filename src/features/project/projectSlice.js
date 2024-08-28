import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (lang, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/${lang}/get_projects`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProjectContent = createAsyncThunk(
  "projects/fetchProjectContent",
  async ({ lang, projectSlug }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/${lang}/get_project/${projectSlug}`
      );
      console.log(response);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    projectContent: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProjectContent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjectContent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projectContent = action.payload;
      })
      .addCase(fetchProjectContent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default projectSlice.reducer;
