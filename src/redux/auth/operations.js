import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../config/firebaseConfig.js";
import { getDatabase, ref, set } from "firebase/database";
import { resetFavorites } from "../favorites/slice.js";

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ email, password, name }, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });

      const db = getDatabase();
      await set(ref(db, `users/${user.uid}`), {
        email: user.email,
        displayName: name,
        favorites: [],
      });

      return {
        email: user.email,
        displayName: name,
        uid: user.uid,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to register");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/logIn",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      return {
        email: user.email,
        displayName: user.displayName,
        uid: user.uid,
      };
    } catch {
      return thunkAPI.rejectWithValue("Invalid email or password");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logOut",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
      thunkAPI.dispatch(resetFavorites());
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to log out");
    }
  }
);

export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, thunkAPI) => {
    try {
      return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            resolve({
              email: user.email,
              displayName: user.displayName,
              uid: user.uid,
              token: await user.getIdToken(),
            });
          } else {
            reject(thunkAPI.rejectWithValue("No user found"));
          }
        });
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to refresh user"
      );
    }
  }
);
