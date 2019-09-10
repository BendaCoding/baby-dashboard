import React, { useContext, useState } from 'react';
import { GameSettingsContext, GameDataContext } from '../../utils';
import { LineChart } from './LineChart';
import { ATTRIBUTES, MOMMY_THRESHOLDS, INTERVALS } from '../../constants';
import { Flex, Box } from 'rebass';
import { LegendItem } from './LegendItem/LegendItem';
import { NavLink } from 'react-router-dom';
import * as S from './styled';

const defaultVisible = Object.values(ATTRIBUTES).reduce((acc, attr) => ({ ...acc, [attr]: true }), {});

export const Analytics = () => {
  const [gameData] = useContext(GameDataContext);
  const [gameSettings] = useContext(GameSettingsContext);
  const [visibleAttributes, setVisibleAttributes] = useState(defaultVisible);
  const threshold = MOMMY_THRESHOLDS[gameSettings.difficulty];
  const interval = INTERVALS[gameSettings.difficulty];

  const makeToggleLegendClick = attr => () => setVisibleAttributes(prev => ({ ...prev, [attr]: !prev[attr] }));

  return (
    <S.Relative>
      <h2>Analytics</h2>
      {!gameData.HUNGRY.length && (
        <NavLink to="/">
          <S.Warning>
            Start caring
            <br />
            to see some results here
          </S.Warning>
        </NavLink>
      )}
      <Flex>
        <Box mt="40px">
          {Object.values(ATTRIBUTES).map(attr => (
            <LegendItem key={attr} attr={attr} active={visibleAttributes[attr]} onClick={makeToggleLegendClick(attr)} />
          ))}
        </Box>
        <LineChart data={gameData} {...{ threshold, interval, visibleAttributes }} />
      </Flex>
    </S.Relative>
  );
};
