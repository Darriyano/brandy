import { Link, useNavigate } from "react-router-dom";
import "../styles/headerstyles.css";
import React from "react";

const Header = () => {
  const navigate = useNavigate();


  return (
    <>
      <div className="header-container">
        <Link to="/">
          <div className="logo-block">FashionBox</div>
        </Link>

        <div className="list-links">
          <div onClick={() => navigate("/")}>All cards</div>
          <div onClick={() => navigate("/favs")}>My favourites</div>
          <div onClick={() => navigate("/add-card")}>+Custom thing</div>
          <div onClick={() => navigate("/about-us")}>About</div>
        </div>
      </div>
    </>
  );
};

export default Header;
