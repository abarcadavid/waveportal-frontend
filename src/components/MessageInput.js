import React from 'react';
import { Button, Input } from "tiny-ui";

export default function MessageInput() {
  return(
    <Input.Group size='lg'>
      <Input/>
      <Input.Addon noBorder>
        <Button
          btnType="primary"
          style={
            {borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            marginRight: 0,
            }
          }>
          Wave!
        </Button>
      </Input.Addon>
    </Input.Group>
  )
}