import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Recipe } from "@/api/recipe";
import { getRecipes } from "@/api/recipe";
import type { Tag } from "@/api/types";

// Async Thunks
export const fetchResults = createAsyncThunk(
	"recipes/fetchResults",
	async (params: { query: string; size?: number }) => {
		const { query, size = 20 } = params;
		const recipes = await getRecipes({ query, from: 0, size });
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

// Slice State
interface RecipesState {
	recipes: Recipe[];
	loadingRecipes: "idle" | "pending" | "success" | "error";
	allRecipes: Record<string, Recipe>;
	error: string | null;
}

const initialState: RecipesState = {
	recipes: [],
	loadingRecipes: "idle",
	allRecipes: {},
	error: null,
};

// Slice
const recipesSlice = createSlice({
	name: "recipes",
	initialState,
	reducers: {
		// Synchronous actions
		clearRecipes: (state) => {
			state.recipes = [];
			state.loadingRecipes = "idle";
			state.error = null;
		},
		resetRecipesState: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			// Handle fetchResults
			.addCase(fetchResults.pending, (state) => {
				state.loadingRecipes = "pending";
				state.error = null;
			})
			.addCase(fetchResults.fulfilled, (state, action) => {
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
			.addCase(fetchResults.rejected, (state, action) => {
				state.loadingRecipes = "error";
				state.error = action.error.message || "Failed to fetch recipes";
			})
			// Handle fetchRecipesWithTags
			.addCase(fetchRecipesWithTags.pending, (state) => {
				state.loadingRecipes = "pending";
				state.error = null;
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
			.addCase(fetchRecipesWithTags.rejected, (state, action) => {
				state.loadingRecipes = "error";
				state.error =
					action.error.message || "Failed to fetch recipes with tags";
			});
	},
});

// Export actions
export const { clearRecipes, resetRecipesState } = recipesSlice.actions;

// Export reducer
export default recipesSlice.reducer;
