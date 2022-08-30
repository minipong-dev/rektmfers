import React, { useEffect, useState, useRef } from "react";
import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import { Contract, Provider } from "ethers-multicall";
// import { Next } from 'next';
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import web3 from "web3";
import { createWatcher } from "@makerdao/multicall";
import Moralis from 'moralis';


//const provider = new ethers.providers.JsonRpcProvider("https://cloudflare-eth.com");

{/* <img class="nav-logo" src="https://ipfs.io/ipfs/bafybeih3kt5woi6qcv72t23xf66hrwceseevvhdmpcwxj6l2eln6fqng4e/1.png"/></a> */}
// const metadataPrefix = "https://live---metadata-5covpqijaa-uc.a.run.app/images/";
const metadataPrefix = "https://bafybeidtmj43vnouepo23np5ip2amryf2m2dbrcpprqxlco7olb3aadmey.ipfs.nftstorage.link/";
const infuraKey = 'e5b01b23b2c94aaa886e738f3eb50d0e';
const provider = new ethers.providers.InfuraProvider('rinkeby', infuraKey);



function App({ nativeBalance, address }) {

    
    

    return (
        <s.Screen>
            <s.Container
                flex={1}
                ai={"center"}

                //image={CONFIG.SHOW_BACKGROUND ? "/config/images/bg.jpg" : null}
                image={CONFIG.SHOW_BACKGROUND ? null : null}

            >
                    <div>
                        <h3>Wallet: {address}</h3>
                        <h3>Native Balance: {nativeBalance} ETH</h3>
                    </div>
            </s.Container >
        </s.Screen >
    );
}

export async function getServerSideProps(context) {
    await Moralis.start({ apiKey: 'fMfdSmiYyai74YXWAV1AxqU99mohCSYgMGM9iMRuoiE6UKgm3bY6r77LtOCMTN4S' });

    const address = '0x...';

    const nativeBalance = await Moralis.EvmApi.account.getNativeBalance({
        address,
    });

    return {
        props: { address, nativeBalance: nativeBalance.result.balance.ether },
    };
}



export default App;

//[0xb7b19092bad498eae34230a9e14c8ce3d9d85b2bb91212108c9d47d1948acfeb,0x1f957db768cd7253fad82a8a30755840d536fb0ffca7c5c73fe9d815b1bc2f2f,0x924862b314bd38813a325167aca7caee16318f07303bd8e9f81bbe5808575fbf,0xe5076a139576746fd34a0fd9c21222dc274a909421fcbaa332a5af7272b6dcb1,0x148c730f8169681c1ebfb5626eb20af3d2351445463a1fdc5d0b116c62dc58c8,0x5712507eeb3d7b48e5876f21fc871656c2379464b480c8e89c50c2a1e8f58ac5]