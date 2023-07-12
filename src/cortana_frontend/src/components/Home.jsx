import React from 'react'
import homeImage from "../../assets/home-img.png";


function Home() {
  return (
    <div> <img className="bottom-space" src={homeImage} /> 
    <p className="home-paragraph">
              The Internet Computer's largest digital marketplace for crypto
              collectibles and non-fungible tokens (NFTs). Buy, sell, and
              discover exclusive digital items.
    </p> </div>
  )
}

export default Home