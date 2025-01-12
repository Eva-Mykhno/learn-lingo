import { createSelector } from "@reduxjs/toolkit";

export const selectTeachers = (state) => state.teachers.items;
export const selectIsLoading = (state) => state.teachers.isLoading;
export const selectError = (state) => state.teachers.error;
export const selectFilters = (state) => state.teachers.filters;
export const selectCurrentPrice = (state) => state.teachers.filters.price;
export const selectFavorites = (state) => state.teachers.favorites;

export const selectFilteredTeachers = createSelector(
  [selectTeachers, selectFilters],
  (teachers, filters) => {
    return teachers.filter((teacher) => {
      const matchesLanguage =
        !filters.language || teacher.languages.includes(filters.language);
      const matchesLevel =
        !filters.level || teacher.levels.includes(filters.level);
      const matchesPrice =
        !filters.price || teacher.price_per_hour === filters.price;

      return matchesLanguage && matchesLevel && matchesPrice;
    });
  }
);

export const selectFavoriteTeachers = createSelector(
  [selectTeachers, selectFavorites],
  (teachers, favorites) =>
    teachers.filter((teacher) => favorites.includes(teacher.id))
);
