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

export const useSetIntervals = ({ changeNeed }) => {
  useInterval(() => {
    changeNeed({ label: "Hunger", value: -5 });
  }, 4000);

  useInterval(() => {
    changeNeed({ label: "Thirst", value: -5 });
  }, 4000);

  useInterval(() => {
    changeNeed({ label: "Cleanliness", value: -60 });
  }, 15000);
  useInterval(() => {
    changeNeed({ label: "Cleanliness", value: -10 });
  }, 5000);

  useInterval(() => {
    changeNeed({ label: "Entertainment", value: -0.3 });
  }, 400);
};
