import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import homeImage from "../../assets/home-img.png";
import Item from "./Item";
import Minter from "./Minter";

function App() {

  // const NFTID = "ajuq4-ruaaa-aaaaa-qaaga-cai"
  return (
    <div className="App">
      <Header />
      {/* <Item id={NFTID}/> */}
      {/* <Minter /> */}
      <Footer />
      </div>
  );
}

export default App;
