import React from "react";
import classes from "./Spinner.module.scss";

const Spinner: React.FC = () => {
  return <div className={classes.Loader}>Loading...</div>;
};

export default Spinner;
