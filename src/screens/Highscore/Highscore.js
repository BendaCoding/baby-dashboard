import React, { useContext } from 'react';
import { GameDataContext } from '../../utils';

export const Highscore = () => {
  const [gameData] = useContext(GameDataContext);

  return (
    <div>
      <h2>High score</h2>
      {JSON.stringify(gameData)}
    </div>
  );
};
