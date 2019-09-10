import { useContext } from 'react';
import { GameDataContext } from '../../utils';
import { useInterval } from '../../hooks';
import { ATTRIBUTES, ATTRIBUTE_LABELS, INTERVALS, MOMMY_THRESHOLDS, EMPTY_GAME_DATA_SET } from '../../constants';

export const getGameNeeds = values => [
  ...Object.values(ATTRIBUTES).map((attr, i) => ({
    attr,
    label: ATTRIBUTE_LABELS[attr],
    value: values[i]
  }))
];

const randomNumberBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const updateValue = (value, change, { gameSettings: { difficulty } }) => {
  const calc = value + change;
  const nr = Math.min(Math.max(calc, MOMMY_THRESHOLDS[difficulty]), 1000);
  return nr;
};

const A = ATTRIBUTES;

const getDecreaseValue = attr =>
  ({
    [A.HUNGRY]: -2,
    [A.THIRSTY]: -5,
    [A.TIRED]: -1,
    [A.DIRTY]: Math.random() > 0.98 ? randomNumberBetween(-151, -205) : -4,
    [A.BORED]: Math.random() > 0.65 ? -12 : 0
  }[attr] || 0);

/**
 * Add a new dataSet to the gamedata structure
 */
export const addGameDataSet = (newNeeds, gameData = EMPTY_GAME_DATA_SET) => ({
  ...Object.values(ATTRIBUTES).reduce(
    (acc, attr, index) => ({
      ...acc,
      [attr]: [...gameData[attr], newNeeds[index].value]
    }),
    {}
  )
});

export const useDegradeAttributes = ({ isRunning, setNeeds, gameSettings }) => {
  const [, setGameData] = useContext(GameDataContext);

  useInterval(
    () => {
      setNeeds(currentNeeds => {
        const newNeeds = currentNeeds.map(({ attr, value }) => ({
          attr,
          value: updateValue(value, getDecreaseValue(attr), { gameSettings })
        }));

        setGameData(prevData => addGameDataSet(newNeeds, prevData));

        return newNeeds;
      });
    },
    isRunning ? INTERVALS[gameSettings.difficulty] : null
  );
};
