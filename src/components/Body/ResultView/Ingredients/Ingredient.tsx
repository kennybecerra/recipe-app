import React from "react";
import Icon from "../../../UI/Icon/Icon";
import classes from "./Ingredient.module.scss";

interface IngredientItem {
  text: string;
  amount: number; // ingredient amount
  name: string; // ingredient name
  metric: string; // ingredient metric
}

interface IngredientProps {
  ingredient: IngredientItem;
  servings: number;
}

const Ingredient: React.FC<IngredientProps> = ({ ingredient, servings }) => {
  return (
    <div className={classes.Container}>
      <Icon className={classes.Container__Icon} name="checkmark-outline" />
      <p className={classes.Container__Text}>
        {ingredient.amount * servings} : {ingredient.metric} : {ingredient.name}
      </p>
    </div>
  );
};

export default Ingredient;
