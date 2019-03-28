import React, { Component } from "react";
import classes from "./ResultView.module.scss";

class ResultView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={classes.Container}>
        <div className={classes.Container__ImageContainer}>
          <img
            src={this.props.recipe.image_url}
            alt=""
            className={classes.Container__ImageContainer__Image}
          />
          <span className={classes.Container__ImageContainer__Caption}>
            {this.props.recipe.title}
          </span>
        </div>
        <div className={classes.Container__InfoContainer} />
        <div className={classes.Container__IngredientsContainer} />
        <div className={classes.Container__ButtonContainer}>
          <button className={classes.Container__ButtonContainer__Button}>
            Add to SHopping List
          </button>
        </div>
      </div>
    );
  }
}

export default ResultView;
