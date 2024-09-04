import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  translations: {},
  loading: false,
  error: null,
};

export const fetchTranslations = createAsyncThunk(
  "translations/fetchTranslations",
  async ({ lang, group, keyword }) => {
    const url = `https://admin.innab.coder.az/api/${lang}/get_translate?group=${group}&keyword=${keyword}`;
    const response = await axios.get(url);
    return response.data.data.value;
  }
);

const translationsSlice = createSlice({
  name: "translations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTranslations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTranslations.fulfilled, (state, action) => {
        state.loading = false;
        state.translations[`${group}-${keyword}`] = action.payload;
      })
      .addCase(fetchTranslations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default translationsSlice.reducer;
