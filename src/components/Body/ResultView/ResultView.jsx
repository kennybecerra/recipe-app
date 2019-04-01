import React, { Component } from "react";
import classes from "./ResultView.module.scss";
import Auxilary from "../../../hoc/Auxilary/Auxilary";
import Icon from "../../UI/Icon/Icon";
import Ingredient from "./Ingredients/Ingredient";
import Spinner from "./../../UI/Spinner/Spinner";

class ResultView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let View = <p> Please click on an recipe result</p>;

    if (this.props.loading) {
      View = <Spinner />;
    } else if (this.props.recipe !== null) {
      View = (
        <Auxilary>
          <div className={classes.ImageContainer}>
            <img
              src={this.props.recipe.image_url}
              alt={this.props.recipe.title}
              className={classes.ImageContainer__Image}
            />
          </div>
          <div className={classes.InfoContainer}>
            <span className={classes.InfoContainer__Caption}>
              {this.props.recipe.title}
            </span>
            <div className={classes.InfoContainer__Time}>
              <Icon
                name="stopwatch"
                className={classes.InfoContainer__Time__Icon}
              />
              <p className={classes.InfoContainer__Time__Text}> 30 minutes</p>
            </div>
            <div className={classes.InfoContainer__Servings}>
              <Icon
                name="user"
                className={classes.InfoContainer__Servings__Icon}
              />
              <p className={classes.InfoContainer__Servings__Text}>
                4 servings
              </p>
              <Icon
                name="minus-solid"
                className={classes.InfoContainer__Servings__Icon}
                onClick={() => {
                  //this.props.handleServingChange("decrement");
                }}
              />
              <Icon
                name="add-solid"
                className={classes.InfoContainer__Servings__Icon}
                onClick={() => {
                  //this.props.handleServingChange("increment");
                }}
              />
            </div>
            <div className={classes.InfoContainer__Like}>
              <button className={classes.InfoContainer__Like__Button}>
                <Icon
                  name="heart-solid"
                  className={classes.InfoContainer__Like__Button__Icon}
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
            <button className={classes.ButtonContainer__Button}>
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

export default ResultView;
