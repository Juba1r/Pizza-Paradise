import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  theme: "dark" | "light";
  mobileMenuOpen: boolean;
  searchOpen: boolean;
  activeCategory: string;
  searchQuery: string;
  notification: {
    show: boolean;
    message: string;
    type: "success" | "error" | "info" | "warning";
  };
}

const initialState: UIState = {
  theme: "light",
  mobileMenuOpen: false,
  searchOpen: false,
  activeCategory: "ALL",
  searchQuery: "",
  notification: {
    show: false,
    message: "",
    type: "info",
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"dark" | "light">) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileMenuOpen = action.payload;
    },
    setSearchOpen: (state, action: PayloadAction<boolean>) => {
      state.searchOpen = action.payload;
    },
    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    showNotification: (
      state,
      action: PayloadAction<{
        message: string;
        type: "success" | "error" | "info" | "warning";
      }>,
    ) => {
      state.notification = { show: true, ...action.payload };
    },
    hideNotification: (state) => {
      state.notification.show = false;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
  },
});

export const {
  setTheme,
  toggleTheme,
  setMobileMenuOpen,
  setSearchOpen,
  setActiveCategory,
  setSearchQuery,
  showNotification,
  hideNotification,
  toggleMobileMenu,
} = uiSlice.actions;

export const selectTheme = (state: { ui: UIState }) => state.ui.theme;
export const selectMobileMenuOpen = (state: { ui: UIState }) =>
  state.ui.mobileMenuOpen;
export const selectActiveCategory = (state: { ui: UIState }) =>
  state.ui.activeCategory;
export const selectSearchQuery = (state: { ui: UIState }) =>
  state.ui.searchQuery;

export default uiSlice.reducer;
