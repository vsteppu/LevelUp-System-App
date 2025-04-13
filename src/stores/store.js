import { ref } from "vue"

export const DAILY_QUESTS = [
    'running',
    'pushup',
    'squats',
    'situps',
]

export const DIFFICULTY_LEVEL = ref({
    beginner: [
        { key: 'pushup', units: 'reps', display: 'Pushups', quantity: 25 },
        { key: 'squats', units: 'reps', display: 'Situps', quantity: 10 },
        { key: 'situps', units: 'reps', display: 'Squats', quantity: 25 },
        { key: 'running', units: 'km', display: 'Running', quantity: 1 },
    ],
    easy: [
      { key: 'pushup', units: 'reps', display: 'Pushups', quantity: 50 },
      { key: 'squats', units: 'reps', display: 'Situps', quantity: 25 },
      { key: 'situps', units: 'reps', display: 'Squats', quantity: 50 },
      { key: 'running', units: 'km', display: 'Running', quantity: 2 },
    ],
    medium: [
      { key: 'pushup', units: 'reps', display: 'Pushups', quantity: 100 },
      { key: 'squats', units: 'reps', display: 'Situps', quantity: 50 },
      { key: 'situps', units: 'reps', display: 'Squats', quantity: 100 },
      { key: 'running', units: 'km', display: 'Running', quantity: 3 },
    ],
    hard: [
      { key: 'pushup', units: 'reps', display: 'Pushups', quantity: 100 },
      { key: 'squats', units: 'reps', display: 'Situps', quantity: 100 },
      { key: 'situps', units: 'reps', display: 'Squats', quantity: 100 },
      { key: 'running', units: 'km', display: 'Running', quantity: 5 },
    ],
    extreme: [
        { key: 'pushup', units: 'reps', display: 'Pushups', quantity: 100 },
        { key: 'squats', units: 'reps', display: 'Situps', quantity: 100 },
        { key: 'situps', units: 'reps', display: 'Squats', quantity: 100 },
        { key: 'running', units: 'km', display: 'Running', quantity: 10 },
    ]
  });

  //export const DIFFICULTY = [
  //  { key: 1, display: 'beginner', unavailable: false },
  //  { key: 2, display: 'easy', unavailable: false },
  //  { key: 3, display: 'medium', unavailable: false },
  //  { key: 4, display: 'hard', unavailable: true },
  //  { key: 5, display: 'extreme', unavailable: false },
  //]
  export const DIFFICULTY = [
    'beginner',
    'easy',
    'medium',
    'hard',
    'extreme',
  ]
