// src/redux/slices/languageSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLanguages = createAsyncThunk(
  "languages/fetchLanguages",
  async () => {
    const response = await axios.get("https://innab.coder.az/api/get_langs");
    return response.data.data;
  }
);

const languageSlice = createSlice({
  name: "languages",
  initialState: {
    languages: [],
    selectedLanguage: "az", // Default to Azerbaijani
    status: "idle",
    error: null,
  },
  reducers: {
    setLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLanguages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLanguages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.languages = action.payload;
      })
      .addCase(fetchLanguages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
