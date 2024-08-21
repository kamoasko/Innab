import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./features/blog/blogSlice";
import languageReducer from "./features/languages/languageSlice";
import aboutReducer from "./features/about/aboutSlice";
import privacyReducer from "./features/privacy/privacySlicer";

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    languages: languageReducer,
    about: aboutReducer,
    privacy: privacyReducer,
  },
});

export default store;
