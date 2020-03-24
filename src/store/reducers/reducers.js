import * as actionTypes from '../actions/actionTypes';

const initialState = {
  currentSearch: '',
  loadingResults: false,
  loadingRecipe: false,
  searchResults: [],
  currentRecipe: null,
  servings: 4,
  favorites: {},
  shoppingList: []
};

const reducer = (state = initialState, action) => {
  let newList;
  switch (action.type) {
    case actionTypes.LOAD_RESULTS_START:
      return {
        ...state,
        loadingResults: true
      };
    case actionTypes.LOAD_RESULTS_SUCCESS:
      return {
        ...state,
        searchResults: [...action.results],
        loadingResults: false
      };
    case actionTypes.LOAD_RESULTS_FAIL:
      return {
        ...state,
        loadingResults: false
      };
    case actionTypes.LOAD_RECIPE_START:
      return {
        ...state,
        loadingRecipe: true
      };
    case actionTypes.LOAD_RECIPE_SUCCESS:
      return {
        ...state,
        currentRecipe: { ...action.recipe },
        loadingRecipe: false
      };
    case actionTypes.LOAD_RECIPE_FAIL:
      return {
        ...state,
        loadingRecipe: false
      };
    case actionTypes.SET_RESULTS:
      return {
        ...state,
        searchResults: [...action.results]
      };

    case actionTypes.SET_RECIPE:
      return {
        ...state,
        currentRecipe: { ...action.recipe }
      };
    case actionTypes.SET_SERVINGS:
      return {
        ...state,
        servings: action.servings
      };
    case actionTypes.MODIFY_SERVINGS:
      let newServings = state.servings;
      if (action.direction === 'increment' && newServings < 20) {
        newServings++;
      } else if (action.direction === 'decrement' && newServings > 1) {
        newServings--;
      }
      return {
        ...state,
        servings: newServings
      };
    case actionTypes.SET_FAVORITES:
      return {
        ...state,
        favorites: { ...action.favorites }
      };

    case actionTypes.MODIFY_FAVORITE:
      let clone = null;
      if (state.favorites[state.currentRecipe.uri]) {
        clone = { ...state.favorites };
        delete clone[state.currentRecipe.uri];
      } else {
        clone = { ...state.favorites };
        clone[state.currentRecipe.uri] = { ...state.currentRecipe };
      }

      window.localStorage.setItem('favorites', JSON.stringify(clone));

      return {
        ...state,
        favorites: clone
      };

    case actionTypes.ADD_TO_SHOPPINGLIST:
        let list = state.currentRecipe.transformedIngredients.map(item => {
        let newItem = { ...item };
        newItem.servings = state.servings;
        return newItem;
      });
      list = state.shoppingList.concat(list);

      window.localStorage.setItem('ShoppingList', JSON.stringify(list));

      return {
        ...state,
        shoppingList: list
      };

    case actionTypes.REMOVE_FROM_SHOPPINGLIST:
      newList = [...state.shoppingList];
      newList.splice(action.index, 1);

      //Sync with local Storage for access to current shoppinglist if page reloaded
      window.localStorage.setItem('ShoppingList', JSON.stringify(newList));

      return {
        ...state,
        shoppingList: newList
      };
    case actionTypes.MODIFY_WITHIN_SHOPPINGLIST:
      newList = [...state.shoppingList];
      if (action.direction === 'increase' && newList[action.index].servings < 20) {
        newList[action.index].servings++;
      } else if (action.direction === 'decrease' && newList[action.index].servings > 0) {
        newList[action.index].servings--;
      } else {
        console.log('an Issue happened in the amount change selection : ', action.direction);
      }

      window.localStorage.setItem('ShoppingList', JSON.stringify(newList));
      return {
        ...state,
        shoppingList: newList
      };
    case actionTypes.SET_SHOPPINGLIST:
      return {
        ...state,
        shoppingList: action.shoppingList
      };

    default:
      return state;
  }
};

export default reducer;
