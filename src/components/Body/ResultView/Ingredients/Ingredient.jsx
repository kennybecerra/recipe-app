import React from "react";
import Icon from "../../../UI/Icon/Icon";
import classes from "./Ingredient.module.scss";

const Ingredient = props => {
  return (
    <div className={classes.Container}>
      <Icon className={classes.Container__Icon} name="checkmark-outline" />
      <p className={classes.Container__Text} >{props.ingredient}</p>
    </div>
  );
};

export default Ingredient;
