import { configureStore } from "@reduxjs/toolkit";
import privacyReducer from "./features/privacy/privacySlicer";
import corporativeReducer from "./features/corporative/corporativeSlice";
import vacanciesReducer from "./features/vacancies/vacanciesSlice";
import roomReducer from "./features/rooms/roomSlice";
import newsReducer from "./features/news/newsSlice";
import partnersReducer from "./features/partners/partnersSlice";
import customerReducer from "./features/customers/customerSlice";
import useTranslation from "./hooks/translation/useTranslation";

export const store = configureStore({
  reducer: {
    privacy: privacyReducer,
    corporative: corporativeReducer,
    vacancies: vacanciesReducer,
    rooms: roomReducer,
    news: newsReducer,
    partners: partnersReducer,
    customers: customerReducer,
    translations: useTranslation,
  },
});

export default store;
