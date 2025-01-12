// import { createSlice } from "@reduxjs/toolkit";
// import { fetchTeachers } from "./operations.js";

// const initialState = {
//   items: [], // Список учителів
//   isLoading: false, // Стан завантаження
//   error: null,
//   filters: {
//     language: null,
//     level: null,
//     price: null,
//   },
//   favorites: [],
// };

// const teachersSlice = createSlice({
//   name: "teachers",
//   initialState,
//   reducers: {
//     setFilter(state, action) {
//       const { filterName, value } = action.payload;
//       state.filters[filterName] = value; // Обновляем фильтр
//     },
//     toggleFavorite(state, action) {
//       const teacherId = action.payload.id;

//       // Проверяем, есть ли уже учитель в избранных
//       if (state.favorites.includes(teacherId)) {
//         state.favorites = state.favorites.filter((id) => id !== teacherId); // Убираем из избранных
//         action.payload.isFavorite = false; // Меняем статус
//       } else {
//         state.favorites.push(teacherId); // Добавляем в избранные
//         action.payload.isFavorite = true; // Меняем статус
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTeachers.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchTeachers.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.items = action.payload; // Зберігаємо список учителів
//       })
//       .addCase(fetchTeachers.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { setFilter, toggleFavorite } = teachersSlice.actions;
// export const teachersReducer = teachersSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { fetchTeachers } from "./operations.js";

const initialState = {
  items: [], // Список учителей
  isLoading: false, // Состояние загрузки
  error: null, // Ошибки
  filters: {
    language: null,
    level: null,
    price: null,
  },
  favorites: [], // Храним ID избранных учителей
};

const teachersSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    setFilter(state, action) {
      const { filterName, value } = action.payload;
      state.filters[filterName] = value; // Обновляем значение фильтра
    },
    toggleFavorite(state, action) {
      const teacherId = action.payload;

      if (state.favorites.includes(teacherId)) {
        state.favorites = state.favorites.filter((id) => id !== teacherId);
      } else {
        state.favorites.push(teacherId);
      }

      // Синхронизация isFavorite
      state.items = state.items.map((teacher) =>
        teacher.id === teacherId
          ? { ...teacher, isFavorite: !teacher.isFavorite }
          : teacher
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.isLoading = false;
        // Убедимся, что у каждого учителя есть поле isFavorite
        state.items = action.payload.map((teacher) => ({
          ...teacher,
          isFavorite: teacher.isFavorite || false, // Добавляем isFavorite, если оно отсутствует
        }));
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilter, toggleFavorite } = teachersSlice.actions;
export const teachersReducer = teachersSlice.reducer;
