import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Types
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

// Slice State
interface ShoppingListState {
	shoppingList: ShoppingListItem[];
}

const initialState: ShoppingListState = {
	shoppingList: [],
};

// Slice
const shoppingListSlice = createSlice({
	name: "shoppingList",
	initialState,
	reducers: {
		// Add items to shopping list
		addToShoppingList: (state, action: PayloadAction<ShoppingListItem[]>) => {
			state.shoppingList.push(...action.payload);
			window.localStorage.setItem(
				"ShoppingList",
				JSON.stringify(state.shoppingList),
			);
		},
		// Remove item from shopping list
		removeFromShoppingList: (state, action: PayloadAction<number>) => {
			const index = action.payload;
			state.shoppingList.splice(index, 1);
			window.localStorage.setItem(
				"ShoppingList",
				JSON.stringify(state.shoppingList),
			);
		},
		// Modify servings within shopping list
		increaseServingsInShoppingList: (state, action: PayloadAction<number>) => {
			const index = action.payload;
			if (
				state.shoppingList[index] &&
				state.shoppingList[index].servings < 20
			) {
				state.shoppingList[index].servings++;
				window.localStorage.setItem(
					"ShoppingList",
					JSON.stringify(state.shoppingList),
				);
			}
		},
		decreaseServingsInShoppingList: (state, action: PayloadAction<number>) => {
			const index = action.payload;
			if (state.shoppingList[index] && state.shoppingList[index].servings > 0) {
				state.shoppingList[index].servings--;
				window.localStorage.setItem(
					"ShoppingList",
					JSON.stringify(state.shoppingList),
				);
			}
		},
		// Set shopping list (for loading from localStorage)
		setShoppingList: (state, action: PayloadAction<ShoppingListItem[]>) => {
			state.shoppingList = action.payload;
		},
		// Clear shopping list
		clearShoppingList: (state) => {
			state.shoppingList = [];
			window.localStorage.setItem(
				"ShoppingList",
				JSON.stringify(state.shoppingList),
			);
		},
	},
});

// Export actions
export const {
	addToShoppingList,
	removeFromShoppingList,
	increaseServingsInShoppingList,
	decreaseServingsInShoppingList,
	setShoppingList,
	clearShoppingList,
} = shoppingListSlice.actions;

// Export reducer
export default shoppingListSlice.reducer;
