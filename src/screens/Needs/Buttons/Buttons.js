import React from "react";
import { CooldownButton } from "@@components";
import { ATTRIBUTES } from "@@constants";
import * as U from "./utils";
import { Flex } from "rebass";

const buttonRows = [
  [
    {
      name: "Giggle",
      cooldown: 5000,
      change: [
        { attr: ATTRIBUTES.BORED, value: [240, 460] },
        { attr: ATTRIBUTES.TIRED, value: [-110, -270] }
      ]
    },
    {
      name: "Rock to sleep",
      cooldown: 18000,
      change: { attr: ATTRIBUTES.TIRED, value: [180, 460] }
    },
    {
      name: "Take a walk",
      cooldown: 36000,
      change: { attr: ATTRIBUTES.TIRED, value: [120, 240] }
    }
  ],
  [
    {
      name: "Change diaper",
      cooldown: 5000,
      change: [
        { attr: ATTRIBUTES.DIRTY, value: [220, 450] },
        { attr: ATTRIBUTES.TIRED, value: [0, -57] }
      ]
    },
    {
      name: "New Clothes",
      cooldown: 12000,
      change: [
        { attr: ATTRIBUTES.DIRTY, value: [50, 85] },
        { attr: ATTRIBUTES.TIRED, value: [0, -34] }
      ]
    },
    {
      name: "Wipe",
      cooldown: 8900,
      change: [
        { attr: ATTRIBUTES.DIRTY, value: [90, 185] },
        { attr: ATTRIBUTES.TIRED, value: [0, -64] },
        { attr: ATTRIBUTES.HUNGRY, value: [0, -74] }
      ]
    }
  ],
  [
    {
      name: "Water",
      cooldown: 3600,
      change: { attr: ATTRIBUTES.THIRSTY, value: [183, 204] }
    },
    {
      name: "Babymilk",
      cooldown: 32100,
      change: [
        { attr: ATTRIBUTES.HUNGRY, value: [170, 253] },
        { attr: ATTRIBUTES.THIRSTY, value: [190, 223] },
        { attr: ATTRIBUTES.DIRTY, value: [0, -56] }
      ]
    },
    {
      name: "Tea",
      cooldown: 11900,
      change: [
        { attr: ATTRIBUTES.THIRSTY, value: [50, 123] },
        { attr: ATTRIBUTES.DIRTY, value: [0, -36] },
        { attr: ATTRIBUTES.TIRED, value: [-20, -96] }
      ]
    }
  ],
  [
    {
      name: "Banana",
      cooldown: 15000,
      change: [
        { attr: ATTRIBUTES.HUNGRY, value: 83 },
        { attr: ATTRIBUTES.DIRTY, value: [0, -116] }
      ]
    },
    {
      name: "Rice Waffle",
      cooldown: 1800,
      change: [
        { attr: ATTRIBUTES.HUNGRY, value: 20 },
        { attr: ATTRIBUTES.THIRSTY, value: -13 }
      ]
    },
    {
      name: "Avocado",
      cooldown: 4800,
      change: [
        { attr: ATTRIBUTES.HUNGRY, value: 45 },
        { attr: ATTRIBUTES.DIRTY, value: [0, -76] }
      ]
    }
  ]
];

export const Buttons = ({ setNeeds, isRunning }) => {
  return (
    <>
      {buttonRows.map((row, i) => (
        <Flex mb={1} key={i}>
          {row.map(btn => (
            <CooldownButton
              cooldown={btn.cooldown}
              disabled={!isRunning}
              onClick={() => {
                setNeeds(needs => U.updateNeeds(btn.change, needs));
              }}
              key={btn.name}
            >
              {btn.name}
            </CooldownButton>
          ))}
        </Flex>
      ))}
    </>
  );
};
