// import { configureStore } from "@reduxjs/toolkit";
// import { teachersReducer } from "./teachers/slice";
// import { authReducer } from "./auth/slice";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // Используем localStorage

// // Конфигурация для redux-persist
// const persistConfig = {
//   key: "teachers",
//   storage,
//   whitelist: ["favorites", "items"], // Сохраняем избранное и список учителей
// };

// // Применяем persistReducer для редьюсера teachers
// const persistedReducer = persistReducer(persistConfig, teachersReducer);

// const store = configureStore({
//   reducer: {
//     teachers: persistedReducer,
//     auth: authReducer,
//   },
//   // Отключаем проверку сериализации для действий, связанных с redux-persist
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: ["persist/PERSIST"], // Игнорируем проверку сериализации для этих экшенов
//         ignoredPaths: ["register"], // Можешь указать путь, если нужно игнорировать определенные данные
//       },
//     }),
// });

// const persistor = persistStore(store);

// export { store, persistor };

import { configureStore } from "@reduxjs/toolkit";
import { teachersReducer } from "./teachers/slice";
import { authReducer } from "./auth/slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Используем localStorage

// Конфигурация для redux-persist для teachers
const teachersPersistConfig = {
  key: "teachers",
  storage,
  whitelist: ["favorites", "items"], // Сохраняем избранное и список учителей
};

// Конфигурация для redux-persist для auth
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["isAuthenticated", "user"], // Сохраняем только данные авторизации
};

// Применяем persistReducer для редьюсеров
const persistedTeachersReducer = persistReducer(
  teachersPersistConfig,
  teachersReducer
);
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const store = configureStore({
  reducer: {
    teachers: persistedTeachersReducer,
    auth: persistedAuthReducer,
  },
  // Отключаем проверку сериализации для действий, связанных с redux-persist
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: ["register"], // Можешь указать путь, если нужно игнорировать определенные данные
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
