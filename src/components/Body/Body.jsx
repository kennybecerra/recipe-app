import React from "react";
import classes from "./Body.module.scss";
import Results from "./Results/Results";
import ResultView from "./ResultView/ResultView";
import ShoppingList from "./ShoppingList/ShoppingList";



const body = props => {
  return (
    <div className={classes.BodyContainer}>
      <ResultView />
      <Results results={props.results} />
      <ShoppingList />
    </div>
  );
};

export default body;
