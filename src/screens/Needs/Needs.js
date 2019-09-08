import React, { useState, useContext } from 'react';
import { Button } from 'semantic-ui-react';
import { Flex, Box } from 'rebass';
import * as U from './utils';
import { BarChart } from './BarChart';
import { ATTRIBUTES, ATTRIBUTE_LABELS, MOMMY_THRESHOLDS } from '@@constants';
import { GameSettingsContext } from '@@utils';
import { Buttons } from './Buttons';

const getGameNeeds = values => [
  ...Object.values(ATTRIBUTES).map((attr, i) => ({
    attr,
    label: ATTRIBUTE_LABELS[attr],
    value: values[i]
  }))
];

const emptyGameNeeds = getGameNeeds(new Array(5).fill(0));
const newGameNeeds = getGameNeeds([500, 900, 600, 1000, 1000]);

export const Needs = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameSettings] = useContext(GameSettingsContext);

  const [needs, setNeeds] = useState(emptyGameNeeds);

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
      <Button
        {...(isRunning ? { negative: true } : { primary: true })}
        onClick={() => {
          setNeeds(newGameNeeds);
          setIsRunning(!isRunning);
        }}
      >
        {isRunning ? 'Call Mommy' : 'Start caring'}
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
