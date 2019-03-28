import React from "react";
import classes from "./Body.module.scss";
import Results from "./Results/Results";
import ResultView from "./ResultView/ResultView";
import ShoppingList from "./ShoppingList/ShoppingList";

const body = props => {
  return (
    <div className={classes.BodyContainer}>
      <ResultView recipe={props.recipe} />
      <Results
        results={props.results}
        loading={props.loadingResults}
        handleRecipeSelect={props.handleRecipeSelect}
      />
      <ShoppingList />
    </div>
  );
};

export default body;
