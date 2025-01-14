import { get, getDatabase, ref, set } from "firebase/database";
import { setFavorites } from "./slice.js";

export const fetchFavorites = (userId) => async (dispatch) => {
  try {
    const db = getDatabase();
    const favoritesRef = ref(db, `users/${userId}/favorites`);
    const snapshot = await get(favoritesRef);

    if (snapshot.exists()) {
      const favorites = snapshot.val();
      dispatch(setFavorites(favorites || []));
    } else {
      dispatch(setFavorites([]));
    }
  } catch (error) {
    console.error("Error loading favorites from Firebase:", error);
    dispatch(setFavorites([]));
  }
};

export const saveFavorites = (userId, favorites) => async () => {
  try {
    const db = getDatabase();
    const favoritesRef = ref(db, `users/${userId}/favorites`);
    await set(favoritesRef, favorites);
  } catch (error) {
    console.error("Error saving favorites to Firebase:", error);
  }
};
