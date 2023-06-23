import React from 'react';
import { Card } from 'tiny-ui';

export default function InfoCard({ waveArray }) {
  return waveArray.map((wave, index) => {
    return(
      <Card key={index} title='Messages Stored in the Contract'>
        <Card.Content>
          <Card title={`From: ${wave.waver}`}>
            <Card.Content>
              <div>Timestamp: {wave.timestamp.toString()}</div>
              <div>Message: {wave.message}</div>
            </Card.Content>
          </Card>
        </Card.Content>
      </Card>
    );
  });
}