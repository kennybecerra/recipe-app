import React, { Component } from "react";
import searchLogo from "../../assets/svg/search.svg";
import recipeLogo from "../../assets/svg/recipe.svg";
import Icon from "../UI/Icon/Icon";
import classes from "./Search.module.scss";
import Favorites from "./favorites/favorites";
import Modal from "./../UI/Modal/Modal";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleSearch(this.state.value);
  };

  handleModalToggle = () => {
    let newShow = !this.state.show;
    this.setState({
      show: newShow
    });
  };

  render() {
    return (
      <div className={classes.Container}>
        <div className={classes.CartContainer}>
          <Icon
            name="cart"
            className={classes.CartContainer__Icon}
            onClick={this.handleModalToggle}
          />
          <Modal show={this.state.show} toggleModal={this.handleModalToggle}>
            <h2>This is the shopiing List</h2>
            <p>First Item</p>
          </Modal>
        </div>

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

        <div className={classes.FavoritesContainer}>
          <Favorites
            favorites={this.props.favorites}
            handleRecipeSelect={this.props.handleRecipeSelect}
            recipe={this.props.recipe}
          />
        </div>
      </div>
    );
  }
}

export default Search;
