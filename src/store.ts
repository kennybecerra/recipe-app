import { configureStore } from "@reduxjs/toolkit";
import {
	type TypedUseSelectorHook,
	useDispatch,
	useSelector,
} from "react-redux";
import currentRecipeReducer from "./store/slices/currentRecipeSlice";
import favoritesReducer from "./store/slices/favoritesSlice";
import recipesReducer from "./store/slices/recipesSlice";
import shoppingListReducer from "./store/slices/shoppingListSlice";

export const store = configureStore({
	reducer: {
		recipes: recipesReducer,
		currentRecipe: currentRecipeReducer,
		favorites: favoritesReducer,
		shoppingList: shoppingListReducer,
	},
	devTools: process.env.NODE_ENV !== "production",
});

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
