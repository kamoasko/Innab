import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./features/languages/languageSlice";
import aboutReducer from "./features/about/aboutSlice";
import privacyReducer from "./features/privacy/privacySlicer";
import corporativeReducer from "./features/corporative/corporativeSlice";
import vacanciesReducer from "./features/vacancies/vacanciesSlice";
import statisticReducer from "./features/statistics/statisticSlice";
import roomReducer from "./features/rooms/roomSlice";
import newsReducer from "./features/news/newsSlice";
import partnersReducer from "./features/partners/partnersSlice";
import customerReducer from "./features/customers/customerSlice";
import projectReducer from "./features/project/projectSlice";
import useTranslation from "./hooks/translation/useTranslation";

export const store = configureStore({
  reducer: {
    languages: languageReducer,
    about: aboutReducer,
    privacy: privacyReducer,
    corporative: corporativeReducer,
    vacancies: vacanciesReducer,
    statistics: statisticReducer,
    rooms: roomReducer,
    news: newsReducer,
    partners: partnersReducer,
    customers: customerReducer,
    projects: projectReducer,
    translations: useTranslation,
  },
});

export default store;
