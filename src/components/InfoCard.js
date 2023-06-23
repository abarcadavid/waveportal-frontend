import React from 'react';
import { Card, Typography, Popover, Button} from 'tiny-ui';
const { Text } = Typography;

export default function InfoCard({ waveArray }) {
  return waveArray.map((wave, index) => {
    return(
      <Card key={index} title='Messages Stored in the Contract'>
        <Card.Content>
          <Card
            title={`From: ${wave.waver}`}
            extra={
              <Popover trigger="hover" content={wave.timestamp.toString()}>
                <Button>Timestamp</Button>
              </Popover>
            }>
            <Card.Content>
              <Text strong>Message: </Text>
              <Text>{wave.message}</Text>
            </Card.Content>
          </Card>
        </Card.Content>
      </Card>
    );
  });
}