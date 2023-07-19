import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/nft";
import {cortana_backend} from "../../../declarations/cortana_backend";
import { Principal } from '@dfinity/principal';
import { Chart as ChartJS,
LineElement,
CategoryScale,
LinearScale,
PointElement,
Tooltip,
Legend} from 'chart.js';
import { Line } from 'react-chartjs-2';


function Inspect(props) {
    ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
    )
    const [name, setName] = useState();
    const [image, setImage] = useState();
    const [owner, setOwner] = useState();
    const [chartData, setChartData] = useState({});
    const [priceData, setPriceData] = useState([]);
    const params = useParams();
    const id = params.nftid
    console.log(id)
    const localHost = "http://localhost:8080/";
    const agent = new HttpAgent({ host: localHost });
    async function loadNFT() {
        const data = await cortana_backend.getSaleHistory(Principal.fromText(id));
        console.log(data)
        setPriceData(data);
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
          
        return (
            <div className="gallery-view">
            <h3 className="makeStyles-title-99 Typography-h3">{name}</h3>
            <div className="disGrid-root disGrid-container disGrid-spacing-xs-2">
              <div className="disGrid-root disGrid-item disGrid-grid-xs-12">
                <div className="disGrid-root disGrid-container disGrid-spacing-xs-5 disGrid-justify-content-xs-center">
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
                      </div>
                    </div>
                  </div>
                  <div className="disGrid-item">
                    {priceData.length > 0 && (
                      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
                      <Line
                        data={{
                            labels: priceData.map((data) => data[0]), // Date values
                            datasets: [
                            {
                                label: 'Price',
                                data: priceData.map((data) => data[1][0][0]), // Price values
                                fill: false,
                                borderColor: 'rgb(75, 192, 192)',
                                tension: 0.1,
                            },
                            ],
                        }}
                        />

                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          );
}
export default Inspect;