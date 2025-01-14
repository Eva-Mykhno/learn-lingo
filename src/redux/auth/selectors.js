export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectError = (state) => state.auth.error;
