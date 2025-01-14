import { configureStore } from "@reduxjs/toolkit";
import { teachersReducer } from "./teachers/slice";
import { authReducer } from "./auth/slice.js";
import { favoritesReducer } from "./favorites/slice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoritesReducer,
    teachers: teachersReducer,
  },
});
export default store;
