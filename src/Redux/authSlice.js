import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dependency: false,
  leadDependency: false,
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
      state.leadDependency = !state.leadDependency
    }
  },
});

export const { setUser, setDependency, setLeadDependency } = authSlice.actions;
export default authSlice.reducer;
