import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, database } from "../../config/firebaseConfig";
import { ref, set } from "firebase/database";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      // Регистрация нового пользователя
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      const user = userCredential.user;

      // Сохранение данных пользователя в Firebase Realtime Database
      const userRef = ref(database, "users/" + user.uid);
      await set(userRef, {
        uid: user.uid,
        name: userData.name,
        email: userData.email,
      });

      // Автоматический логин после регистрации
      await signInWithEmailAndPassword(auth, userData.email, userData.password);

      // Возвращаем данные пользователя
      return { uid: user.uid, name: userData.name, email: userData.email };
    } catch (error) {
      console.error("Firebase Error:", error);

      // Проверка на ошибку
      return thunkAPI.rejectWithValue({
        code: error.code,
        message: error.message,
      });
    }
  }
);

// Логин пользователя
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      const user = userCredential.user;
      return { uid: user.uid, email: user.email };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Логаут пользователя
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
