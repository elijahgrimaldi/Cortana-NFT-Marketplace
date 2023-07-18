import React, { useEffect, useState } from "react";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/nft";
import {cortana_backend} from "../../../declarations/cortana_backend";
import { Principal } from "@dfinity/principal";
import Button from "./Button";

function Item(props) {
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [owner, setOwner] = useState();
  const [button, setButton] = useState();
  const [priceInput, setPriceInput] = useState();
  const [listedPrice, setListedPrice] = useState();

  const id = props.id;

  const localHost = "http://localhost:8080/";
  const agent = new HttpAgent({ host: localHost });

  async function loadNFT() {
    const NFTActor = await Actor.createActor(idlFactory, {
      agent,
      canisterId: id,
    });

    const name = await NFTActor.getName();
    const owner = await NFTActor.getOwner();
    const imageData = await NFTActor.getAsset();
    const imageContent = new Uint8Array(imageData);
    const image = URL.createObjectURL(
      new Blob([imageContent.buffer], { type: "image/png" })
    );

    setName(name);
    setOwner(owner.toText());
    setImage(image);
  }

  useEffect(() => {
    loadNFT();
  }, []);

  useEffect(() => {
    if (owner) {
      if (props.sale && props.sale != "None"){
      setListedPrice(props.sale)
      setButton(<Button text="Buy" handleClick={handleBuy} />);
      }
      else{
      setButton(<Button text="Sell" handleClick={handleSell} />);
      }
    }

  }, [owner]);
  

  let price;
  async function handleConfirm(){
    await loadNFT()
    await cortana_backend.addToForSale(owner, id)
    const motokoPrice = price.toString();
    await cortana_backend.addSalePrice(id, motokoPrice)
    alert("NFT has been listed for sale!")
  }
  function handleSell(){
    setPriceInput(<input
      placeholder="Price"
      type="number"
      className="price-input"
      value={price}
      onChange={(e) => price=e.target.value}
    />);
    setButton(<Button text="Confirm" handleClick={handleConfirm}/>)
  }
  async function handleBuy(){
    await cortana_backend.removeFromSale(id)
    await cortana_backend.addToBoughtOwner(id)
    alert("NFT purcahsed!")
  }

  return (
    <div className="disGrid-item">
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={image}
        />
        <div className="disCardContent-root">
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            {name}
            <span className="purple-text"></span>
          </h2>
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
            Owner: {owner}
          </p>
          <div className="card-element">
            <p className="listed-price">{listedPrice}</p>
          </div>
          {priceInput}
          {button}
        </div>
      </div>

    </div>
  );
}

export default Item;
