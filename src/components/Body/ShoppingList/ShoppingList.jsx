import React, { Component } from "react";
import {connect} from "react-redux";
import * as actionTypes from '../../../store/actions/actionTypes';
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
      this.props.shoppingList.length === 0 ? (
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
          {this.props.shoppingList.map((item, index) => {
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

const mapStateToProps = state => {
  return {
    shoppingList: state.shoppingList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleDeleteFromSchoppingList: index => dispatch({ type: actionTypes.REMOVE_FROM_SHOPPINGLIST, index }),
    handleAmountChangeInShoppingList: (direction, index) => dispatch({ type: actionTypes.MODIFY_WITHIN_SHOPPINGLIST, direction, index })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);
