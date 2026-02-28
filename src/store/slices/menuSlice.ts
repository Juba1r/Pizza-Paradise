import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  toppings: string;
  featured: boolean;
  rating: number;
}

interface MenuState {
  items: Pizza[];
  loading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchPizzas = createAsyncThunk("menu/fetchPizzas", async () => {
  const response = await fetch("/api/pizzas");
  const data = await response.json();
  return data.pizzas;
});

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch pizzas";
      });
  },
});

import { RootState } from "@/store";

export const selectPizzas = (state: RootState) => {
  const { items } = state.menu;
  const { activeCategory, searchQuery } = state.ui;

  return items.filter((pizza) => {
    const matchesCategory =
      activeCategory === "ALL" || pizza.category === activeCategory;
    const matchesSearch =
      pizza.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pizza.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
};

export const selectPizzasLoading = (state: RootState) => state.menu.loading;

export default menuSlice.reducer;
