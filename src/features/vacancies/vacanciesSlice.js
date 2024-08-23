import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";

export const fetchVacancies = createAsyncThunk(
  "vacancies/fetchVacancies",
  async (lang, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/${lang}/get_vacancy`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const vacanciesSlice = createSlice({
  name: "vacancies",
  initialState: {
    vacancies: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacancies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVacancies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vacancies = action.payload;
      })
      .addCase(fetchVacancies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default vacanciesSlice.reducer;
