import React, { Component } from "react";
import classes from "./ShoppingList.module.scss";
import ListItem from "./ListItem/ListItem";
import Message from "./../../UI/Message/Message";
import Auxilary from "../../../hoc/Auxilary/Auxilary";

class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let output =
      this.props.ShoppingList.length === 0 ? (
        <Message>
          If you like a recipe, add the ingredients to your shopping list
        </Message>
      ) : (
        <Auxilary>
          <div className={classes.Container__TextContainer}>
            <h2 className={classes.Container__TextContainer__Text}>
              Shopping List
            </h2>
          </div>
          {this.props.ShoppingList.map((item, index) => {
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
          })}
        </Auxilary>
      );
    return <div className={classes.Container}>{output}</div>;
  }
}

export default ShoppingList;
