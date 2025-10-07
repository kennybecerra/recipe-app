import React from "react";
import classes from "./Message.module.scss";

interface MessageProps {
  children: React.ReactNode;
}

const Message: React.FC<MessageProps> = ({ children }) => {
  return (
    <div className={classes.Container}>
      <p className={classes.Container__Message}>{children}</p>
    </div>
  );
};

export default Message;
