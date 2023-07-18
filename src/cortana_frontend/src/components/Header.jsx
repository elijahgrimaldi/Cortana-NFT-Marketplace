import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Minter from "./Minter";
import Gallery from "./Gallery";
import Home from "./Home"
import { cortana_backend } from "../../../declarations/cortana_backend"
import CURRENT_USER_ID from "../index";
import Discover from "./Discover";

function Header() {

  const [userOwnedGallery, setOwnedGallery] = useState();
  const [forSalePage, setForSalePage] = useState();

  async function getNFTs(){
    const userNFTIds = await cortana_backend.getOwnedNFTs(CURRENT_USER_ID);
    const forSaleNFTs = await cortana_backend.getForSale();
    setOwnedGallery(<Gallery title="My NFTs" ids={userNFTIds} />);
    setForSalePage(<Discover title="Discover" ids={forSaleNFTs}/>);

  }

  useEffect(() => {
    getNFTs();
  }, []);



  return (
    <BrowserRouter forceRefresh={true}>
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
        <Route path="/discover" element={forSalePage} />
        <Route path="/minter" element={<Minter />} />
        <Route path="/collection" element={userOwnedGallery} />
      </Routes>
    </BrowserRouter>
  );
}

export default Header;
