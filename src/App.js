import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from './components/Layout/Layout';
import Search from './components/Search/Search';
import './App.css';
import * as actionTypes from './store/actions/actionTypes';
import Body from './components/Body/Body';

class App extends Component {

  componentDidMount() {
    if ('previousSearch' in window.localStorage) {
      // this.state.results = JSON.parse(window.localStorage.getItem('previousSearch'));
      this.props.setResults(JSON.parse(window.localStorage.getItem('previousSearch')));
    }

    if ('previousRecipe' in window.localStorage) {
      // this.state.recipe = JSON.parse(window.localStorage.getItem('previousRecipe'));
      this.props.setRecipe(JSON.parse(window.localStorage.getItem('previousRecipe')));
    }

    if ('favorites' in window.localStorage) {
      // this.state.favorites = JSON.parse(window.localStorage.getItem('favorites'));
      this.props.setFavorites(JSON.parse(window.localStorage.getItem('favorites')));
    }

    if ('ShoppingList' in window.localStorage) {
      // this.state.ShoppingList = JSON.parse(window.localStorage.getItem('ShoppingList'));
      this.props.setShoppingList(JSON.parse(window.localStorage.getItem('ShoppingList')));
    }
  }

 

  render() {
    return (
      <Layout>
        <Body
        />
        <Search/>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setResults: results =>
      dispatch({
        type: actionTypes.SET_RESULTS,
        results: results
      }),
    setFavorites: favorites => dispatch({ type: actionTypes.SET_FAVORITES, favorites: favorites }),
    setRecipe: recipe => dispatch({ type: actionTypes.SET_RECIPE, recipe: recipe }),
    setShoppingList: shoppingList => dispatch({ type: actionTypes.SET_SHOPPINGLIST, shoppingList })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
