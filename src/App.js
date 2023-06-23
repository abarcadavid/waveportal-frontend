import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import contractAbi from './utils/WavePortal.json';
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
    } catch (error) {
      console.log(`Error fetching account: ${error.code}: ${error.message}`);
    }
  }

  useEffect(() => {
    async function getAccount() {
      const account = await getMetaMaskAccount();
      if (account !== null) {
        setCurrentAccount(account);
      }
    }
    getAccount();
  }, []);

  const wave = async () => {
    try {
      const { ethereum } = window;
      // Provide a connection to the ethereum blockchain
      const provider = new ethers.BrowserProvider(ethereum);
      
      // Provide the ethereum account that 'logged in'
      const signer = await provider.getSigner();

      console.log(contractAbi)
      // Get access to the Wave Portal contract on the blockchain
      const wavePortalContract = new ethers.BaseContract(
        contractAddress,
        contractAbi,
        signer
      );

      // We can now call Wave Portal public functions!
      const count = await wavePortalContract.getTotalWaves();
      console.log("# of Waves: ", count);

      // Lets Wave. This should increase Wave Count as well.
      const waveTxn = await wavePortalContract.wave();
      console.log('MINING: ',waveTxn.hash);

      const receipt = await waveTxn.wait();
      console.log("Receipt of TXN: ", receipt);

    } catch(error) {
      console.log(error);
    }
  }
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        👋 Hey there!
        </div>

        <div className="bio">
        I am David and I worked at an AgTech Startup, that's pretty cool right? Connect your Ethereum wallet and wave at me!
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>
        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}
