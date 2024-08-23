import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";

export const fetchPrivacyData = createAsyncThunk(
  "privacy/fetchPrivacyData",
  async (lang, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/${lang}/get_privacy`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const privacySlice = createSlice({
  name: "privacy",
  initialState: {
    privacy: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrivacyData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPrivacyData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.privacy = action.payload;
      })
      .addCase(fetchPrivacyData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default privacySlice.reducer;
