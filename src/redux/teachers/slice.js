import { createSlice } from "@reduxjs/toolkit";
import { fetchTeachers } from "./operations.js";

const initialState = {
  items: [], // Список учителів
  isLoading: false, // Стан завантаження
  error: null, // Помилка, якщо вона є
};

const teachersSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {}, // Якщо потрібно, можна додати інші редуктори
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload; // Зберігаємо список учителів
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const teachersReducer = teachersSlice.reducer;
