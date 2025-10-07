import { searchRecipes } from "../../api/recipe";
import { Recipe } from "../reducers/reducers";
import * as actionTypes from "./actionTypes";

// Action Creators : Async
export const fetchResults = (value: string) => {
  return (dispatch: any) => {
    // this.props.searchResultsStart();
    dispatch({ type: actionTypes.LOAD_RESULTS_START });

    searchRecipes(value)
      .then((recipes) => {
        dispatch({
          type: actionTypes.LOAD_RESULTS_SUCCESS,
          results: recipes,
        });

        window.localStorage.setItem("previousSearch", JSON.stringify(recipes));
      })
      .catch((err) => {
        console.log("There was an error", err);
        dispatch({ type: actionTypes.LOAD_RESULTS_FAIL });
      });
  };
};
// Originally an Async call, but now it is a sync call with no need to fetch data due to API change
export const fetchRecipe = (recipe: Recipe) => {
  return (dispatch: any) => {
    // Set loading status to show loading animation
    dispatch({ type: actionTypes.LOAD_RECIPE_START });
    // Use utility function to parse ingredient list and grab quantity and unit information via regex.
    // recipe.transformedIngredients = transformIngredients(recipe.ingredients);

    // Load clicked recipe as current recipe
    dispatch({ type: actionTypes.LOAD_RECIPE_SUCCESS, recipe: recipe });
    dispatch({ type: actionTypes.SET_SERVINGS, servings: 4 }); // Default to 4 servings

    window.localStorage.setItem("previousRecipe", JSON.stringify(recipe));
  };
};
