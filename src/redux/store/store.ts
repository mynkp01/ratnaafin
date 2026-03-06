import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import rootReducer from "./rootReducer";

const reducers = combineReducers(rootReducer);

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const persistConfig = {
  key: "root",
  storage,
  // Optimize persistence to reduce main thread blocking
  throttle: 1000, // Throttle writes to 1 second
  serialize: false, // Skip serialization for better performance
  writeFailHandler: (err) => {
    console.warn('Redux persist write failed:', err);
  },
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NEXT_PUBLIC_NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export const useAppDispatch = useDispatch;
