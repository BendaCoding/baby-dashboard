import React, { useContext } from 'react';
import { GameSettingsContext } from '../../utils';
import { Box } from 'rebass';
import { Select } from 'semantic-ui-react';
import { DIFFICULTIES } from '../../constants';

const difficulties = [
  { key: 1, value: DIFFICULTIES.EASY, text: 'Easy' },
  { key: 2, value: DIFFICULTIES.MEDIUM, text: 'Medium' },
  { key: 3, value: DIFFICULTIES.HARD, text: 'Hard' }
];

export const NeedsSidebar = () => {
  const [gameSettings, setGameSettings] = useContext(GameSettingsContext);

  return (
    <>
      <Box mt={3} p={3}>
        <h3>Customize Settings</h3>
        <Box mb={2}>Difficulty</Box>
        <Select
          value={gameSettings.difficulty}
          onChange={(e, { value }) =>
            setGameSettings(settings => ({ ...settings, difficulty: value }))
          }
          options={difficulties}
          label="Difficulty"
        />
      </Box>
    </>
  );
};
