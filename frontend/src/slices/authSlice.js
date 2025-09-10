import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: null,
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    clearEmail: (state) => {
      state.email = "";
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state, action) => {
      state.token = "";
    },
  },
});

export const { setEmail, clearEmail, setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
