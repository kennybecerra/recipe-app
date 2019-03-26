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
      loading: false,
      results: []
    };
  }

  handleSearchSubmit = value => {
    this.setState({
      currentSearch: value,
      loading: true
    });

    axios
      .get(
        `https://www.food2fork.com/api/search?key=97ace3f52f4192cd1500766f6c13eece&q${
        value
        }`
      )
      .then(response => {
        console.log("this is the response");
        console.log(response.data);
        this.setState({
          results: response.data.recipes
        })
      })
      .catch(err => {
        console.log("There was an error", err);
      });

  };

  /*
  componentDidUpdate() {
    axios
      .get(
        `https://www.food2fork.com/api/search?key=97ace3f52f4192cd1500766f6c13eece&q${
        this.state.searchVal
        }`
      )
      .then(response => {
        console.log("this is the response");
        console.log(response);
      })
      .catch(err => {
        console.log("There was an error", err);
      });
  }
  */

  render() {
    return (
      <Layout>
        <Header handleSearch={this.handleSearchSubmit} />
        <Body results={this.state.results} />
      </Layout>
    );
  }
}

export default App;
