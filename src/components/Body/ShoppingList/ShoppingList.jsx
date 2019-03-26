import React, { Component } from "react";
import classes from "./ShoppingList.module.scss";

class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={classes.Container}>
        <p>This is the Shopping List</p>
      </div>
    );
  }
}

export default ShoppingList;