import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";
import type { Recipe } from "@/api/recipe";

// Async Thunk
export const fetchRecipe = createAsyncThunk(
	"currentRecipe/fetchRecipe",
	async (recipe: Recipe) => {
		window.localStorage.setItem("previousRecipe", JSON.stringify(recipe));
		return recipe;
	},
);

// Slice State
interface CurrentRecipeState {
	currentRecipe: Recipe | null;
	loadingRecipe: boolean;
	servings: number;
	error: string | null;
}

const initialState: CurrentRecipeState = {
	currentRecipe: null,
	loadingRecipe: false,
	servings: 4,
	error: null,
};

// Slice
const currentRecipeSlice = createSlice({
	name: "currentRecipe",
	initialState,
	reducers: {
		// Set servings
		setServings: (state, action: PayloadAction<number>) => {
			state.servings = action.payload;
		},
		// Modify servings
		incrementServings: (state) => {
			if (state.servings < 20) {
				state.servings++;
			}
		},
		decrementServings: (state) => {
			if (state.servings > 1) {
				state.servings--;
			}
		},
		// Clear current recipe
		clearCurrentRecipe: (state) => {
			state.currentRecipe = null;
			state.loadingRecipe = false;
			state.servings = 4;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRecipe.pending, (state) => {
				state.loadingRecipe = true;
				state.error = null;
			})
			.addCase(fetchRecipe.fulfilled, (state, action) => {
				state.currentRecipe = action.payload;
				state.servings = action.payload.servings || 4;
				state.loadingRecipe = false;
			})
			.addCase(fetchRecipe.rejected, (state, action) => {
				state.loadingRecipe = false;
				state.error = action.error.message || "Failed to fetch recipe";
			});
	},
});

// Export actions
export const {
	setServings,
	incrementServings,
	decrementServings,
	clearCurrentRecipe,
} = currentRecipeSlice.actions;

// Export reducer
export default currentRecipeSlice.reducer;
