import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teachers: [],
  isLoading: false,
  error: null,
  filters: {
    language: "",
    level: "",
    price_per_hour: null,
  },
};

const teachersSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    setTeachers(state, action) {
      state.teachers = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setFilter(state, action) {
      const { name, value } = action.payload;
      state.filters[name] = value;
    },
    resetFilters(state) {
      state.filters = {
        language: "",
        level: "",
        price_per_hour: null,
      };
    },
  },
});

export const { setTeachers, setLoading, setError, setFilter, resetFilters } =
  teachersSlice.actions;
export const teachersReducer = teachersSlice.reducer;
