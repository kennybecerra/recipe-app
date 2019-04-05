import React from "react";
import classes from "./favorite.module.scss";

const favorite = props => {
  return (
    <div
      className={classes.Container}
      onClick={props.handleRecipeSelect}
      style={props.highlight ? { backgroundColor: "#eeeeee" } : {}}
    >
      <div className={classes.Container__ImageContainer}>
        <img
          className={classes.Container__ImageContainer__Image}
          src={props.image}
          alt={props.imageText}
        />
      </div>
      <div className={classes.Container__TextContainer}>
        <h4 className={classes.Container__TextContainer__Title}>
          {props.title}
        </h4>
        <p className={classes.Container__TextContainer__Author}>
          {props.author}
        </p>
      </div>
    </div>
  );
};

export default favorite;
