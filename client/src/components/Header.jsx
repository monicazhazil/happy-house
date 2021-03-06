import React from "react";
import "./styles/main.css";
import { Link } from "react-router-dom";
import wall from "../assets/icons/wall.svg";
import icon from "../assets/icons/hh-landing.svg";
import menu from "../assets/icons/menu.svg";
import usericon from "../assets/icons/user3.svg";

function Header(props) {
  // Display Menu Preview on Click event
  let menuPreview = (event) => {
    event.preventDefault();
    toggleMenu();
  };

  // Toggle Method to close Menu on click event
  let toggleMenu = () => {
    let menu = document.getElementsByClassName("menu")[0];
    if (menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
    }
  };

  // Log Out Method to set a blank State
  let logOut = () => {
    props.updateHouseHandler({
      id: "",
      houseName: "",
      users: [],
      toDos: [],
      comments: [],
    });
    props.userStateUpdateMethod({
      id: "",
      userName: "",
      email: "",
      password: "",
      houseName: "",
      color: "",
    });
  };

  return (
    <header className="header">
      <div className="header__wall">
        <Link className="header__wall--link" to={`/dashboard/wall`}>
          <img className="header__wall--icon" src={wall} alt="" />
        </Link>
      </div>
      <div className="header__dashboard">
        <Link className="header__dashboard--link" to={`/dashboard`}>
          <img className="header__dashboard--icon" src={icon} alt="" />
        </Link>
      </div>
      <div className="header__menu">
        <button className="header__cta" onClick={menuPreview}>
          <img className="header__cta--img" src={menu} alt="" />
        </button>
        <div className="menu">
          <div className="menu__wrapper">
            <img className="menu__wrapper--icon" src={usericon} alt="" />
            <h3 className="menu__wrapper--user-name">{props.user.userName}</h3>
          </div>
          <div className="menu__options">
            <Link
              className="menu__options--link"
              to={`/dashboard/profile`}
              onClick={toggleMenu}
            >
              <button className="menu__options--btn">My Profile</button>
            </Link>
            <Link
              className="menu__options--link"
              to={`/dashboard/my-house`}
              onClick={toggleMenu}
            >
              <button className="menu__options--btn">
                {props.house.houseName}
              </button>
            </Link>
            <Link className="menu__options--link" to={`/`} onClick={logOut}>
              <button className="menu__options--btn">Log Out</button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
