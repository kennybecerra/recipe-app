import React from "react";
import classes from "./Body.module.scss";
import Results from "./Results/Results";
import ResultView from "./ResultView/ResultView";
import ShoppingList from "./ShoppingList/ShoppingList";

const body = props => {
  return (
    <div className={classes.Container}>
      <ResultView/>
      <Results />
      <ShoppingList/>
    </div>
  );
};

export default body;
