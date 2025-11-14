import { createReducer } from "@reduxjs/toolkit";
import type { Recipe } from "@/api/recipe";
import {
	fetchRecipe,
	fetchRecipesWithTags,
	fetchResults,
} from "../actions/actionsAsync";
import * as actionTypes from "../actions/actionTypes";

export interface ShoppingListItem {
	recipeID: number;
	recipeName: string;
	sectionIngredients: {
		id: number;
		ingredient: string;
		raw_text: string;
	}[];
	servings: number;
}

export interface AppState {
	recipes: Recipe[];
	loadingRecipes: "idle" | "success" | "error" | "pending";
	currentRecipe: Recipe | null;

	allRecipes: Record<string, Recipe>;

	loadingRecipe: boolean;
	currentSearch: string;
	servings: number;
	favorites: { [key: string]: Recipe };
	shoppingList: ShoppingListItem[];
}

const initialState: AppState = {
	recipes: [],
	loadingRecipes: "idle",
	currentRecipe: null,
	allRecipes: {},
	currentSearch: "",
	loadingRecipe: false,
	servings: 4,
	favorites: {},
	shoppingList: [],
};

const reducer = createReducer(initialState, (builder) => {
	builder
		// Handle fetchRecipesWithTags async thunk
		.addCase(fetchRecipesWithTags.pending, (state) => {
			state.loadingRecipes = "pending";
		})
		.addCase(fetchRecipesWithTags.fulfilled, (state, action) => {
			state.recipes = action.payload;
			state.loadingRecipes = "success";

			const newRecipes = action.payload.reduce(
				(accu, curr) => {
					accu[curr.id] = { ...curr };

					return accu;
				},
				{} as Record<string, Recipe>,
			);

			state.allRecipes = { ...state.allRecipes, ...newRecipes };
		})
		.addCase(fetchRecipesWithTags.rejected, (state) => {
			state.loadingRecipes = "error";
		});
});

export default reducer;
