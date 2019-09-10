export const formatTimespan = d => {
  d = d / 1000;
  const hours = Math.floor(d / 3600),
    minutes = Math.floor((d - hours * 3600) / 60),
    seconds = d - minutes * 60;
  let output = seconds + 's';
  if (minutes) {
    output = minutes + 'm ' + output;
  }
  return output;
};
