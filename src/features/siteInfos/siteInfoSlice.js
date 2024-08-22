import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSiteInfos = createAsyncThunk(
  "infos/fetchSiteInfos",
  async (languageCode) => {
    const apiUrl = `https://innab.coder.az/api/${languageCode}/get_siteinfo`;
    const response = await axios.get(apiUrl);
    return response.data.data;
  }
);

const SiteInfoSlice = createSlice({
  name: "infos",
  initialState: {
    infos: [],
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
        state.error = action.error.message;
      });
  },
});

export default SiteInfoSlice.reducer;
