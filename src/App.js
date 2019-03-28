import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import Header from "./components/Header/Header";
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
      recipe: null
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

      console.log(this.state.recipe);
    }
  }

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
        this.setState({
          recipe: { ...response.data.recipe },
          loadingRecipe: false
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

  render() {
    return (
      <Layout>
        <Header handleSearch={this.handleSearchSubmit} />
        <Body
          results={this.state.results}
          loadingResults={this.state.loadingResults}
          handleRecipeSelect={this.handleRecipeSelect}
          recipe={this.state.recipe}
        />
      </Layout>
    );
  }
}

export default App;
