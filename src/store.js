import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import privacyReducer from "./features/privacy/privacySlicer";
import corporativeReducer from "./features/corporative/corporativeSlice";
import vacanciesReducer from "./features/vacancies/vacanciesSlice";
import roomReducer from "./features/rooms/roomSlice";
// import newsReducer from "./features/news/newsSlice";
import partnersReducer from "./features/partners/partnersSlice";
import customerReducer from "./features/customers/customerSlice";

const persistConfig = {
  key: "innab-store",
  storage,
};

const rootReducer = combineReducers({
  privacy: privacyReducer,
  corporative: corporativeReducer,
  vacancies: vacanciesReducer,
  rooms: roomReducer,
  // news: newsReducer,
  partners: partnersReducer,
  customers: customerReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
