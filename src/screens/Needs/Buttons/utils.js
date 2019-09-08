const randomNumberBetween = (min, max) => {
  const a = Math.floor(Math.random() * (max - min + 1) + min);
  console.log(a);
  return a;
};

export const updateNeeds = (change, needs) => {
  const arr = !Array.isArray(change) ? [change] : change;
  return arr.reduce((acc, { attr, value }) => {
    const index = acc.findIndex(({ attr: a }) => a === attr);
    const current = acc[index].value;

    const valueChange = Array.isArray(value)
      ? randomNumberBetween(value[0], value[1])
      : value;

    const calc = current + valueChange;
    const updatedValue = Math.min(Math.max(calc, 300), 1000);

    return [
      ...acc.slice(0, index),
      { attr, value: updatedValue },
      ...acc.slice(index + 1)
    ];
  }, needs);
};
