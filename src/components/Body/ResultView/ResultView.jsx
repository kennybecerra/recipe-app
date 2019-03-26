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
        <p>This is result View</p>
      </div>
    );
  }
}

export default ResultView;