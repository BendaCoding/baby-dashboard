const colors = {
  saturated: '#25AFF0',
  calm: '#89CFF0',
  concerned: '#F08989',
  critical: '#F04F4F',
  dimmed: '#ffffff44'
};

export const theme = {
  chart: {
    saturated: colors.saturated,
    calm: colors.calm,
    concerned: colors.concerned,
    critical: colors.critical
  },
  attributes: {
    HUNGRY: '#d75b66',
    THIRSTY: '#4d73cb',
    DIRTY: '#bd8a44',
    BORED: '#f1ba48',
    TIRED: '#F78AE0'
  },
  dimmed: colors.dimmed,
  transitions: {
    easeInOutQuad: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)'
  }
};
