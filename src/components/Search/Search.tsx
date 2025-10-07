import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import * as actionTypes from "../../store/actions/actionTypes";
import * as actionsAsync from "../../store/actions/actionsAsync";
import Icon from "../UI/Icon/Icon";
import ListItem from "./../Body/ShoppingList/ListItem/ListItem";
import Modal from "./../UI/Modal/Modal";
import classes from "./Search.module.scss";
import Favorites from "./favorites/favorites";

const Search: React.FC = () => {
  // Local state
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");

  // Redux hooks
  const shoppingList = useSelector((state: RootState) => state.shoppingList);
  const recipe = useSelector((state: RootState) => state.currentRecipe);
  const favorites = useSelector((state: RootState) => state.favorites);
  const dispatch = useDispatch<AppDispatch>();

  // Event handlers
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(actionsAsync.fetchResults(value));
  };

  const handleModalToggle = () => {
    setShow(!show);
  };

  const handleDeleteFromShoppingList = (index: number) => {
    dispatch({ type: actionTypes.REMOVE_FROM_SHOPPINGLIST, index });
  };

  const handleAmountChangeInShoppingList = () => {
    dispatch({ type: actionTypes.ADD_TO_SHOPPINGLIST });
  };

  const handleRecipeSelect = (selectedRecipe: any) => {
    dispatch(actionsAsync.fetchRecipe(selectedRecipe));
  };

  return (
    <div className={classes.Container}>
      <div className={classes.CartContainer}>
        <Icon
          name="cart"
          className={classes.CartContainer__Icon}
          onClick={handleModalToggle}
        />
        <Modal show={show} toggleModal={handleModalToggle}>
          <div className={classes.InnerContainer}>
            <div className={classes.InnerContainer__TextContainer}>
              <h2 className={classes.InnerContainer__TextContainer__Text}>
                Shopping List
              </h2>
            </div>
            {shoppingList.length === 0
              ? null
              : shoppingList.map((item, index) => {
                  return (
                    <ListItem
                      key={index}
                      index={index}
                      {...item}
                      handleDeleteFromShoppingList={
                        handleDeleteFromShoppingList
                      }
                      handleAmountChangeInShoppingList={
                        handleAmountChangeInShoppingList
                      }
                    />
                  );
                })}
          </div>
        </Modal>
      </div>

      <form onSubmit={handleSubmit} className={classes.FormContainer}>
        <input
          type="text"
          className={classes.FormContainer__TextField}
          onChange={handleChange}
          value={value}
          placeholder="Search over 1,000,000 recipes and more ...."
        />
        <button className={classes.FormContainer__ButtonField}>
          <Icon
            name="search"
            className={classes.FormContainer__ButtonField__Icon}
          />
          <span className={classes.FormContainer__ButtonField__Text}>
            SEARCH
          </span>
        </button>
      </form>

      <div className={classes.FavoritesContainer}>
        <Favorites
          favorites={favorites}
          handleRecipeSelect={handleRecipeSelect}
          recipe={recipe}
        />
      </div>
    </div>
  );
};

export default Search;
