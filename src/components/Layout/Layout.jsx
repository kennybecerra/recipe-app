import React from "react";
import "./Layout.module.scss";

import classes from "./Layout.module.scss";
const layout = props => {
  return <div className={classes.Container}>{props.children}</div>;
};

export default layout;
