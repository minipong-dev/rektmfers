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

async function Listener() {

    console.log("Listener started.");

    // ABI
    const abiResponse = await fetch("/config/abi.json", {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        });
    const abi = await abiResponse.json();

    // Provider
    const ethcallProvider = new Provider(provider);
    await ethcallProvider.init();

    // Get Data

    const address = "0x8e8ab455325cd5dce77d5adcfe81f4954fc80d18";
    const contractMulti = new ethers.Contract(address, abi, provider);
    console.log(blockchain.totalSupply);

    // const getSupply1 = await contractMulti.methods.totalSupply().call();
    // console.log("++");
    // console.log(getSupply1);

    contractMulti.on("FightResults", (_winner, _loser) => {
    // let info = {
    //     winner: winner,
    //     loser: loser
    // }
    // console.log(_winner.toNumber());
    // console.log(_loser.toNumber());

    // //const mintedSoFar = await blockchain.smartContract.methods.mintedCount(blockchain.account).call();

    // const getSupply = await contractMulti.methods.totalSupply().call();
    // console.log("++");
    // console.log(getSupply);

    const killMessage = "Player #" + _loser.toNumber() + " " + killfeedMessages[Math.ceil(Math.random() * 1000) % killfeedMessages.length]+ " "  + "Player #" + _winner.toNumber();
    const _killfeed = [...killfeed];
    const _newKillfeed = [killMessage].concat(_killfeed); // [ 4, 3, 2, 1 ]
    killfeed = _newKillfeed;


    console.log("Listening??");
    console.log(lbShowDead);
    console.log(blockchain.totalSupply);
    getData();
    testCheckTokens(lbShowDead);

    // console.log(killfeed);
    // const killMessage = "Player #15 " + killfeedMessages[Math.ceil(Math.random() * 1000) % killfeedMessages.length] + " Player #15";
    // const _killfeed = [...killfeed];
    // console.log(_killfeed);
    // const _newKillfeed = [killMessage].concat(_killfeed) // [ 4, 3, 2, 1 ]
    // console.log(_newKillfeed);

    // setKillfeed(_newKillfeed);
    // console.log(_newKillfeed);
    });

}

export default Listener