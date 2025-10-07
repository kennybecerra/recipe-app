import { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import Body from "./components/Body/Body";
import Layout from "./components/Layout/Layout";
import Search from "./components/Search/Search";
import * as actionTypes from "./store/actions/actionTypes";

interface AppProps {
  setResults: (results: any[]) => void;
  setRecipe: (recipe: any) => void;
  setFavorites: (favorites: any[]) => void;
  setShoppingList: (shoppingList: any[]) => void;
}

class App extends Component<AppProps> {
  componentDidMount() {
    // fetchRecipes("pizza")
    //   .then((recipes) => {
    //     console.log("Fetched recipes:", recipes);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching recipes:", error);
    //   });

    if ("previousSearch" in window.localStorage) {
      const previousSearch = window.localStorage.getItem("previousSearch");
      if (previousSearch) {
        this.props.setResults(JSON.parse(previousSearch));
      }
    }

    if ("previousRecipe" in window.localStorage) {
      const previousRecipe = window.localStorage.getItem("previousRecipe");
      if (previousRecipe) {
        this.props.setRecipe(JSON.parse(previousRecipe));
      }
    }

    if ("favorites" in window.localStorage) {
      const favorites = window.localStorage.getItem("favorites");
      if (favorites) {
        this.props.setFavorites(JSON.parse(favorites));
      }
    }

    if ("ShoppingList" in window.localStorage) {
      const shoppingList = window.localStorage.getItem("ShoppingList");
      if (shoppingList) {
        this.props.setShoppingList(JSON.parse(shoppingList));
      }
    }
  }

  render() {
    return (
      <Layout>
        <Body />
        <Search />
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setResults: (results: any[]) =>
      dispatch({
        type: actionTypes.SET_RESULTS,
        results: results,
      }),
    setFavorites: (favorites: any[]) =>
      dispatch({ type: actionTypes.SET_FAVORITES, favorites: favorites }),
    setRecipe: (recipe: any) =>
      dispatch({ type: actionTypes.SET_RECIPE, recipe: recipe }),
    setShoppingList: (shoppingList: any[]) =>
      dispatch({ type: actionTypes.SET_SHOPPINGLIST, shoppingList }),
  };
};

export default connect(null, mapDispatchToProps)(App);
