export const selectFavorites = (state) => state.favorites.items;
export const selectFavoritesStatus = (state) => state.favorites.status;
export const selectFavoritesError = (state) => state.favorites.error;
export const selectIsGlobalLoading = (state) => {
  return (
    state.teachers.isLoading ||
    state.auth.isLoading ||
    state.favorites.isLoading
  );
};
