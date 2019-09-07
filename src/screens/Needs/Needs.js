import React, { useState, useContext } from "react";
import { Button } from "semantic-ui-react";
import { LayoutContext } from "@@utils";
import { Flex, Box } from "rebass";
import * as U from "./utils";
import { BarChart } from "./BarChart";
import { CooldownButton } from "./CooldownButton";

export const Needs = () => {
  const { toggleSidebar } = useContext(LayoutContext);
  const [isRunning, setIsRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [needs, setNeeds] = useState([
    { label: "Hunger", value: 50 },
    { label: "Thirst", value: 90 },
    { label: "Comfort", value: 5 },
    { label: "Cleanliness", value: 100 },
    { label: "Entertainment", value: 100 }
  ]);

  U.useSetIntervals({ setNeeds, needs, isRunning });

  const createOnClick = ({ label, value }) => () => {
    setNeeds(U.changeNeed({ label, value, needs }));
  };

  if (isRunning && needs.some(({ value }) => value <= 0)) {
    setGameOver(true);
    setIsRunning(false);
  }

  return (
    <>
      <h2>Needs</h2>
      {gameOver && <h3>Gameover !!!</h3>}
      <Button onClick={() => toggleSidebar(true)}>Customize</Button>
      <Button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "stop" : "Ready !"}
      </Button>
      <Box my={4}>
        <BarChart needs={needs} id="bar-chart" />
        {/* <BarChart data={needs} /> */}
      </Box>
      <Box mb={5}>
        <Flex>
          <h2>Feed:</h2>
          <CooldownButton
            cooldown={15000}
            disabled={!isRunning}
            onClick={createOnClick({ label: "Hunger", value: 15 })}
          >
            Banana
          </CooldownButton>
          <CooldownButton
            onClick={createOnClick({ label: "Hunger", value: 40 })}
            cooldown={35000}
            disabled={!isRunning}
          >
            Babymilk
          </CooldownButton>
        </Flex>
      </Box>
    </>
  );
};
