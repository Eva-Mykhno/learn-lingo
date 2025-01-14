import { createSelector } from "@reduxjs/toolkit";

export const selectTeachers = (state) => state.teachers.teachers;
export const selectIsLoading = (state) => state.teachers.isLoading;
export const selectError = (state) => state.teachers.error;
export const selectFilters = (state) => state.teachers.filters;
export const selectCurrentPrice = (state) =>
  state.teachers.filters.price_per_hour;

export const selectFilteredTeachers = createSelector(
  [selectTeachers, selectFilters],
  (teachers, filters) => {
    return teachers.filter((teacher) => {
      const matchesLanguage =
        !filters.language || teacher.languages.includes(filters.language);
      const matchesLevel =
        !filters.level || teacher.levels.includes(filters.level);
      const matchesPrice =
        filters.price_per_hour === null ||
        teacher.price_per_hour === filters.price_per_hour;

      return matchesLanguage && matchesLevel && matchesPrice;
    });
  }
);
