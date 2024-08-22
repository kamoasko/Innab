import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./features/blog/blogSlice";
import languageReducer from "./features/languages/languageSlice";
import aboutReducer from "./features/about/aboutSlice";
import privacyReducer from "./features/privacy/privacySlicer";
import corporativeReducer from "./features/corporative/corporativeSlice";
import vacanciesReducer from "./features/vacancies/vacanciesSlice";
import statisticReducer from "./features/statistics/statisticSlice";
import siteInfoReducer from "./features/siteInfos/siteInfoSlice";

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    languages: languageReducer,
    about: aboutReducer,
    privacy: privacyReducer,
    corporative: corporativeReducer,
    vacancies: vacanciesReducer,
    statistics: statisticReducer,
    infos: siteInfoReducer,
  },
});

export default store;
