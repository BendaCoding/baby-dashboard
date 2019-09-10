import React, { useContext, useState } from 'react';
import { GameSettingsContext, GameDataContext } from '../../utils';
import { LineChart } from './LineChart';
import { ATTRIBUTES, MOMMY_THRESHOLDS } from '../../constants';
import { Flex, Box } from 'rebass';
import { LegendItem } from './LegendItem/LegendItem';

const defaultVisible = Object.values(ATTRIBUTES).reduce((acc, attr) => ({ ...acc, [attr]: true }), {});

export const Analytics = () => {
  const [gameData] = useContext(GameDataContext);
  const [gameSettings] = useContext(GameSettingsContext);
  const [visibleAttributes, setVisibleAttributes] = useState(defaultVisible);
  const threshold = MOMMY_THRESHOLDS[gameSettings.difficulty];

  // const gameData = {
  //   HUNGRY: [600, 598, 596, 594, 592, 590, 588, 586, 586, 584, 584, 582, 582, 663, 663, 681, 681, 724, 724, 722, 722],
  //   THIRSTY: [900, 895, 890, 885, 880, 875, 870, 865, 865, 860, 860, 855, 855, 850, 850, 832, 832, 827, 827, 822, 822],
  //   DIRTY: [600, 596, 592, 588, 584, 580, 576, 978, 978, 974, 974, 970, 970, 895, 895, 891, 891, 842, 842, 838, 838],
  //   BORED: [1000, 988, 976, 964, 964, 952, 940, 928, 940, 940, 928, 928, 928, 928, 928, 928, 916, 904, 916, 916, 904],
  //   TIRED: [1000, 999, 998, 997, 996, 995, 994, 984, 984, 983, 983, 982, 982, 981, 981, 980, 980, 979, 979, 978, 978]
  // };

  const makeToggleLegendClick = attr => () => setVisibleAttributes(prev => ({ ...prev, [attr]: !prev[attr] }));
  console.log(visibleAttributes);
  return (
    <div>
      <h2>Analytics</h2>
      <Flex>
        <Box>
          {Object.values(ATTRIBUTES).map(attr => (
            <LegendItem key={attr} attr={attr} active={visibleAttributes[attr]} onClick={makeToggleLegendClick(attr)} />
          ))}
        </Box>
        <LineChart data={gameData} {...{ threshold, visibleAttributes }} />
      </Flex>
    </div>
  );
};
