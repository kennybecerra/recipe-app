import React, { Component } from "react";
import classes from "./ShoppingList.module.scss";
import ListItem from "./ListItem/ListItem";

class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let output =
      this.props.ShoppingList.length === 0
        ? null
        : this.props.ShoppingList.map((item, index) => {
            return (
              <ListItem
                key={index}
                index={index}
                {...item}
                handleDeleteFromSchoppingList={
                  this.props.handleDeleteFromSchoppingList
                }
                handleAmountChangeInShoppingList={
                  this.props.handleAmountChangeInShoppingList
                }
              />
            );
          });
    return (
      <div className={classes.Container}>
        <div className={classes.Container__TextContainer}>
          <h2 className={classes.Container__TextContainer__Text}>
            Shopping List
          </h2>
        </div>
        {output}
      </div>
    );
  }
}

export default ShoppingList;
