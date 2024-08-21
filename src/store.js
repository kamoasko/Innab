import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./features/blog/blogSlice";
import languageReducer from "./features/languages/languageSlice";

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    languages: languageReducer,
  },
});

export default store;
