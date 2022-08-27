import React, { useEffect, useState, useRef } from "react";
import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import { Contract, Provider } from "ethers-multicall";
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import web3 from "web3";
import { createWatcher } from "@makerdao/multicall";
import Home from "./home.js";
import { Routes, Route } from 'react-router-dom';

//const provider = new ethers.providers.JsonRpcProvider("https://cloudflare-eth.com");

{/* <img class="nav-logo" src="https://ipfs.io/ipfs/bafybeih3kt5woi6qcv72t23xf66hrwceseevvhdmpcwxj6l2eln6fqng4e/1.png"/></a> */}
const metadataPrefix = "https://live---metadata-5covpqijaa-uc.a.run.app/images/";
const infuraKey = 'e5b01b23b2c94aaa886e738f3eb50d0e';
const provider = new ethers.providers.InfuraProvider('rinkeby', infuraKey);

const killfeedMessages = ["was beat to a pulp by", "was Thanos snapped by", "got REKT by", "is ngmi because of", "got capped by", "took the L from", "felt the wrath of", "succumbed to the hands of"];
var killfeed = [];

//blockEventListener();


// const abiResponse
// const abi
// const address = '0x31184eb5f3b72509003c6dcfad01c537f0081337';
// const contractMulti = new Contract(address, abi);

// // ABI
// const abiResponse = await fetch("/config/abi.json", {
//                                                     headers: {
//                                                         "Content-Type": "application/json",
//                                                         Accept: "application/json",
//                                                     },
//                                                     });
// const abi = await abiResponse.json();

// // Provider
// const ethcallProvider = new Provider(provider);
// await ethcallProvider.init();

// // Get Data

// const address = '0x31184eb5f3b72509003c6dcfad01c537f0081337';
// const contractMulti = new Contract(address, abi);



// const compound = require("@ studydefi/money-legos/compound");
// const { accounts } = require("./accounts");
// const { Contract, Provider } = require('ethers-multicall');


// Contract addresses used in this example
// //const PREC = 6;
// const MKR_TOKEN = '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2';
// const MKR_WHALE = '0xf977814e90da44bfa03b6295a0616a897441acec';

// const PREC = 6;
// const USDC_TOKEN = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
// const USDC_WHALE = '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc';

// // Preset can be 'mainnet', 'kovan', 'rinkeby', 'goerli' or 'xdai'
// const config = {
//     rpcUrl: 'https://cloudflare-eth.com',
//     multicallAddress: '0x5ba1e12693dc8f9c48aad8770482f4739beed696'
// };
// // const config = { preset: 'mainnet' };

// // Create watcher

// const watcher = createWatcher(
//   [
//     {
//       target: USDC_TOKEN,
//       call: ['balanceOf(address)(uint256)', USDC_WHALE],
//       returns: [['BALANCE_OF_MKR_WHALE', val => val / 10 ** PREC]]
//     }
//   ],
//   config
// );

// // const watcher = createWatcher(
// //     [
// //       {
// //         target: USDC_TOKEN,
// //         call: ['balanceOf(address)(uint256)', USDC_WHALE],
// //         returns: [['BALANCE_OF_MKR_WHALE', val => val / 10 ** PREC]]
// //       },
// //       {
// //         call: ['getBlockHash(uint256)(bytes32)', 11482494],
// //         returns: [['SPECIFIC_BLOCK_HASH_0xFF4DB']]
// //       },
// //       {
// //         call: ['getLastBlockHash()(bytes32)'],
// //         returns: [['LAST_BLOCK_HASH']]
// //       },
// //       {
// //         call: ['getCurrentBlockTimestamp()(uint256)'],
// //         returns: [['CURRENT_BLOCK_TIMESTAMP']]
// //       },
// //       {
// //         call: ['getCurrentBlockDifficulty()(uint256)'],
// //         returns: [['CURRENT_BLOCK_DIFFICULTY']]
// //       },
// //       {
// //         call: ['getCurrentBlockGasLimit()(uint256)'],
// //         returns: [['CURRENT_BLOCK_GASLIMIT']]
// //       },
// //       {
// //         call: ['getCurrentBlockCoinbase()(address)'],
// //         returns: [['CURRENT_BLOCK_COINBASE']]
// //       }
// //     ],
// //     config
// //   );

// // Subscribe to state updates
// watcher.subscribe(update => {
//     console.log(`Update1: ${update.type} = ${update.value}`);
// });

// // Subscribe to batched state updates
// watcher.batch().subscribe(updates => {
//   // Handle batched updates here
//   // Updates are returned as { type, value } objects, e.g:
//   // { type: 'BALANCE_OF_MKR_WHALE', value: 70000 }
//     console.log(`Update2: ${updates.type} = ${updates.value}`);
// });

// // Subscribe to new block number updates
// watcher.onNewBlock(blockNumber => {
//   console.log('New block:', blockNumber);
// });

// // Start the watcher polling
// watcher.start();

const truncate = (input, len) =>
    input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  padding: 10px 15px;
  border-radius: 18px;
  border: none;
  background-color: #468400;
  font-weight: bold;
  color: black;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgb(70 130 0 / 0.7);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 100%;
  border: none;
  background-color: white;
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  color: black;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledLogo = styled.img`
  width: 70%;
  @media (min-width: 767px) {
    width: 500px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const LogoButtonImg = styled.img`

  margin: 30px;
  width: 48px;
  height: 48px;

`;

export const StyledImg = styled.img`

  border-radius: 50px;
  border: 5px #000000 solid;
  
  width: 250px;
  @media (min-width: 900px) {
    width: 100%;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
  @media (min-width: 1440px) {
    width: 500px;
  }
`;

export const StyledTeamImg = styled.img`

  border-radius: 8px;
  border: 6px #ffffff solid;
  width: 200px;
  @media (min-width: 900px) {
    width: 350px;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
`;

export const StyledHeader = styled.img`
  width: 45vw;
`;

export const StyledLink = styled.a`
  color: var(--primary-text);
  text-decoration: none;
`;

export const FooterLink = styled.a`
  text-decoration: none;
`;

export const FooterLogo = styled.img`
  width: 100px;
`;



function App() {
    return (
        <>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
        </Routes>
        </>
    );
}


export default App;

//[0xb7b19092bad498eae34230a9e14c8ce3d9d85b2bb91212108c9d47d1948acfeb,0x1f957db768cd7253fad82a8a30755840d536fb0ffca7c5c73fe9d815b1bc2f2f,0x924862b314bd38813a325167aca7caee16318f07303bd8e9f81bbe5808575fbf,0xe5076a139576746fd34a0fd9c21222dc274a909421fcbaa332a5af7272b6dcb1,0x148c730f8169681c1ebfb5626eb20af3d2351445463a1fdc5d0b116c62dc58c8,0x5712507eeb3d7b48e5876f21fc871656c2379464b480c8e89c50c2a1e8f58ac5]