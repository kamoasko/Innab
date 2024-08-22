import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchVacancies = createAsyncThunk(
  "vacancies/fetchVacancies",
  async (languageCode) => {
    const apiUrl = `https://innab.coder.az/api/${languageCode}/get_vacancy`;
    const response = await axios.get(apiUrl);
    return response.data.data;
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
