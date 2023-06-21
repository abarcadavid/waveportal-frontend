import React, { useState, useEffect } from "react";
import './App.css';

const getEthereumObject = () => window.ethereum;

// This function checks if we already have access to metamask account
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

      // Request and set user's first wallet account;
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

  const wave = () => {
    
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
