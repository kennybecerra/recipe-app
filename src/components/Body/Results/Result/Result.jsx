import React from "react";
import classes from "./Result.module.scss";

const result = (props) => {

  return (
    <div className={classes.Container}>
      <div className={classes.Container__ImageContainer}>
        <img className={classes.Container__ImageContainer__Image} src={props.image} alt={props.imageText} />
      </div>
      <div className={classes.Container__TextContainer}>
        <h3>{props.title}</h3>
        <p>{props.author}</p>
      </div>
    </div>
  );
}

export default result;