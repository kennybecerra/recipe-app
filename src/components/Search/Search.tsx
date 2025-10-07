import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
import * as actionsAsync from '../../store/actions/actionsAsync';
import Icon from '../UI/Icon/Icon';
import classes from './Search.module.scss';
import Favorites from './favorites/favorites';
import Modal from './../UI/Modal/Modal';
import ListItem from './../Body/ShoppingList/ListItem/ListItem';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleSearch(this.state.value);
  };

  handleModalToggle = () => {
    let newShow = !this.state.show;
    this.setState({
      show: newShow
    });
  };

  render() {
    return (
      <div className={classes.Container}>
        <div className={classes.CartContainer}>
          <Icon
            name='cart'
            className={classes.CartContainer__Icon}
            onClick={this.handleModalToggle}
          />
          <Modal show={this.state.show} toggleModal={this.handleModalToggle}>
            <div className={classes.InnerContainer}>
              <div className={classes.InnerContainer__TextContainer}>
                <h2 className={classes.InnerContainer__TextContainer__Text}>Shopping List</h2>
              </div>
              {this.props.shoppingList.length === 0
                ? null
                : this.props.shoppingList.map((item, index) => {
                    return (
                      <ListItem
                        key={index}
                        index={index}
                        {...item}
                        handleDeleteFromSchoppingList={this.props.handleDeleteFromSchoppingList}
                        handleAmountChangeInShoppingList={
                          this.props.handleAmountChangeInShoppingList
                        }
                      />
                    );
                  })}
            </div>
          </Modal>
        </div>

        <form onSubmit={this.handleSubmit} className={classes.FormContainer}>
          <input
            type='text'
            className={classes.FormContainer__TextField}
            onChange={this.handleChange}
            placeholder='Search over 1,000,000 recipes and more ....'
          />
          <button className={classes.FormContainer__ButtonField}>
            <Icon name='search' className={classes.FormContainer__ButtonField__Icon} />
            <span className={classes.FormContainer__ButtonField__Text}>SEARCH</span>
          </button>
        </form>

        <div className={classes.FavoritesContainer}>
          <Favorites
            favorites={this.props.favorites}
            handleRecipeSelect={this.props.handleRecipeSelect}
            recipe={this.props.recipe}
          />
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    shoppingList: state.shoppingList,
    recipe: state.currentRecipe,
    favorites: state.favorites
  }  
}

const mapDispatchToProps =  dispatch => {
  return {
    handleAmountChangeInShoppingList: () => dispatch({ type: actionTypes.ADD_TO_SHOPPINGLIST }),
    handleDeleteFromSchoppingList: index => dispatch({ type: actionTypes.REMOVE_FROM_SHOPPINGLIST, index }),
    handleSearch: value => dispatch(actionsAsync.fetchResults(value)),
    handleRecipeSelect: id => dispatch(actionsAsync.fetchRecipe(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
