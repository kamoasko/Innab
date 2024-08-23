import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./features/blog/blogSlice";
import languageReducer from "./features/languages/languageSlice";
import aboutReducer from "./features/about/aboutSlice";
import privacyReducer from "./features/privacy/privacySlicer";
import corporativeReducer from "./features/corporative/corporativeSlice";
import vacanciesReducer from "./features/vacancies/vacanciesSlice";
import statisticReducer from "./features/statistics/statisticSlice";
import categoryReducer from "./features/categories/categorySlice";
import roomReducer from "./features/rooms/roomSlice";
import SiteReducer from "./features/siteInfos/siteInfoSlice";
import videoLessonReducer from "./features/videoLessons/videoLessonSlice";

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    languages: languageReducer,
    about: aboutReducer,
    privacy: privacyReducer,
    corporative: corporativeReducer,
    vacancies: vacanciesReducer,
    statistics: statisticReducer,
    infos: SiteReducer,
    categories: categoryReducer,
    rooms: roomReducer,
    videos: videoLessonReducer,
  },
});

export default store;
