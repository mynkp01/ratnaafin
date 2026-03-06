import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    logout: () => {
      return initialState;
    },
  },
  selectors: {
    selectUser: (state) => state.user,
  },
});

export const { setUser, logout } = authSlice.actions;

export const { selectUser } = authSlice.selectors;

export default authSlice.reducer;
