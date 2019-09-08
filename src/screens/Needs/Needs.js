import React, { useState, useContext, useRef } from 'react';
import { Button } from 'semantic-ui-react';
import { Flex, Box } from 'rebass';
import * as U from './utils';
import { BarChart } from './BarChart';
import { ATTRIBUTES, MOMMY_THRESHOLDS } from '@@constants';
import { GameSettingsContext } from '@@utils';
import { Buttons } from './Buttons';

export const Needs = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameSettings] = useContext(GameSettingsContext);

  const [needs, setNeeds] = useState([
    { label: 'Hungry', attr: ATTRIBUTES.HUNGRY, value: 500 },
    { label: 'Thirsty', attr: ATTRIBUTES.THIRSTY, value: 900 },
    { label: 'Tired', attr: ATTRIBUTES.TIRED, value: 600 },
    { label: 'Dirty', attr: ATTRIBUTES.DIRTY, value: 1000 },
    { label: 'Bored', attr: ATTRIBUTES.BORED, value: 1000 }
  ]);

  U.useSetIntervals({ setNeeds, isRunning, gameSettings });

  /**
   * End game if a value drops below the mommy threshold
   */
  if (
    isRunning &&
    needs.some(
      ({ value }) => value <= MOMMY_THRESHOLDS[gameSettings.difficulty]
    )
  ) {
    setGameOver(true);
    setIsRunning(false);
  }

  return (
    <>
      {gameOver && <h3>Gameover !!!</h3>}
      <Button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Stop' : 'Start'}
      </Button>
      <Flex alignItems="center">
        <Box my={4}>
          <BarChart width={520} height={450} needs={needs} id="bar-chart" />
          {/* <BarChart data={needs} /> */}
        </Box>
        <Box mb={5}>
          <Buttons {...{ setNeeds, isRunning, needs }} />
        </Box>
      </Flex>
    </>
  );
};
