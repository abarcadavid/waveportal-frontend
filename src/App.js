import React, { useState, useEffect } from "react";
import './App.css';

const getEthereumObject = () => window.ethereum;

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

  useEffect(() => {
    getMetaMaskAccount().then((account) => {
      // If there is a valid account, set the account state
      if (account) {
        setCurrentAccount(account);
      }
    });
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
      </div>
    </div>
  );
}
