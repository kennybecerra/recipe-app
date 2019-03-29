import React from "react";
import Icon from "../../../UI/Icon/Icon";

const Ingredient = props => {
  return (
    <div>
      <Icon name="checkmark-outline" />
      <p>{props.ingredient}</p>
    </div>
  );
};

export default Ingredient;
