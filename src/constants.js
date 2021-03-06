export const ATTRIBUTES = {
  HUNGRY: 'HUNGRY',
  THIRSTY: 'THIRSTY',
  DIRTY: 'DIRTY',
  BORED: 'BORED',
  TIRED: 'TIRED'
};

export const ATTRIBUTE_LABELS = {
  [ATTRIBUTES.HUNGRY]: 'Hungry',
  [ATTRIBUTES.THIRSTY]: 'Thirsty',
  [ATTRIBUTES.TIRED]: 'Tired',
  [ATTRIBUTES.DIRTY]: 'Dirty',
  [ATTRIBUTES.BORED]: 'Bored'
};

export const DIFFICULTIES = {
  EASY: 'EASY',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD'
};

export const MOMMY_THRESHOLDS = {
  [DIFFICULTIES.EASY]: 150,
  [DIFFICULTIES.MEDIUM]: 250,
  [DIFFICULTIES.HARD]: 400
};

export const INTERVALS = {
  [DIFFICULTIES.EASY]: 400,
  [DIFFICULTIES.MEDIUM]: 300,
  [DIFFICULTIES.HARD]: 200
};

export const EMPTY_GAME_DATA_SET = Object.values(ATTRIBUTES).reduce((acc, item) => ({ ...acc, [item]: [] }), {});
