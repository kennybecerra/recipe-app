import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Body from "./components/Body/Body";
import Layout from "./components/Layout/Layout";
import Search from "./components/Search/Search";
import type { AppDispatch } from "./store";
import * as actionTypes from "./store/actions/actionTypes";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Load data from localStorage on component mount
    if ("previousSearch" in window.localStorage) {
      const previousSearch = window.localStorage.getItem("previousSearch");
      if (previousSearch) {
        dispatch({
          type: actionTypes.SET_RESULTS,
          results: JSON.parse(previousSearch),
        });
      }
    }

    if ("previousRecipe" in window.localStorage) {
      const previousRecipe = window.localStorage.getItem("previousRecipe");
      if (previousRecipe) {
        dispatch({
          type: actionTypes.SET_RECIPE,
          recipe: JSON.parse(previousRecipe),
        });
      }
    }

    if ("favorites" in window.localStorage) {
      const favorites = window.localStorage.getItem("favorites");
      if (favorites) {
        dispatch({
          type: actionTypes.SET_FAVORITES,
          favorites: JSON.parse(favorites),
        });
      }
    }

    if ("ShoppingList" in window.localStorage) {
      const shoppingList = window.localStorage.getItem("ShoppingList");
      if (shoppingList) {
        dispatch({
          type: actionTypes.SET_SHOPPINGLIST,
          shoppingList: JSON.parse(shoppingList),
        });
      }
    }
  }, [dispatch]);

  return (
    <Layout>
      <Body />
      <Search />
    </Layout>
  );
};

export default App;
