import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import Search from "./components/Search/Search";
import "./App.css";
import Body from "./components/Body/Body";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSearch: "",
      loadingResults: false,
      loadingRecipe: false,
      results: [],
      recipe: null,
      servings: 4,
      favorites: {},
      ShoppingList: []
    };

    if ("previousSearch" in window.localStorage) {
      this.state.results = JSON.parse(
        window.localStorage.getItem("previousSearch")
      );
    }

    if ("previousRecipe" in window.localStorage) {
      this.state.recipe = JSON.parse(
        window.localStorage.getItem("previousRecipe")
      );
    }

    if ("favorites" in window.localStorage) {
      this.state.favorites = JSON.parse(
        window.localStorage.getItem("favorites")
      );
    }

    if ("ShoppingList" in window.localStorage) {
      this.state.ShoppingList = JSON.parse(
        window.localStorage.getItem("ShoppingList")
      );
    }
    console.log(this.state);
  }

  transformIngredients = ingredients => {
    //const findInfo = /(\d+\s)?(\d+\/\d+)?\s(cup|ounce|oz|pound|lb|gram|teaspoon|tsp|tablespoon|tbsp|pint|quart|gallon|pinch|dash|smidgen|drop|egg|stick|slice|loaf)/i;
    const findNumbers = /^(\d*(\s?\d+\/\d | \s?))/;
    const findFraction = /\//;
    const findMetric = /(cup|ounce|oz|pound|lb|gram|teaspoon|tsp|tablespoon|tbsp|pint|quart|gallon|pinch|dash|smidgen|drop|egg|stick|slice|loaf)/i;
    const findParenthesis = /\(([^)]+)\) ?/g;
    const cleanBegining = /^.*(cup|ounce|oz|pound|lb|gram|teaspoon|tsp|tablespoon|tbsp|pint|quart|gallon|pinch|dash|smidgen|drop|egg|stick|slice|loaf)(s|es)? (of)?/;
    let transformedIngredients = ingredients.map(val => {
      const transform = {
        amount: 1,
        metric: "item",
        description: "",
        fullText: ""
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
          .split(" ")
          .map(value => {
            if (findFraction.test(value)) {
              let numbers = value.split("/");
              return parseFloat(
                (parseInt(numbers[0], 10) / parseInt(numbers[1], 10)).toFixed(4)
              );
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
      transform.description = val.replace(findParenthesis, "");
      transform.description = transform.description.replace(findNumbers, "");
      transform.description = transform.description.replace(cleanBegining, "");

      if (transform.description.length > 20) {
        transform.description = transform.description.split(".")[0];
      }

      // Full text
      transform.fullText = val;

      return transform;
    });

    return transformedIngredients;
  };

  handleAddToFavorites = () => {
    let clone = null;
    if (this.state.favorites[this.state.recipe.recipe_id]) {
      clone = { ...this.state.favorites };
      delete clone[this.state.recipe.recipe_id];

      this.setState({
        favorites: clone
      });
    } else {
      clone = { ...this.state.favorites };
      clone[this.state.recipe.recipe_id] = { ...this.state.recipe };
      this.setState({
        favorites: clone
      });
    }

    window.localStorage.setItem("favorites", JSON.stringify(clone));
  };

  handleServingChange = value => {
    let newServings = this.state.servings;
    if (value === "increment" && newServings < 20) {
      newServings++;
    } else if (value === "decrement" && newServings > 1) {
      newServings--;
    }

    this.setState({
      servings: newServings
    });
  };

  handleSearchSubmit = value => {
    this.setState({
      currentSearch: value,
      loadingResults: true
    });

    axios
      .get(
        `https://www.food2fork.com/api/search?key=97ace3f52f4192cd1500766f6c13eece&q=${value}`
      )
      .then(response => {
        this.setState({
          results: [...response.data.recipes],
          loadingResults: false
        });

        window.localStorage.setItem(
          "previousSearch",
          JSON.stringify(response.data.recipes)
        );
      })
      .catch(err => {
        console.log("There was an error", err);
      });
  };

  handleRecipeSelect = id => {
    this.setState({
      loadingRecipe: true
    });

    axios
      .get(
        `https://www.food2fork.com/api/get?key=97ace3f52f4192cd1500766f6c13eece&rId=${id}`
      )
      .then(response => {
        console.log("this is the response");
        console.log(response.data.recipe);

        response.data.recipe.transformedIngredients = this.transformIngredients(
          response.data.recipe.ingredients
        );
        console.log(response.data.recipe);
        this.setState({
          recipe: { ...response.data.recipe },
          loadingRecipe: false,
          servings: 4
        });

        window.localStorage.setItem(
          "previousRecipe",
          JSON.stringify(response.data.recipe)
        );
      })
      .catch(err => {
        console.log("There was an error", err);
      });
  };

  handleAddToShoppingList = () => {
    //let list = [...this.state.recipe.transformedIngredients];
    let list = this.state.recipe.transformedIngredients.map(item => {
      let newItem = { ...item };
      newItem.servings = this.state.servings;
      return newItem;
    });
    list = this.state.ShoppingList.concat(list);
    this.setState({ ShoppingList: list });

    window.localStorage.setItem("ShoppingList", JSON.stringify(list));
  };

  handleDeleteFromSchoppingList = index => {
    let newList = [...this.state.ShoppingList];
    newList.splice(index, 1);
    this.setState({
      ShoppingList: newList
    });

    //Sync with local Storage for access to current shoppinglist if page reloaded
    window.localStorage.setItem("ShoppingList", JSON.stringify(newList));
  };

  handleAmountChangeInShoppingList = (value, index) => {
    let newList = [...this.state.ShoppingList];
    if (value === "increase" && newList[index].servings < 20) {
      newList[index].servings++;
      this.setState({
        ShoppingList: newList
      });
      window.localStorage.setItem("ShoppingList", JSON.stringify(newList));
    } else if (value === "decrease" && newList[index].servings > 0) {
      newList[index].servings--;
      this.setState({
        ShoppingList: newList
      });
      window.localStorage.setItem("ShoppingList", JSON.stringify(newList));
    } else {
      console.log("an Issue happened in the amount change selection : ", value);
    }
  };

  render() {
    return (
      <Layout>
        <Body
          results={this.state.results}
          loadingResults={this.state.loadingResults}
          loadingRecipe={this.state.loadingRecipe}
          handleRecipeSelect={this.handleRecipeSelect}
          recipe={this.state.recipe}
          servings={this.state.servings}
          handleServingChange={this.handleServingChange}
          handleAddToFavorites={this.handleAddToFavorites}
          handleAddToShoppingList={this.handleAddToShoppingList}
          handleDeleteFromSchoppingList={this.handleDeleteFromSchoppingList}
          handleAmountChangeInShoppingList={
            this.handleAmountChangeInShoppingList
          }
          ShoppingList={this.state.ShoppingList}
          favorites={this.state.favorites}
        />
        <Search
          handleSearch={this.handleSearchSubmit}
          favorites={this.state.favorites}
          handleRecipeSelect={this.handleRecipeSelect}
          recipe={this.state.recipe}
          handleDeleteFromSchoppingList={this.handleDeleteFromSchoppingList}
          handleAmountChangeInShoppingList={
            this.handleAmountChangeInShoppingList
          }
          ShoppingList={this.state.ShoppingList}
        />
      </Layout>
    );
  }
}

export default App;
