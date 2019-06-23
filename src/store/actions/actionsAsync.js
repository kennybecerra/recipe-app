import * as actionTypes from './actionTypes';
import axios from 'axios';
// Action Creators : Async
export const fetchResults = value => {
  return dispatch => {
    // this.props.searchResultsStart();
    dispatch({ type: actionTypes.LOAD_RESULTS_START });

    axios
      .get(`https://www.food2fork.com/api/search?key=97ace3f52f4192cd1500766f6c13eece&q=${value}`)
      .then(response => {
        // this.setState({
        //   results: [...response.data.recipes],
        //   loadingResults: false
        // });

        // this.props.setResults(response.data.recipes);
        // this.props.searchResultsSuccess();

        dispatch({ type: actionTypes.LOAD_RESULTS_SUCCESS, results: response.data.recipes });

        window.localStorage.setItem('previousSearch', JSON.stringify(response.data.recipes));
      })
      .catch(err => {
        console.log('There was an error', err);
        dispatch({ type: actionTypes.LOAD_RESULTS_FAIL });
      });
  };
};

export const fetchRecipe = id => {
  return dispatch => {
    // this.props.searchRecipeStart();
    dispatch({ type: actionTypes.LOAD_RECIPE_START });

    axios
      .get(`https://www.food2fork.com/api/get?key=97ace3f52f4192cd1500766f6c13eece&rId=${id}`)
      .then(response => {
        console.log('this is the response');
        console.log(response.data.recipe);

        response.data.recipe.transformedIngredients = transformIngredients(
          response.data.recipe.ingredients
        );
        console.log(response.data.recipe);
        // this.setState({
        //   recipe: { ...response.data.recipe },
        //   loadingRecipe: false,
        //   servings: 4
        // });

        dispatch({ type: actionTypes.LOAD_RECIPE_SUCCESS, recipe: response.data.recipe });
        dispatch({ type: actionTypes.SET_SERVINGS, servings: 4 });

        // this.props.setRecipe(response.data.recipe);
        // this.props.searchRecipeSuccess();
        // this.props.setServings(4);

        window.localStorage.setItem('previousRecipe', JSON.stringify(response.data.recipe));
      })
      .catch(err => {
        console.log('There was an error', err);
        dispatch({ type: actionTypes.LOAD_RECIPE_FAIL });
      });
  };
};

// UTILITY
const transformIngredients = ingredients => {
  //const findInfo = /(\d+\s)?(\d+\/\d+)?\s(cup|ounce|oz|pound|lb|gram|teaspoon|tsp|tablespoon|tbsp|pint|quart|gallon|pinch|dash|smidgen|drop|egg|stick|slice|loaf)/i;
  const findNumbers = /^(\d*(\s?\d+\/\d | \s?))/;
  const findFraction = /\//;
  const findMetric = /(cup|ounce|oz|pound|lb|gram|teaspoon|tsp|tablespoon|tbsp|pint|quart|gallon|pinch|dash|smidgen|drop|egg|stick|slice|loaf)/i;
  const findParenthesis = /\(([^)]+)\) ?/g;
  const cleanBegining = /^.*(cup|ounce|oz|pound|lb|gram|teaspoon|tsp|tablespoon|tbsp|pint|quart|gallon|pinch|dash|smidgen|drop|egg|stick|slice|loaf)(s|es)? (of)?/;
  let transformedIngredients = ingredients.map(val => {
    const transform = {
      amount: 1,
      metric: 'item',
      description: '',
      fullText: ''
    };

    // Fingure out Amounts
    //let newVal = val.match(findInfo);
    //console.log("this is my new Search : ", newVal[0])
    let result = val.trim().match(findNumbers);
    if (result === null) {
      transform.amount = 1;
      //console.log("Happened for : ", val);
    } else {
      transform.amount = result[0]
        .trim()
        .split(' ')
        .map(value => {
          if (findFraction.test(value)) {
            let numbers = value.split('/');
            return parseFloat((parseInt(numbers[0], 10) / parseInt(numbers[1], 10)).toFixed(4));
          } else {
            return parseInt(value);
          }
        })
        .reduce((accu, cur) => {
          return accu + cur;
        });
    }

    // normalizing the servings amounts
    transform.amount = transform.amount / 4;

    //Figure Out metric

    if (findMetric.test(val)) {
      transform.metric = val.match(findMetric)[0].toLowerCase();
    }

    // Figure out description
    transform.description = val.replace(findParenthesis, '');
    transform.description = transform.description.replace(findNumbers, '');
    transform.description = transform.description.replace(cleanBegining, '');

    if (transform.description.length > 20) {
      transform.description = transform.description.split('.')[0];
    }

    // Full text
    transform.fullText = val;

    return transform;
  });

  return transformedIngredients;
};
