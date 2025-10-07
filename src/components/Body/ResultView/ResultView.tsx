import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Auxilary from "../../../hoc/Auxilary/Auxilary";
import type { AppDispatch, RootState } from "../../../store";
import * as actionTypes from "../../../store/actions/actionTypes";
import Icon from "../../UI/Icon/Icon";
import Message from "./../../UI/Message/Message";
import Spinner from "./../../UI/Spinner/Spinner";
import Ingredient from "./Ingredients/Ingredient";
import classes from "./ResultView.module.scss";

const ResultView: React.FC = () => {
  // Redux hooks
  const recipe = useSelector((state: RootState) => state.currentRecipe);
  const servings = useSelector((state: RootState) => state.servings);
  const loading = useSelector((state: RootState) => state.loadingRecipe);
  const favorites = useSelector((state: RootState) => state.favorites);
  const dispatch = useDispatch<AppDispatch>();

  // Action handlers
  const handleServingChange = (direction: "increment" | "decrement") => {
    dispatch({ type: actionTypes.MODIFY_SERVINGS, direction });
  };

  const handleAddToFavorites = () => {
    dispatch({ type: actionTypes.MODIFY_FAVORITE });
  };

  const handleAddToShoppingList = () => {
    dispatch({ type: actionTypes.ADD_TO_SHOPPINGLIST });
  };

  let View = (
    <Message>Click on a recipe result to view the recipe ingredients</Message>
  );

  if (loading) {
    View = <Spinner />;
  } else if (recipe !== null) {
    View = (
      <Auxilary>
        <div className={classes.ImageContainer}>
          <img
            src={recipe.image}
            alt={recipe.label}
            className={classes.ImageContainer__Image}
          />
        </div>
        <div className={classes.InfoContainer}>
          <span className={classes.InfoContainer__Caption}>{recipe.label}</span>
          <div className={classes.InfoContainer__Time}>
            <Icon
              name="stopwatch"
              className={classes.InfoContainer__Time__Icon}
            />
            <p className={classes.InfoContainer__Time__Text}>
              {Math.floor(servings / 2) * 15} minutes
            </p>
          </div>
          <div className={classes.InfoContainer__Servings}>
            <Icon
              name="user"
              className={classes.InfoContainer__Servings__Icon}
            />
            <p className={classes.InfoContainer__Servings__Text}>
              {servings} servings
            </p>
            <Icon
              name="minus-solid"
              className={classes.InfoContainer__Servings__Icon}
              onClick={() => handleServingChange("decrement")}
            />
            <Icon
              name="add-solid"
              className={classes.InfoContainer__Servings__Icon}
              onClick={() => handleServingChange("increment")}
            />
          </div>
          <div className={classes.InfoContainer__Like}>
            <button className={classes.InfoContainer__Like__Button}>
              <Icon
                name={favorites[recipe.uri] ? "heart-solid" : "heart-outline"}
                className={classes.InfoContainer__Like__Button__Icon}
                onClick={handleAddToFavorites}
              />
            </button>
          </div>
        </div>
        <div className={classes.IngredientsContainer}>
          {recipe?.ingredients_formatted?.map((item, index) => {
            return (
              <Ingredient key={index} ingredient={item} servings={servings} />
            );
          })}
        </div>
        <div className={classes.ButtonContainer}>
          <button
            className={classes.ButtonContainer__Button}
            onClick={handleAddToShoppingList}
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
};

export default ResultView;
