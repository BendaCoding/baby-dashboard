import { useContext } from 'react';
import { GameDataContext } from '../../utils';
import { useInterval } from '../../hooks';
import { ATTRIBUTES, ATTRIBUTE_LABELS, INTERVALS, MOMMY_THRESHOLDS } from '../../constants';

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

const getDecreaseValue = attr =>
  ({
    [ATTRIBUTES.HUNGRY]: -2,
    [ATTRIBUTES.THIRSTY]: -5,
    [ATTRIBUTES.TIRED]: -1,
    [ATTRIBUTES.DIRTY]: Math.random() > 0.98 ? randomNumberBetween(-210, -265) : -4,
    [ATTRIBUTES.BORED]: Math.random() > 0.65 ? -12 : 0
  }[attr] || 0);

export const useDegradeAttributes = ({ isRunning, setNeeds, gameSettings }) => {
  const [, setGameData] = useContext(GameDataContext);

  useInterval(
    () => {
      setNeeds(currentNeeds => {
        const newNeeds = currentNeeds.map(({ attr, value }) => ({
          attr,
          value: updateValue(value, getDecreaseValue(attr), { gameSettings })
        }));

        setGameData(prevData => [...prevData, newNeeds.map(need => need.value)]);

        return newNeeds;
      });
    },
    isRunning ? INTERVALS[gameSettings.difficulty] : null
  );
};
