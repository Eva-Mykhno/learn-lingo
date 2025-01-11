export const selectTeachers = (state) => state.teachers.items;
export const selectIsLoading = (state) => state.teachers.isLoading;
export const selectError = (state) => state.teachers.error;

export const selectFilteredTeachers = (state) => {
  const { items, filters } = state.teachers;
  return items.filter((teacher) => {
    const matchesLanguage =
      !filters.language || teacher.languages.includes(filters.language);
    const matchesLevel =
      !filters.level || teacher.levels.includes(filters.level);
    const matchesPrice =
      !filters.price || teacher.price_per_hour === filters.price;

    return matchesLanguage && matchesLevel && matchesPrice;
  });
};
