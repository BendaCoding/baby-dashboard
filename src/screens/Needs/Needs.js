import React, { useState, useContext } from 'react';
import { D3Wrapper } from '@@components';
import { drawNeeds, updateNeeds } from './d3';
import { Button } from 'semantic-ui-react';
import { LayoutContext } from '@@utils';
import { Box } from 'rebass';
import { useInterval } from '@@hooks/';
import * as U from './utils';

export const Needs = () => {
  const { toggleSidebar } = useContext(LayoutContext);
  const [needs, setNeeds] = useState([
    { label: 'Hunger', value: 50 },
    { label: 'Thirst', value: 90 },
    { label: 'Comfort', value: 5 },
    { label: 'Cleanliness', value: 100 },
    { label: 'Entertainment', value: 100 }
  ]);

  // useInterval(() => {
  //   setNeeds(U.changeNeed({ label: 'Hunger', value: -5, needs }));
  // }, 2000);

  return (
    <>
      <h2>Needs</h2>
      <Button onClick={() => toggleSidebar(true)}>Customize</Button>
      <Box my={4}>
        {/* <D3Wrapper
          draw={drawNeeds}
          update={updateNeeds}
          needs={needs}
          id="bar-chart"
        /> */}
      </Box>
    </>
  );
};
