import React from "react";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

function Header(props) {
  return (
    <>
      <header className={classes.header}>
        <h1>My Meals App</h1>
        <HeaderCartButton onClick={props.onClick}/>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="Table of meals!" />
      </div>
    </>
  );
}

export default Header;
