import React, { useState } from 'react';
import { ethers } from 'ethers';
import contractAbi from '../utils/WavePortal.json';
import { Button, Input } from "tiny-ui";

export default function MessageInput() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function wave(message) {
    const contractAddress = '0xFBc4dC68A92c999D38c8c991d22E9280D253C66e';
    try {
      // Set loading state
      setLoading(true);

      // Before attempting a wave txn, we have to grab the ethereum object
      const { ethereum } = window.ethereum;

      // We now need to provide a connection using a provider
      const provider = new ethers.BrowserProvider(ethereum);
  
      // We grab the signer(aka the account on the ethereum blockchain)
      const signer = await provider.getSigner();
  
      // Create an instance of the contract on the blockchain
      const wavePortalContract = new ethers.BaseContract(
        contractAddress,
        contractAbi,
        signer
      );
  
      // Attempt to wave(). This will alter the state of the contract so this 
      // results in a transaction
      const transaction = await wavePortalContract.wave(message);
      await transaction.wait();

  
    } catch(error) {
      alert(error);
    } finally{
      // Whatever the result, set loading back to false
      setLoading(false);
    }
  }

  return(
    <Input.Group size='lg'>
      <Input onChange={(e) => setMessage(e.target.value)}/>
      <Input.Addon noBorder>
        <Button
          btnType="primary"
          loading={loading}
          style={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            marginRight: 0,
            }}
          onClick={() => wave(message)}
          >
          Wave!
        </Button>
      </Input.Addon>
    </Input.Group>
  )
}