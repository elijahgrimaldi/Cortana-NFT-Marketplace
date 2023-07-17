import React from 'react'
import homeImage from "../../assets/home-img.png";


function Home() {
  return (
    <div> <img className="bottom-space" src={homeImage} /> 
    <p className="home-paragraph">
              A digital marketplace for non-fungible tokens.
    </p> </div>
  )
}

export default Home