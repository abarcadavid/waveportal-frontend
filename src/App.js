import React, { useState, useEffect } from "react";
import { BrowserProvider, ethers } from "ethers";
import contractAbi from './utils/WavePortal.json';
import MessageInput from './components/MessageInput';
import InfoCard from "./components/InfoCard";
import ConnectWallet from "./components/ConnectWallet";
import { Divider } from 'tiny-ui';
import './App.css';

const getEthereumObject = () => window.ethereum;

// This function gets the user's account with the assumption that they have
// already authenticated and logged in before.
const getMetaMaskAccount = async () => {
  try {
    const ethereum = getEthereumObject();

    if (!ethereum) {
      console.log("No MetaMask wallet found!")
      return null;
    }

    console.log("We have the ethereum object: ", ethereum);
    const accounts = await ethereum.request({method: "eth_accounts"});

    if (accounts.length) {
      console.log("We found a valid accounts in the wallet");
      const account = accounts[0];
      return account;
    } else {
      console.log("No valid accounts found");
      return null;
    }

  } catch (error) {
    console.log("Error: ", error);
    return null;
  }
}

const contractAddress = '0xFBc4dC68A92c999D38c8c991d22E9280D253C66e';

export default function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [waves, setWaves] = useState([]);

  // Build the function with the assumption that we are already logged in.
  const getAllWaves = async () => {
    try {
      const ethereum = await getEthereumObject();
        if(ethereum) {
        const provider = new BrowserProvider(ethereum);
        const signer = await provider.getSigner();

        const wavePortalContract = new ethers.BaseContract(
          contractAddress,
          contractAbi,
          signer
        );

        const waveArray = await wavePortalContract.getWaves();

        const cleanArray = [];
        waveArray.forEach((wavetxn) => {
          cleanArray.push({
            waver: wavetxn.waver,
            timestamp: new Date(Number(wavetxn.timestamp) * 1000),
            message: wavetxn.message
          });
        });
        console.log('Wave Array We Got: ', cleanArray);
        setWaves(cleanArray);
      }

    } catch(error) {
      console.log(error);
    }
  }

  // This function is the 'action' of logging in.
  const connectWallet = async () => {
    try {
      const ethereum = await getEthereumObject();
      console.log("This is the Ethereum Object:", ethereum);

      if (!ethereum) {
        alert("Download Metamask!");
        return;
      }
      const accounts = await ethereum.request({method: "eth_requestAccounts"})
      setCurrentAccount(accounts[0]);
      getAllWaves();
      console.log(accounts)
    } catch (error) {
      console.log(`Error fetching account: ${error.code}: ${error.message}`);
    }
  }

  useEffect(() => {
    async function getAccount() {
      const account = await getMetaMaskAccount();
      if (account !== null) {
        setCurrentAccount(account);
        getAllWaves();
      }
    }
    getAccount();
  }, []);
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">

        <div className="header">
        👋 Hey there!
        </div>

        <div className="bio">
          I am David and I worked at an agricultural tech startup, that's pretty
          cool right?
          <br/>
          Connect your Ethereum wallet to be able to send a message
          that will be displayed below!
        </div>
        <Divider />
        
       {currentAccount ? (
        <>
          <MessageInput />
          <Divider />
          <InfoCard waveArray={waves} />
        </>
       ): (
        <ConnectWallet login={connectWallet} />
       )}
        
      </div>
    </div>
  );
}
