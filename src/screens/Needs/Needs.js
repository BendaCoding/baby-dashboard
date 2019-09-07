import React, { useState, useContext } from "react";
import { Button } from "semantic-ui-react";
import { LayoutContext } from "@@utils";
import { Box } from "rebass";
import * as U from "./utils";
import { BarChart } from "./BarChart";

export const Needs = () => {
  const { toggleSidebar } = useContext(LayoutContext);
  const [gameIsRunning, setGameIsRunning] = useState(false);

  const [needs, setNeeds] = useState([
    { label: "Hunger", value: 50 },
    { label: "Thirst", value: 90 },
    { label: "Comfort", value: 5 },
    { label: "Cleanliness", value: 100 },
    { label: "Entertainment", value: 100 }
  ]);

  const changeNeed = ({ label, value }) => {
    setNeeds(U.changeNeed({ label, value, needs }));
  };

  // const onButtonClick = ({ name, delay, label, value }) => {
  //   changeNeed({ label, value });
  //   setCooldowns({
  //     ...cooldowns,
  //     [name]: timeout
  //   });
  // };

  // U.useSetIntervals({ changeNeed, needs });

  return (
    <>
      <h2>Needs</h2>
      <Button onClick={() => toggleSidebar(true)}>Customize</Button>
      <Button onClick={() => setGameIsRunning(!gameIsRunning)}>
        {gameIsRunning ? "stop" : "Ready !"}
      </Button>
      <Box my={4}>
        <BarChart needs={needs} id="bar-chart" />
        {/* <BarChart data={needs} /> */}
      </Box>
      <Box mb={5}>
        <Button onClick={() => changeNeed({ label: "Hunger", value: 15 })}>
          Banana
        </Button>
      </Box>
    </>
  );
};
