import { ref } from "vue"

export const DAILY_QUESTS = [
    'running',
    'pushup',
    'squats',
    'situps',
]

export const DAILY_EXERCISE = ref([
    { key: 'pushup', display: 'Pushups', units: 'reps', quantity: 100 },
    { key: 'squats', display: 'Situps', units: 'reps', quantity: 100 },
    { key: 'situps', display: 'Squats', units: 'reps', quantity: 100 },
    { key: 'running', display: 'Running', units: 'km', quantity: 10 },
])

export const DIFFICULTY_LEVEL = ref({
    beginner: [
        { key: 'pushup', units: 'reps', display: 'pushups', quantity: 25 },
        { key: 'squats', units: 'reps', display: 'situps', quantity: 10 },
        { key: 'situps', units: 'reps', display: 'squats', quantity: 25 },
        { key: 'running', units: 'km', display: 'walking', quantity: 1 },
    ],
    easy: [
      { key: 'pushup', units: 'reps', display: 'pushups', quantity: 50 },
      { key: 'squats', units: 'reps', display: 'situps', quantity: 25 },
      { key: 'situps', units: 'reps', display: 'squats', quantity: 50 },
      { key: 'running', units: 'km', display: 'running', quantity: 2 },
    ],
    medium: [
      { key: 'pushup', units: 'reps', display: 'pushups', quantity: 100 },
      { key: 'squats', units: 'reps', display: 'situps', quantity: 50 },
      { key: 'situps', units: 'reps', display: 'squats', quantity: 100 },
      { key: 'running', units: 'km', display: 'running', quantity: 3 },
    ],
    hard: [
      { key: 'pushup', units: 'reps', display: 'pushups', quantity: 100 },
      { key: 'squats', units: 'reps', display: 'situps', quantity: 100 },
      { key: 'situps', units: 'reps', display: 'squats', quantity: 100 },
      { key: 'running', units: 'km', display: 'running', quantity: 5 },
    ],
    extreme: [
        { key: 'pushup', units: 'reps', display: 'pushups', quantity: 100 },
        { key: 'squats', units: 'reps', display: 'situps', quantity: 100 },
        { key: 'situps', units: 'reps', display: 'squats', quantity: 100 },
        { key: 'running', units: 'km', display: 'running', quantity: 10 },
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
