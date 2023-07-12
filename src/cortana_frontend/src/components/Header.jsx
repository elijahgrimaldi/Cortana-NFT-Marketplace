import React from "react";
import logo from "../../assets/logo.png";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Minter from "./Minter";
import Gallery from "./Gallery";
import Home from "./Home"

function Header() {
  return (
    <BrowserRouter>
    <div className="app-root-1">
      <header className="Paper-root AppBar-root AppBar-positionStatic AppBar-colorPrimary Paper-elevation4">
        <div className="Toolbar-root Toolbar-regular header-appBar-13 Toolbar-gutters">
          <div className="header-left-4"></div>
          <Link to="/">
          <img className="header-logo-11" src={logo} />
          </Link>
          <div className="header-empty-6"></div>
          <div className="header-space-8"></div>
          <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
            <Link to="/discover">
            Discover
            </Link>
          </button>
          <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
          <Link to="/minter">
            Minter
          </Link>
          </button>
          <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
          <Link to="/collection">
            My NFTs
          </Link>
          </button>
        </div>
      </header>
    </div>
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/discover" element={<h1>Discover</h1>} />
        <Route path="/minter" element={<Minter />} />
        <Route path="/collection" element={<Gallery title="My NFTs"/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Header;
