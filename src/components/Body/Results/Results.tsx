import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import * as actionsAsync from "../../../store/actions/actionsAsync";
import Spinner from "../../UI/Spinner/Spinner";
import Message from "./../../UI/Message/Message";
import Result from "./Result/Result";
import classes from "./Results.module.scss";

const Results: React.FC = () => {
  // Redux hooks
  const loading = useSelector((state: RootState) => state.loadingResults);
  const results = useSelector((state: RootState) => state.searchResults);
  const recipe = useSelector((state: RootState) => state.currentRecipe);
  const dispatch = useDispatch<AppDispatch>();

  // Action handler
  const handleRecipeSelect = (selectedRecipe: any) => {
    dispatch(actionsAsync.fetchRecipe(selectedRecipe));
  };

  let ResultsContent: React.ReactNode = (
    <Message>Search for a recipe to load all the results</Message>
  );

  if (loading) {
    ResultsContent = <Spinner />;
  } else if (results.length !== 0) {
    ResultsContent = (
      <>
        {results.map((result, index) => {
          return (
            <Result
              key={index}
              image={result.image}
              title={result.label}
              author="Tasty Recipe"
              imageText={result.label}
              handleRecipeSelect={() => handleRecipeSelect(result)}
              highlight={recipe ? recipe.label === result.label : false}
            />
          );
        })}
      </>
    );
  }

  return <div className={classes.Container}>{ResultsContent}</div>;
};

export default Results;
