// favoritesSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriterecipes: [], // Array to store favorite recipes
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const recipe = action.payload;
      const existingIndex = state.favoriterecipes.findIndex(
        (favRecipe) => favRecipe.idFood === recipe.idFood
      );

      if (existingIndex >= 0) {
        // If the recipe is already in favorites, remove it
        state.favoriterecipes.splice(existingIndex, 1);
      } else {
        // If it's not in favorites, add it
        state.favoriterecipes.push(recipe);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
