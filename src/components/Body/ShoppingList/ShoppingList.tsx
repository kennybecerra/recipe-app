import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Auxilary from "../../../hoc/Auxilary/Auxilary";
import type { AppDispatch, RootState } from "../../../store";
import * as actionTypes from "../../../store/actions/actionTypes";
import Message from "./../../UI/Message/Message";
import ListItem from "./ListItem/ListItem";
import classes from "./ShoppingList.module.scss";

const ShoppingList: React.FC = () => {
  // Redux hooks
  const shoppingList = useSelector((state: RootState) => state.shoppingList);
  const dispatch = useDispatch<AppDispatch>();

  // Action handlers
  const handleDeleteFromShoppingList = (index: number) => {
    dispatch({ type: actionTypes.REMOVE_FROM_SHOPPINGLIST, index });
  };

  const handleAmountChangeInShoppingList = (
    direction: "increase" | "decrease",
    index: number
  ) => {
    dispatch({
      type: actionTypes.MODIFY_WITHIN_SHOPPINGLIST,
      direction,
      index,
    });
  };

  let output =
    shoppingList.length === 0 ? (
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
        {shoppingList.map((item, index) => {
          return (
            <ListItem
              key={index}
              index={index}
              {...item}
              handleDeleteFromShoppingList={handleDeleteFromShoppingList}
              handleAmountChangeInShoppingList={
                handleAmountChangeInShoppingList
              }
            />
          );
        })}
      </Auxilary>
    );

  return <div className={classes.Container}>{output}</div>;
};

export default ShoppingList;
