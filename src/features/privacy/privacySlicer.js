import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPrivacyData = createAsyncThunk(
  "privacy/fetchPrivacyData",
  async (languageCode) => {
    const apiUrl = `https://innab.coder.az/api/${languageCode}/get_privacy`;
    const response = await axios.get(apiUrl);
    return response.data.data;
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
