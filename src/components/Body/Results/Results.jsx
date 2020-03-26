import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionsAsync from '../../../store/actions/actionsAsync';
import Result from './Result/Result';
import classes from './Results.module.scss';
import Spinner from '../../UI/Spinner/Spinner';
import Message from './../../UI/Message/Message';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: 3
    };
  }


  render() {
    let Results = <Message>Search for a recipe to load all the results</Message>;

    if (this.props.loading) {
      Results = <Spinner />;
    } else if (this.props.results.length !== 0) {
      Results = this.props.results.map((result, index) => {
        return (
          <Result
            key={index}
            image={result.image}
            title={result.label}
            author={result.source}
            imageText={result.label}
            handleRecipeSelect={() => this.props.handleRecipeSelect(result)}
            highlight={this.props.recipe ? this.props.recipe.label === result.label : false}
          />
        );
      });
    }

    return <div className={classes.Container}>{Results}</div>;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loadingResults,
    results: state.searchResults,
    recipe: state.currentRecipe
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleRecipeSelect: recipe => dispatch(actionsAsync.fetchRecipe(recipe)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);
