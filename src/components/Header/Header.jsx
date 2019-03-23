import React from 'react';
import searchLogo from "../../assets/svg/search.svg";
import recipeLogo from "../../assets/svg/recipe.svg";
import classes from "./Header.module.css";
const header = (props) => {

  return (
    <div className={classes.HeaderContainer}>

      {/* <div className={classes.ImageContainer}>
      </div> */}

      <img className={classes.RecipeLogo} src={recipeLogo} alt="knife and fork image" />

      <form action="" className={classes.FormContainer}>
        <input type="text" className={classes.TextField} name="" id="" placeholder="Search over 1,000,000 recipes and more ...." />
        <button className={classes.Button}>
          <img src={searchLogo} alt="" />
          <span>SEARCH</span>
        </button>
      </form>

      {/* <div className={classes.LikesContainer}></div> */}
      <img className={classes.RecipeLogo} src={recipeLogo} alt="knife and fork image" />
    </div>

  );

}

export default header;