import React, { useEffect, useState } from "react";
import { cortana_backend } from "../../../declarations/cortana_backend/index";
import Item from "./Item";

function Discover(props) {
    
  const [items, setItems] = useState();

  async function fetchNFTs() {
    if (props.ids !== undefined) {
      const items = await Promise.all(
        props.ids.map(async (NFTId) => {
          const NFTprice = await cortana_backend.getSalePrice(NFTId);
          return <Item sale={NFTprice} id={NFTId} key={NFTId.toText()} />;
        })
      );
      setItems(items);
    }
  }
  

  useEffect( () => {
    fetchNFTs();
  }, [])

  return (
    <div className="gallery-view">
      <h3 className="makeStyles-title-99 Typography-h3">{props.title}</h3>
      <div className="disGrid-root disGrid-container disGrid-spacing-xs-2">
        <div className="disGrid-root disGrid-item disGrid-grid-xs-12">
          <div className="disGrid-root disGrid-container disGrid-spacing-xs-5 disGrid-justify-content-xs-center">
          {items}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Discover