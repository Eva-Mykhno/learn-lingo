import { configureStore } from "@reduxjs/toolkit";
import { teachersReducer } from "./teachers/slice";

const store = configureStore({
  reducer: {
    teachers: teachersReducer,
  },
});

export default store;
