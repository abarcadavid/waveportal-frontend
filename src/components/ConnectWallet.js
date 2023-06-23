import React from 'react';
import { Button } from 'tiny-ui';

export default function ConnectWallet({ login }) {
  return(
    <Button btnType='primary' onClick={login}>Connect Wallet</Button>
  )
}