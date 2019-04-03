import React, { Component } from "react";
import classes from "./favorites.module.scss";
import Icon from "../../UI/Icon/Icon";

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  render() {
    return (
      <div className={classes.Container}>
        <Icon name="heart-solid" className={classes.Container__Icon} />
        <div className={classes.Container__Dropdown}>
          <p className={classes.Container__Dropdown__Text}>This is my text</p>
          <p className={classes.Container__Dropdown__Text}>This is my text</p>
          <p className={classes.Container__Dropdown__Text}>This is my text</p>
          <p className={classes.Container__Dropdown__Text}>This is my text</p>
        </div>

      </div>
    );
  }
}

export default Favorites;
