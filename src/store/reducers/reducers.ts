import * as actionTypes from "../actions/actionTypes";

export interface Recipe {
  uri: string; // unique id
  label: string; // recipe
  image: string; // image URL
  ingredients: string[];
  formattedIngredients: {
    amount: number; // ingredient amount
    name: string; // ingredient name
    metric: string; // ingredient metric
  }[];
  ingredients_formatted: {
    text: string;
    amount: number; // ingredient amount
    name: string; // ingredient name
    metric: string; // ingredient metric
  }[];
  instructions: { text: string; start_time: number; end_time: number }[];
  nutrition: {
    calories: number;
    carbohydrates: number;
    fat: number;
    protein: number;
    sugar: number;
    fiber: number;
  };
  total_time: number;
}

export type IngredientItem = Recipe["ingredients_formatted"][number];
export type ShoppingListItem = IngredientItem & { servings: number };

export interface AppState {
  currentSearch: string;
  loadingResults: boolean;
  loadingRecipe: boolean;
  searchResults: Recipe[];
  currentRecipe: Recipe | null;
  servings: number;
  favorites: { [key: string]: Recipe };
  shoppingList: ShoppingListItem[];
}

export interface Action {
  type: string;
  results?: Recipe[];
  recipe?: Recipe;
  servings?: number;
  direction?: "increment" | "decrement" | "increase" | "decrease";
  favorites?: { [key: string]: Recipe };
  index?: number;
  shoppingList?: ShoppingListItem[];
}

const initialState: AppState = {
  currentSearch: "",
  loadingResults: false,
  loadingRecipe: false,
  searchResults: [],
  currentRecipe: null,
  servings: 4,
  favorites: {},
  shoppingList: [],
};

const reducer = (state = initialState, action: Action): AppState => {
  let newList;
  switch (action.type) {
    case actionTypes.LOAD_RESULTS_START:
      return {
        ...state,
        loadingResults: true,
      };
    case actionTypes.LOAD_RESULTS_SUCCESS:
      return {
        ...state,
        searchResults: action.results ? [...action.results] : [],
        loadingResults: false,
      };
    case actionTypes.LOAD_RESULTS_FAIL:
      return {
        ...state,
        loadingResults: false,
      };
    case actionTypes.LOAD_RECIPE_START:
      return {
        ...state,
        loadingRecipe: true,
      };
    case actionTypes.LOAD_RECIPE_SUCCESS:
      return {
        ...state,
        currentRecipe: action.recipe ? { ...action.recipe } : null,
        loadingRecipe: false,
      };
    case actionTypes.LOAD_RECIPE_FAIL:
      return {
        ...state,
        loadingRecipe: false,
      };
    case actionTypes.SET_RESULTS:
      return {
        ...state,
        searchResults: action.results ? [...action.results] : [],
      };

    case actionTypes.SET_RECIPE:
      return {
        ...state,
        currentRecipe: action.recipe ? { ...action.recipe } : null,
      };
    case actionTypes.SET_SERVINGS:
      return {
        ...state,
        servings: action.servings || 4,
      };
    case actionTypes.MODIFY_SERVINGS:
      let newServings = state.servings;
      if (action.direction === "increment" && newServings < 20) {
        newServings++;
      } else if (action.direction === "decrement" && newServings > 1) {
        newServings--;
      }
      return {
        ...state,
        servings: newServings,
      };
    case actionTypes.SET_FAVORITES:
      return {
        ...state,
        favorites: { ...action.favorites },
      };

    case actionTypes.MODIFY_FAVORITE:
      if (!state.currentRecipe) return state;

      let clone = null;
      if (state.favorites[state.currentRecipe.uri]) {
        clone = { ...state.favorites };
        delete clone[state.currentRecipe.uri];
      } else {
        clone = { ...state.favorites };
        clone[state.currentRecipe.uri] = { ...state.currentRecipe };
      }

      window.localStorage.setItem("favorites", JSON.stringify(clone));

      return {
        ...state,
        favorites: clone,
      };

    case actionTypes.ADD_TO_SHOPPINGLIST:
      if (!state.currentRecipe || !state.currentRecipe.ingredients_formatted)
        return state;

      let list: AppState["shoppingList"] =
        state.currentRecipe.ingredients_formatted.map((item) => {
          return { ...item, servings: state.servings };
        });
      list = state.shoppingList.concat(list);

      window.localStorage.setItem("ShoppingList", JSON.stringify(list));

      return {
        ...state,
        shoppingList: list,
      };

    case actionTypes.REMOVE_FROM_SHOPPINGLIST:
      if (action.index === undefined) return state;

      newList = [...state.shoppingList];
      newList.splice(action.index, 1);

      //Sync with local Storage for access to current shoppinglist if page reloaded
      window.localStorage.setItem("ShoppingList", JSON.stringify(newList));

      return {
        ...state,
        shoppingList: newList,
      };
    case actionTypes.MODIFY_WITHIN_SHOPPINGLIST:
      if (action.index === undefined) return state;

      newList = [...state.shoppingList];
      if (
        action.direction === "increase" &&
        newList[action.index].servings < 20
      ) {
        newList[action.index].servings++;
      } else if (
        action.direction === "decrease" &&
        newList[action.index].servings > 0
      ) {
        newList[action.index].servings--;
      } else {
        console.log(
          "an Issue happened in the amount change selection : ",
          action.direction
        );
      }

      window.localStorage.setItem("ShoppingList", JSON.stringify(newList));
      return {
        ...state,
        shoppingList: newList,
      };
    case actionTypes.SET_SHOPPINGLIST:
      return {
        ...state,
        shoppingList: action.shoppingList || [],
      };

    default:
      return state;
  }
};

export default reducer;
