import React from "react";
import classes from "./Result.module.scss";

interface ResultProps {
  image: string;
  title: string;
  author: string;
  imageText: string;
  handleRecipeSelect: () => void;
  highlight: boolean;
}

const Result: React.FC<ResultProps> = (props) => {
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

export default Result;
