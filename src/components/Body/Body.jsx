import React from "react";
import classes from "./Body.module.scss";
import Results from "./Results/Results";
import ResultView from "./ResultView/ResultView";
import ShoppingList from "./ShoppingList/ShoppingList";

const body = props => {
  return (
    <div className={classes.Container}>
      <ResultView
        recipe={props.recipe}
        servings={props.servings}
        loading={props.loadingRecipe}
        handleServingChange={props.handleServingChange}
        handleAddToFavorites={props.handleAddToFavorites}
        favorites={props.favorites}
      />
      <Results
        results={props.results}
        loading={props.loadingResults}
        handleRecipeSelect={props.handleRecipeSelect}
        recipe={props.recipe}
      />
      <ShoppingList />
    </div>
  );
};

export default body;
