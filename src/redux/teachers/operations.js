import { createAsyncThunk } from "@reduxjs/toolkit";
import { database } from "../../config/firebaseConfig.js";
import { ref, get } from "firebase/database";

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async (_, thunkAPI) => {
    try {
      const teachersRef = ref(database, "teachers"); // Шлях до колекції 'teachers'
      const snapshot = await get(teachersRef);
      if (snapshot.exists()) {
        const teachers = snapshot.val();
        // Перетворюємо об'єкт у масив
        return Object.entries(teachers).map(([id, data]) => ({ id, ...data }));
      } else {
        return [];
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
