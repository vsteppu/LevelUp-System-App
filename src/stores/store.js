import { ref } from "vue"

export const DAILY_QUESTS = [
    'running',
    'pushup',
    'squats',
    'situps',
]

export const DAILY_EXERCISE = ref([
    { id: 1, units: 'reps', value: 'Pushups', quantity: 100 },
    { id: 2, units: 'reps', value: 'Sit-ups', quantity: 100 },
    { id: 3, units: 'reps', value: 'Squats', quantity: 100 },
    { id: 4, units: 'km', value: 'Running', quantity: 10 },
])
