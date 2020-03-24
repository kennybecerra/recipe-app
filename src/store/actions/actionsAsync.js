import * as actionTypes from './actionTypes';
import axios from 'axios';

const appID = "c1b32a1b";
const appKey = "28df94bb2a109a95e4488d97d20181c9";
const edamanURL = "https://api.edamam.com/search";

// Action Creators : Async
export const fetchResults = value => {
  return dispatch => {
    // this.props.searchResultsStart();
    dispatch({ type: actionTypes.LOAD_RESULTS_START });

    axios
      // .get(`https://www.food2fork.com/api/search?key=97ace3f52f4192cd1500766f6c13eece&q=${value}`)
      .get(`${edamanURL}?q=${value}&app_id=${appID}&app_key=${appKey}`)
      .then(response => {
        
        console.log(response)

        dispatch({ type: actionTypes.LOAD_RESULTS_SUCCESS, results: response.data.hits.map( item => item.recipe)});

        window.localStorage.setItem('previousSearch', JSON.stringify( response.data.hits.map( item => item.recipe)));
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
    console.log(id)

    axios
      // .get(`https://www.food2fork.com/api/get?key=97ace3f52f4192cd1500766f6c13eece&rId=${id}`)
      .get(`${edamanURL}?r=${encodeURIComponent(id)}&app_id=${appID}&app_key=${appKey}`)
      .then(response => {

        response.data[0].transformedIngredients = transformIngredients(
          response.data[0].ingredientLines
        );

        console.log(response);
    

        dispatch({ type: actionTypes.LOAD_RECIPE_SUCCESS, recipe: response.data[0] });
        dispatch({ type: actionTypes.SET_SERVINGS, servings: 4 });

        window.localStorage.setItem('previousRecipe', JSON.stringify(response.data[0]));
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
