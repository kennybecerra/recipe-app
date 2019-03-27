import React, { Component } from "react";
import Result from "./Result/Result";
import classes from "./Results.module.scss";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: 3
    };
  }

  ResultClickHandler = () => {
    
  }

  render() {

    const Results = this.props.results.length === 0 ? <p> Please search for an item</p> : this.props.results.map((result) => {
      return <Result
        key={result.recipe_id}
        image={result.image_url}
        title={result.title}
        author={result.publisher}
        imageText={result.title} />
    })

    return (
      <div className={classes.Container}>
        {Results}
      </div>
    );
  }
}

export default Results;
