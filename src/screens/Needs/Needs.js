import React, { useState, useContext } from 'react';
import { Button } from 'semantic-ui-react';
import { Flex, Box } from 'rebass';
import * as U from './utils';
import { BarChart } from './BarChart';
import { MOMMY_THRESHOLDS } from '../../constants';
import { GameSettingsContext } from '../../utils';
import { Buttons } from './Buttons';
import { Score } from './Score';
import { useInterval } from '../../hooks';

const emptyGameNeeds = U.getGameNeeds(new Array(5).fill(0));
const newGameNeeds = U.getGameNeeds([600, 900, 600, 1000, 1000]);

export const Needs = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameSettings] = useContext(GameSettingsContext);
  const [score, setScore] = useState(0);
  const [needs, setNeeds] = useState(emptyGameNeeds);

  U.useSetIntervals({ setNeeds, isRunning, gameSettings });

  useInterval(
    () => {
      setScore(current => current + 3);
    },
    isRunning ? 100 : null
  );
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
    <div>
      <Flex justifyContent="center">
        <Box ml={22}>
          <Button
            {...(isRunning ? { negative: true } : { primary: true })}
            onClick={() => {
              !isRunning && setNeeds(newGameNeeds);
              !isRunning && setScore(0);
              setIsRunning(!isRunning);
            }}
          >
            {isRunning ? 'Call Mommy' : 'Start caring'}
          </Button>
        </Box>
      </Flex>
      <Flex alignItems="center">
        <Box my={4}>
          <BarChart width={520} height={450} needs={needs} id="bar-chart" />
        </Box>
        <Box mb={5}>
          {gameOver && <h3>Gameover !!!</h3>}
          <Score score={score} />
          <Buttons {...{ setNeeds, isRunning, needs }} />
        </Box>
      </Flex>
    </div>
  );
};
