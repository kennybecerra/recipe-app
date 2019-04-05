import React, { Component } from "react";
import classes from "./favorites.module.scss";
import Icon from "../../UI/Icon/Icon";
import Favorite from "./favorite/favorite";

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  handleClick = () => {
    let newState = !this.state.show;

    this.setState({
      show: newState
    });
  };

  render() {
    return (
      <div className={classes.Container}>
        <Icon
          name="heart-solid"
          className={classes.Container__Icon}
          onClick={this.handleClick}
        />
        <div
          style={
            this.state.show
              ? {
                  height: "300px",
                  opacity: "1",
                  transition: "height 1s ease, opacity 0.7s ease"
                }
              : {}
          }
          className={`${classes.Container__Dropdown} ${
            false ? classes.alternate : ""
          }`}
        >
          {Object.keys(this.props.favorites).map(recipeID => {
            return (
              <Favorite
                key={recipeID}
                image={this.props.favorites[recipeID].image_url}
                title={this.props.favorites[recipeID].title}
                author={this.props.favorites[recipeID].publisher}
                imageText={this.props.favorites[recipeID].title}
                handleRecipeSelect={() => {
                  this.props.handleRecipeSelect(recipeID);
                }}
                highlight={this.props.recipe.recipe_id === recipeID}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Favorites;
