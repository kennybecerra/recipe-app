import React from "react";
import classes from "./Message.module.scss";

const Message = props => {
  return (
    <div className={classes.Container}>
      <p className={classes.Container__Message}>{props.children}</p>
    </div>
  );
};

export default Message;
