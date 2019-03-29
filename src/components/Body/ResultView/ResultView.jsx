import React, { Component } from "react";
import classes from "./ResultView.module.scss";
import Auxilary from "../../../hoc/Auxilary/Auxilary";
import Icon from "../../UI/Icon/Icon";
import Ingredient from "./Ingredients/Ingredient";

class ResultView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let View =
      this.props.recipe === null ? (
        <p> Please click on an recipe result</p>
      ) : (
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
                />
                <Icon
                  name="add-solid"
                  className={classes.InfoContainer__Servings__Icon}
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
              {this.props.recipe.ingredients.map((item, index) => {
                return <Ingredient key={index} ingredient={item} />
              })}
            </div>
            <div className={classes.Container__ButtonContainer}>
              <button className={classes.Container__ButtonContainer__Button}>
                Add to SHopping List
            </button>
            </div>
          </Auxilary>
        );

    return <div className={classes.Container}>{View}</div>;
  }
}

export default ResultView;
