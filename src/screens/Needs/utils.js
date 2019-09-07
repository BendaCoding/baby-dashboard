import { useInterval } from "@@hooks/";

const isWithinBoundaries = ({
  boundaries: [bottom, top] = [0, 100],
  value
}) => {
  return value >= bottom && value <= top;
};

export const changeNeed = ({ label, value, needs }) => {
  const index = needs.findIndex(needs => needs.label === label);
  const need = needs[index];
  const canUpdate = isWithinBoundaries({ value: need.value + value });

  const calc = need.value + value;
  const updatedValue = Math.min(Math.max(calc, 0), 100);

  return [
    ...needs.slice(0, index),
    { ...need, value: updatedValue },
    ...needs.slice(index + 1)
  ];
};

const updateValue = (value, change) => {
  const calc = value + change;
  return Math.min(Math.max(calc, 0), 100);
};

const getDecreaseValue = label =>
  ({
    Hunger: -0.2,
    Thirst: -0.5,
    Comfort: -0.1,
    Cleanliness: 0,
    Entertainment: -1.2
  }[label] || 0);

export const useSetIntervals = ({ isRunning, setNeeds, needs }) => {
  useInterval(
    () => {
      const newNeeds = needs.map(({ label, value }) => ({
        label,
        value: updateValue(value, getDecreaseValue(label))
      }));

      setNeeds(newNeeds);
    },
    isRunning ? 400 : null
  );
};
