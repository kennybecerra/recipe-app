import React, { Component } from "react";
import classes from "./ResultView.module.scss";
import Auxilary from "../../../hoc/Auxilary/Auxilary";
import Icon from "../../UI/Icon/Icon";
import stopwatch from "../../../assets/svg/stopwatch.svg"

class ResultView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    let View = this.props.recipe === null ? <p> Please click on an recipe result</p> : <Auxilary>
      <div className={classes.ImageContainer}>
        <img
          src={this.props.recipe.image_url}
          alt={this.props.recipe.title}
          className={classes.ImageContainer__Image}
        />
        <span className={classes.ImageContainer__Caption}>
          {this.props.recipe.title}
        </span>
      </div>
      <div className={classes.InfoContainer}>
        <div className={classes.InfoContainer__Time}>

          <Icon name="cart" className={classes.InfoContainer__Time__SVG} />

          <p className={classes.InfoContainer__Time__Text}> 30 minutes</p>
        </div>
        <div className={classes.InfoContainer__Servings}>
          <img className={classes.InfoContainer__Servings__SVG} src="" alt="" />
          <p className={classes.InfoContainer__Servings__Text}>
            4 servings
          </p>
        </div>
        <div className={classes.InfoContainer__Like}>
          <button className={classes.InfoContainer__Like__Button}>
            <img className={classes.InfoContainer__Like__Button__Image} src="" alt="" />
          </button>
        </div>
      </div>
      <div className={classes.Container__IngredientsContainer} />
      <div className={classes.Container__ButtonContainer}>
        <button className={classes.Container__ButtonContainer__Button}>
          Add to SHopping List
        </button>
      </div>
    </Auxilary>


    return (
      <div className={classes.Container}>
        {View}
      </div>
    );
  }
}

export default ResultView;
