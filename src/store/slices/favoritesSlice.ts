import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Recipe } from "@/api/recipe";

// Slice State
interface FavoritesState {
	mapByID: Record<number, Recipe>;
}

const initialState: FavoritesState = {
	mapByID: {},
};

// Slice
const favoritesSlice = createSlice({
	name: "favorites",
	initialState,
	reducers: {
		// Add favorite
		addFavorite: (state, action: PayloadAction<Recipe>) => {
			const recipe = action.payload;
			state.mapByID[recipe.id] = recipe;
			window.localStorage.setItem("favorites", JSON.stringify(state.mapByID));
		},
		// Remove favorite
		removeFavorite: (state, action: PayloadAction<number>) => {
			const recipeId = action.payload;
			delete state.mapByID[recipeId];
			window.localStorage.setItem("favorites", JSON.stringify(state.mapByID));
		},
		// Toggle favorite
		toggleFavorite: (state, action: PayloadAction<Recipe>) => {
			const recipe = action.payload;
			if (state.mapByID[recipe.id]) {
				delete state.mapByID[recipe.id];
			} else {
				state.mapByID[recipe.id] = recipe;
			}
			window.localStorage.setItem("favorites", JSON.stringify(state.mapByID));
		},
		// Set favorites (for loading from localStorage)
		setFavorites: (state, action: PayloadAction<Record<number, Recipe>>) => {
			state.mapByID = action.payload;
		},
		// Clear all favorites
		clearFavorites: (state) => {
			state.mapByID = {};
			window.localStorage.setItem("favorites", JSON.stringify(state.mapByID));
		},
	},
});

// Export actions
export const {
	addFavorite,
	removeFavorite,
	toggleFavorite,
	setFavorites,
	clearFavorites,
} = favoritesSlice.actions;

// Export reducer
export default favoritesSlice.reducer;
