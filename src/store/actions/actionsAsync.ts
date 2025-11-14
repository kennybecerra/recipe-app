import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRecipes, type Recipe } from "../../api/recipe";
import type { Tag } from "../../api/types";
import * as actionTypes from "./actionTypes";

// Redux Toolkit Async Thunks
export const fetchResults = createAsyncThunk(
	"recipes/fetchResults",
	async (query: string) => {
		const recipes = await getRecipes({ query, from: 0, size: 20 });
		window.localStorage.setItem("previousSearch", JSON.stringify(recipes));
		return recipes;
	},
);

export const fetchRecipesWithTags = createAsyncThunk(
	"recipes/fetchRecipesWithTags",
	async (params: {
		query?: string;
		from?: number;
		size?: number;
		tags?: Tag["name"][];
	}) => {
		const recipes = await getRecipes(params);
		return recipes;
	},
);

export const fetchRecipe = createAsyncThunk(
	"recipes/fetchRecipe",
	async (recipe: Recipe, { dispatch }) => {
		dispatch({ type: actionTypes.SET_SERVINGS, servings: 4 }); // Default to 4 servings
		window.localStorage.setItem("previousRecipe", JSON.stringify(recipe));
		return recipe;
	},
);
