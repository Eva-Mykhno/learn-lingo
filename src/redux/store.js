import { configureStore } from "@reduxjs/toolkit";
import { teachersReducer } from "./teachers/slice";
import { authReducer } from "./auth/slice";

// Настройка мидлваров напрямую в конфиге store
const store = configureStore({
  reducer: {
    teachers: teachersReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "auth/registerUser/rejected",
          "auth/loginUser/rejected",
        ],
      },
    }),
});

export default store;
