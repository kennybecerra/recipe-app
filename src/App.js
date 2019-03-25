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
      searchVal: ""
    };
  }

  handleSearchSubmit = value => {
    this.setState({
      searchVal: value
    });
  };

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

  render() {
    return (
      <Layout>
        <Header handleSearch={this.handleSearchSubmit} />
        <Body />
      </Layout>
    );
  }
}

export default App;
