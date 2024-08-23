import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";

export const fetchSiteInfos = createAsyncThunk(
  "siteInfos/fetchSiteInfos",
  async (lang, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/${lang}/get_siteinfo`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const siteInfosSlice = createSlice({
  name: "siteInfos",
  initialState: {
    infos: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSiteInfos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSiteInfos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.infos = action.payload;
      })
      .addCase(fetchSiteInfos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default siteInfosSlice.reducer;
