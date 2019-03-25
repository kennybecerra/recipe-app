import React, { Component } from "react";
import searchLogo from "../../assets/SVG/search.svg";
import recipeLogo from "../../assets/SVG/recipe.svg";
import classes from "./Header.module.scss";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleSearch(this.state.value);
  };

  render() {
    return (
      <div className={classes.HeaderContainer}>
        <img
          className={classes.RecipeLogo}
          src={recipeLogo}
          alt="knife and fork"
        />

        <form onSubmit={this.handleSubmit} className={classes.FormContainer}>
          <input
            type="text"
            className={classes.FormContainer__TextField}
            onChange={this.handleChange}
            placeholder="Search over 1,000,000 recipes and more ...."
          />
          <button className={classes.FormContainer__ButtonField}>
            <img
              className={classes.FormContainer__ButtonField__Image}
              src={searchLogo}
              alt=""
            />
            <span className={classes.FormContainer__ButtonField__Text}>
              SEARCH
            </span>
          </button>
        </form>

        {/* <div className={classes.LikesContainer}></div> */}
        <img
          className={classes.RecipeLogo}
          src={recipeLogo}
          alt="knife and fork"
        />
      </div>
    );
  }
}

export default Header;
