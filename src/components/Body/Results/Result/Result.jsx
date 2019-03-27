import React from "react";
import classes from "./Result.module.scss";

const result = props => {
  function ResultClickHandler(e) {
    console.log(e);
  }

  return (
    <div className={classes.Container} onClick={ResultClickHandler}>
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

export default result;
