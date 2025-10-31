import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  darkMode: boolean;
}

const getInitialTheme = (): boolean => {
  const stored = localStorage.getItem("theme");
  if (stored) return stored === "dark";
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const initialState: ThemeState = {
  darkMode: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      console.log("Redux state changed to:", state.darkMode);
    },
    setDarkMode: (state, action: { payload: boolean }) => {
      state.darkMode = action.payload;
      console.log("Redux state set to:", state.darkMode);
    },
  },
});

export const { toggleDarkMode, setDarkMode } = themeSlice.actions;
export default themeSlice.reducer;