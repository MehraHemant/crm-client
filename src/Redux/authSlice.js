import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dependency: false,
  leadDependecy: false,
  user: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setDependency: function (state, action) {
      state.dependency = !state.dependency;
    },
    setUser: function (state, action) {
      state.user = action.payload;
    },
    setLeadDependency: function (state, action) {
      state.leadDependecy = !state.leadDependecy
    }
  },
});

export const { setUser, setDependency, setLeadDependecy } = authSlice.actions;
export default authSlice.reducer;
