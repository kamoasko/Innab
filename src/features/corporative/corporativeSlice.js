import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCorporativeDatas = createAsyncThunk(
  "corporative/fetchCorporativeDatas",
  async (languageCode) => {
    const apiUrl = `https://innab.coder.az/api/${languageCode}/get_corporative`;
    const response = await axios.get(apiUrl);
    return response.data.data;
  }
);

const corporativeSlice = createSlice({
  name: "corporative",
  initialState: {
    corporative: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCorporativeDatas.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCorporativeDatas.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.corporative = action.payload;
      })
      .addCase(fetchCorporativeDatas.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default corporativeSlice.reducer;
