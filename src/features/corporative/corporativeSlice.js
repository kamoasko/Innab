import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";

export const fetchCorporativeDatas = createAsyncThunk(
  "corporative/fetchCorporativeDatas",
  async (lang, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/${lang}/get_corporative`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
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
