import { createSlice } from "@reduxjs/toolkit";

// Default state for authentication slice
const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
};

// Slice action and reducer
export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }
      state.token = action.payload;
    },
  },
});

// Export the actions and reducer
export const { setUser, setToken } = authSlice.actions;

export default authSlice.reducer; // -> module.exports = authSlice.reducer;

/*
  analogy in useState hook:

  const [user, setUser] = useState(null); -> user is the state, setUser is the action
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  setUser("userIni") -> userIni is the payload

*/
