import React, { Component } from "react";
import Result from "./Result/Result";
import classes from "./Results.module.scss";
import Spinner from "../../UI/Spinner/Spinner";
import Message from "./../../UI/Message/Message";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: 3
    };
  }

  ResultClickHandler = () => {};

  render() {
    let Results = <Message>Search for a recipe to load all the results</Message>; // <p> Please search for an item</p>;

    if (this.props.loading) {
      Results = <Spinner />;
    } else if (this.props.results.length !== 0) {
      Results = this.props.results.map(result => {
        return (
          <Result
            key={result.recipe_id}
            image={result.image_url}
            title={result.title}
            author={result.publisher}
            imageText={result.title}
            handleRecipeSelect={() =>
              this.props.handleRecipeSelect(result.recipe_id)
            }
            highlight={
              this.props.recipe
                ? this.props.recipe.recipe_id === result.recipe_id
                : false
            }
          />
        );
      });
    }

    return <div className={classes.Container}>{Results}</div>;
  }
}

export default Results;
