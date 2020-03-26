import React, { Component } from "react";
import {connect} from "react-redux";
import * as actionTypes from '../../../store/actions/actionTypes';
import classes from "./ResultView.module.scss";
import Auxilary from "../../../hoc/Auxilary/Auxilary";
import Icon from "../../UI/Icon/Icon";
import Ingredient from "./Ingredients/Ingredient";
import Spinner from "./../../UI/Spinner/Spinner";
import Message from "./../../UI/Message/Message";

class ResultView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let View = (
      <Message>Click on a recipe result to view the recipe ingredients</Message>
    ); // <p> Please click on an recipe result</p>;

    if (this.props.loading) {
      View = <Spinner />;
    } else if (this.props.recipe !== null) {
      View = (
        <Auxilary>
          <div className={classes.ImageContainer}>
            <img
              src={this.props.recipe.image}
              alt={this.props.recipe.label}
              className={classes.ImageContainer__Image}
            />
          </div>
          <div className={classes.InfoContainer}>
            <span className={classes.InfoContainer__Caption}>
              {this.props.recipe.label}
            </span>
            <div className={classes.InfoContainer__Time}>
              <Icon
                name="stopwatch"
                className={classes.InfoContainer__Time__Icon}
              />
              <p className={classes.InfoContainer__Time__Text}>
                {Math.floor(this.props.servings / 2) * 15} minutes
              </p>
            </div>
            <div className={classes.InfoContainer__Servings}>
              <Icon
                name="user"
                className={classes.InfoContainer__Servings__Icon}
              />
              <p className={classes.InfoContainer__Servings__Text}>
                {this.props.servings} servings
              </p>
              <Icon
                name="minus-solid"
                className={classes.InfoContainer__Servings__Icon}
                onClick={() => {
                  this.props.handleServingChange("decrement");
                }}
              />
              <Icon
                name="add-solid"
                className={classes.InfoContainer__Servings__Icon}
                onClick={() => {
                  this.props.handleServingChange("increment");
                }}
              />
            </div>
            <div className={classes.InfoContainer__Like}>
              <button className={classes.InfoContainer__Like__Button}>
                <Icon
                  name={
                    this.props.favorites[this.props.recipe.uri]
                      ? "heart-solid"
                      : "heart-outline"
                  }
                  className={classes.InfoContainer__Like__Button__Icon}
                  onClick={this.props.handleAddToFavorites}
                />
              </button>
            </div>
          </div>
          <div className={classes.IngredientsContainer}>
            {this.props.recipe.transformedIngredients.map((item, index) => {
              return (
                <Ingredient
                  key={index}
                  ingredient={item}
                  servings={this.props.servings}
                />
              );
            })}
          </div>
          <div className={classes.ButtonContainer}>
            <button
              className={classes.ButtonContainer__Button}
              onClick={this.props.handleAddToShoppingList}
            >
              <Icon
                name="cart"
                className={classes.ButtonContainer__Button__Icon}
              />
              <p className={classes.ButtonContainer__Button__Text}>
                add to shopping list
              </p>
            </button>
          </div>
        </Auxilary>
      );
    }

    return <div className={classes.Container}>{View}</div>;
  }
}


const mapStateToProps = state => {
  return {
    recipe: state.currentRecipe,
    servings: state.servings,
    loading: state.loadingRecipe,
    favorites: state.favorites,
  }  
}

const mapDispatchToProps = dispatch => {
  return {
    handleServingChange : (direction) =>  dispatch({ type: actionTypes.MODIFY_SERVINGS, direction: direction}),
    handleAddToFavorites: () => dispatch({ type: actionTypes.MODIFY_FAVORITE}),
    handleAddToShoppingList: () => dispatch({type: actionTypes.ADD_TO_SHOPPINGLIST})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ResultView);
