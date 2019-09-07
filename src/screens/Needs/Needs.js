import React, { useState, useContext } from 'react';
import { D3Wrapper } from '@@components';
import { drawNeedsChart } from './utils';
import { Button } from 'semantic-ui-react';
import { LayoutContext } from '@@utils';
import { Box } from 'rebass';

export const Needs = () => {
  const { toggleSidebar } = useContext(LayoutContext);
  const [needs, setNeeds] = useState([
    { label: 'Hunger', value: 50 },
    { label: 'Thirst', value: 90 },
    { label: 'Comfort', value: 5 },
    { label: 'Cleanliness', value: 100 }
  ]);

  return (
    <>
      <h2>Needs</h2>
      <Button onClick={() => toggleSidebar(true)}>Customize</Button>
      <Box my={4}>
        <D3Wrapper draw={drawNeedsChart} needs={needs} id="bar-chart" />
      </Box>
    </>
  );
};
