import { configureStore } from "@reduxjs/toolkit";
// import blogReducer from "./features/blog/blogSlice";
import languageReducer from "./features/languages/languageSlice";
import aboutReducer from "./features/about/aboutSlice";
import privacyReducer from "./features/privacy/privacySlicer";
import corporativeReducer from "./features/corporative/corporativeSlice";
import vacanciesReducer from "./features/vacancies/vacanciesSlice";
import statisticReducer from "./features/statistics/statisticSlice";
import categoryReducer from "./features/categories/categorySlice";
import roomReducer from "./features/rooms/roomSlice";
// import SiteReducer from "./features/siteInfos/siteInfoSlice";
// import videoLessonReducer from "./features/videoLessons/videoLessonSlice";
// import blogCategoryReducer from "./features/blogCategories/blogCategorySlice";
import newsReducer from "./features/news/newsSlice";
import partnersReducer from "./features/partners/partnersSlice";
import customerReducer from "./features/customers/customerSlice";
import projectReducer from "./features/project/projectSlice";

export const store = configureStore({
  reducer: {
    // blog: blogReducer,/
    languages: languageReducer,
    about: aboutReducer,
    privacy: privacyReducer,
    corporative: corporativeReducer,
    vacancies: vacanciesReducer,
    statistics: statisticReducer,
    // infos: SiteReducer,
    categories: categoryReducer,
    rooms: roomReducer,
    // videos: videoLessonReducer,
    // videoCategories: videoCategoryReducer,
    // blogCategories: blogCategoryReducer,
    news: newsReducer,
    partners: partnersReducer,
    customers: customerReducer,
    projects: projectReducer,
  },
});

export default store;
