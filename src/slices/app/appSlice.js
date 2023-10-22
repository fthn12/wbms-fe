import { createSlice } from "@reduxjs/toolkit";

const dataLocalStorage = localStorage.getItem("app") ? JSON.parse(localStorage.getItem("app")) : {};

const initialState = {
  themeMode: dataLocalStorage?.themeMode ? dataLocalStorage.themeMode : "light",
  sidebar: dataLocalStorage?.sidebar
    ? dataLocalStorage.sidebar
    : {
        isCollapsed: false,
        selected: "Dashboard",
      },
  scanReader: dataLocalStorage?.scanReader
    ? dataLocalStorage.scanReader
    : {
        isOpen: false,
      },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setThemeMode: (state, action) => {
      const themeMode = action.payload;

      state.themeMode = themeMode;

      localStorage.setItem("app", JSON.stringify(state));
    },
    setSidebar: (state, action) => {
      const sidebar = action.payload;

      state.sidebar = { ...state.sidebar, ...sidebar };

      localStorage.setItem("app", JSON.stringify(state));
    },
    setScanReader: (state, action) => {
      const scanReader = action.payload;

      state.scanReader = { ...state.scanReader, ...scanReader };

      localStorage.setItem("app", JSON.stringify(state));
    },
  },
});

export const { setThemeMode, setSidebar, setScanReader } = appSlice.actions;
// export default appSlice;
