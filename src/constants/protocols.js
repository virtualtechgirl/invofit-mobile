export const PROTOCOLS = [
  // LOWER BODY
  {
    id: 'lower-glutes',
    name: 'Lower Body - Glute Focus',
    tag: 'Glutes',
    exercises: [
      { id: 1, name: 'GB KickBack', settings: '—', lastWeight: 70, lastReps: 15, targetSets: 2 },
      { id: 2, name: 'GB Gluteator', settings: 'Seat 4', lastWeight: 70, lastReps: 15, targetSets: 2, notes: 'MYO 2nd set' },
      { id: 3, name: 'GB Hip Thrusts', settings: 'Shoulders 3, back 4', lastWeight: 40, lastReps: 10, targetSets: 2 },
      { id: 4, name: 'Glutebuilder Leg Press', settings: 'Total weight', lastWeight: 180, lastReps: 15, targetSets: 2 },
      { id: 5, name: 'Adduction', settings: 'Seat 6, seat 4, butt pad', lastWeight: 70, lastReps: 12, targetSets: 2 },
      { id: 6, name: 'Cybex Leg Extension', settings: 'Seat 3, feet 2', lastWeight: 90, lastReps: 12, targetSets: 2 },
      { id: 7, name: 'Nautilus Low Back', settings: 'Seat 1, feet 7', lastWeight: 75, lastReps: 15, targetSets: 2 },
    ],
  },
  {
    id: 'lower-quads',
    name: 'Lower Body - Quad Focus',
    tag: 'Quads',
    exercises: [
      { id: 1, name: 'Cybex Leg Extension', settings: 'Seat 3, feet 2', lastWeight: 90, lastReps: 12, targetSets: 2 },
      { id: 2, name: 'Adduction', settings: 'Seat 6, seat 4, butt pad', lastWeight: 80, lastReps: 12, targetSets: 2 },
      { id: 3, name: 'Cybex Squat Press', settings: 'Total weight', lastWeight: 250, lastReps: 15, targetSets: 2 },
      { id: 4, name: 'Leg Press', settings: 'Feet low, narrow', lastWeight: 200, lastReps: 12, targetSets: 2 },
      { id: 5, name: 'Sissy Squat Machine', settings: 'Pad 3', lastWeight: 0, lastReps: 15, targetSets: 2, notes: 'Bodyweight' },
      { id: 6, name: 'Nautilus Low Back', settings: 'Seat 1, feet 7', lastWeight: 75, lastReps: 15, targetSets: 2 },
    ],
  },
  {
    id: 'lower-hamstrings',
    name: 'Lower Body - Hamstring Focus',
    tag: 'Hams',
    exercises: [
      { id: 1, name: 'Life Fit Lying Leg Curl', settings: 'Leg M, notch 3', lastWeight: 55, lastReps: 10, targetSets: 2 },
      { id: 2, name: 'Seated Leg Curl', settings: 'Seat 4, pad 3', lastWeight: 60, lastReps: 12, targetSets: 2 },
      { id: 3, name: 'Romanian Deadlift', settings: 'Dumbbells', lastWeight: 40, lastReps: 12, targetSets: 2, notes: 'Each hand' },
      { id: 4, name: 'GB Hip Thrusts', settings: 'Shoulders 3, back 4', lastWeight: 40, lastReps: 10, targetSets: 2 },
      { id: 5, name: 'Glute Ham Raise', settings: 'Pad 2', lastWeight: 0, lastReps: 10, targetSets: 2, notes: 'Bodyweight' },
      { id: 6, name: 'Nautilus Low Back', settings: 'Seat 1, feet 7', lastWeight: 75, lastReps: 15, targetSets: 2 },
    ],
  },
  {
    id: 'lower-full',
    name: 'Lower Body - Full',
    tag: 'Legs',
    exercises: [
      { id: 1, name: 'Adduction', settings: 'Seat 6, seat 4, butt pad', lastWeight: 80, lastReps: 12, targetSets: 2 },
      { id: 2, name: 'Abduction', settings: 'Thigh pads, lean forward', lastWeight: 100, lastReps: 15, targetSets: 2 },
      { id: 3, name: 'Life Fit Lying Leg Curl', settings: 'Leg M, notch 3', lastWeight: 55, lastReps: 10, targetSets: 2 },
      { id: 4, name: 'Cybex Leg Extension', settings: 'Seat 3, feet 2', lastWeight: 90, lastReps: 12, targetSets: 2 },
      { id: 5, name: 'GB Hip Thrusts', settings: 'Shoulders 3, back 4', lastWeight: 40, lastReps: 10, targetSets: 2 },
      { id: 6, name: 'Cybex Squat Press', settings: 'Total weight', lastWeight: 250, lastReps: 15, targetSets: 2 },
      { id: 7, name: 'Nautilus Low Back', settings: 'Seat 1, feet 7', lastWeight: 75, lastReps: 15, targetSets: 2 },
    ],
  },
  {
    id: 'lower-express',
    name: 'Lower Body - Express',
    tag: 'Quick',
    exercises: [
      { id: 1, name: 'Cybex Leg Extension', settings: 'Seat 3, feet 2', lastWeight: 90, lastReps: 12, targetSets: 2 },
      { id: 2, name: 'Life Fit Lying Leg Curl', settings: 'Leg M, notch 3', lastWeight: 55, lastReps: 10, targetSets: 2 },
      { id: 3, name: 'Cybex Squat Press', settings: 'Total weight', lastWeight: 250, lastReps: 15, targetSets: 2 },
      { id: 4, name: 'Nautilus Low Back', settings: 'Seat 1, feet 7', lastWeight: 75, lastReps: 15, targetSets: 2 },
    ],
  },
  // UPPER BODY - PUSH
  {
    id: 'upper-push',
    name: 'Upper Body - Push',
    tag: 'Push',
    exercises: [
      { id: 1, name: 'Strive Seated Pec Fly', settings: 'Seat 3, notch 1', lastWeight: 45, lastReps: 12, targetSets: 2 },
      { id: 2, name: 'Cybex Lat Raise', settings: 'Seat 3', lastWeight: 35, lastReps: 10, targetSets: 2 },
      { id: 3, name: 'Magnum Incline Chest Press', settings: 'Seat 1', lastWeight: 80, lastReps: 10, targetSets: 2 },
      { id: 4, name: 'Strive Chest Press', settings: 'Seat 5', lastWeight: 90, lastReps: 12, targetSets: 2, notes: '20 RBD' },
      { id: 5, name: 'Strive Overhead Press', settings: 'Seat 4', lastWeight: 40, lastReps: 12, targetSets: 2 },
      { id: 6, name: 'Tricep Pressdown', settings: 'Cable', lastWeight: 40, lastReps: 15, targetSets: 2 },
    ],
  },
  {
    id: 'upper-chest',
    name: 'Upper Body - Chest Focus',
    tag: 'Chest',
    exercises: [
      { id: 1, name: 'Strive Seated Pec Fly', settings: 'Seat 3, notch 1', lastWeight: 45, lastReps: 12, targetSets: 2 },
      { id: 2, name: 'Magnum Incline Chest Press', settings: 'Seat 1', lastWeight: 80, lastReps: 10, targetSets: 2 },
      { id: 3, name: 'Strive Chest Press', settings: 'Seat 5', lastWeight: 90, lastReps: 12, targetSets: 2 },
      { id: 4, name: 'Decline Chest Press', settings: 'Seat 3', lastWeight: 85, lastReps: 10, targetSets: 2 },
      { id: 5, name: 'Cable Crossover', settings: 'High to low', lastWeight: 25, lastReps: 15, targetSets: 2, notes: 'Each side' },
      { id: 6, name: 'Tricep Pressdown', settings: 'Cable', lastWeight: 40, lastReps: 15, targetSets: 2 },
    ],
  },
  {
    id: 'upper-shoulders',
    name: 'Upper Body - Shoulder Focus',
    tag: 'Shoulders',
    exercises: [
      { id: 1, name: 'Cybex Lat Raise', settings: 'Seat 3', lastWeight: 35, lastReps: 10, targetSets: 2 },
      { id: 2, name: 'Rear Delt Fly', settings: 'Seat 4', lastWeight: 35, lastReps: 15, targetSets: 2 },
      { id: 3, name: 'Strive Overhead Press', settings: 'Seat 4', lastWeight: 40, lastReps: 12, targetSets: 2 },
      { id: 4, name: 'Front Raise', settings: 'Dumbbells', lastWeight: 15, lastReps: 12, targetSets: 2, notes: 'Each arm' },
      { id: 5, name: 'Face Pulls', settings: 'Cable, rope', lastWeight: 30, lastReps: 15, targetSets: 2 },
      { id: 6, name: 'Shrugs', settings: 'Dumbbells', lastWeight: 50, lastReps: 15, targetSets: 2 },
    ],
  },
  // UPPER BODY - PULL
  {
    id: 'upper-pull',
    name: 'Upper Body - Pull',
    tag: 'Pull',
    exercises: [
      { id: 1, name: 'Hammer Big Red Pulldown', settings: 'Seat 5', lastWeight: 60, lastReps: 15, targetSets: 2, notes: 'Each arm' },
      { id: 2, name: 'Seated Row', settings: 'Chest pad 3', lastWeight: 70, lastReps: 12, targetSets: 2 },
      { id: 3, name: 'Rear Delt Fly', settings: 'Seat 4', lastWeight: 35, lastReps: 15, targetSets: 2 },
      { id: 4, name: 'Nautilus Pull Ups', settings: '125 / neg', lastWeight: 125, lastReps: 15, targetSets: 1, notes: 'Negatives' },
      { id: 5, name: 'Bicep Curl Machine', settings: 'Seat 3', lastWeight: 40, lastReps: 12, targetSets: 2 },
      { id: 6, name: 'Face Pulls', settings: 'Cable, rope', lastWeight: 30, lastReps: 15, targetSets: 2 },
    ],
  },
  {
    id: 'upper-back-width',
    name: 'Upper Body - Back Width',
    tag: 'Back',
    exercises: [
      { id: 1, name: 'Hammer Big Red Pulldown', settings: 'Seat 5', lastWeight: 60, lastReps: 15, targetSets: 2 },
      { id: 2, name: 'Wide Grip Lat Pulldown', settings: 'Seat 4', lastWeight: 80, lastReps: 12, targetSets: 2 },
      { id: 3, name: 'Nautilus Pull Ups', settings: '125 / neg', lastWeight: 125, lastReps: 15, targetSets: 2, notes: 'Negatives' },
      { id: 4, name: 'Straight Arm Pulldown', settings: 'Cable', lastWeight: 40, lastReps: 15, targetSets: 2 },
      { id: 5, name: 'Rear Delt Fly', settings: 'Seat 4', lastWeight: 35, lastReps: 15, targetSets: 2 },
      { id: 6, name: 'Bicep Curl Machine', settings: 'Seat 3', lastWeight: 40, lastReps: 12, targetSets: 2 },
    ],
  },
  {
    id: 'upper-back-thickness',
    name: 'Upper Body - Back Thickness',
    tag: 'Back',
    exercises: [
      { id: 1, name: 'Seated Row', settings: 'Chest pad 3', lastWeight: 70, lastReps: 12, targetSets: 2 },
      { id: 2, name: 'Close Grip Row', settings: 'V-bar', lastWeight: 80, lastReps: 10, targetSets: 2 },
      { id: 3, name: 'T-Bar Row', settings: 'Chest supported', lastWeight: 70, lastReps: 12, targetSets: 2 },
      { id: 4, name: 'Single Arm Row', settings: 'Dumbbell', lastWeight: 40, lastReps: 12, targetSets: 2, notes: 'Each arm' },
      { id: 5, name: 'Face Pulls', settings: 'Cable, rope', lastWeight: 30, lastReps: 15, targetSets: 2 },
      { id: 6, name: 'Hammer Curl', settings: 'Dumbbells', lastWeight: 20, lastReps: 12, targetSets: 2 },
    ],
  },
  // FULL BODY
  {
    id: 'full-body-a',
    name: 'Full Body A',
    tag: 'Full',
    exercises: [
      { id: 1, name: 'Cybex Leg Extension', settings: 'Seat 3, feet 2', lastWeight: 90, lastReps: 12, targetSets: 2 },
      { id: 2, name: 'Cybex Squat Press', settings: 'Total weight', lastWeight: 250, lastReps: 15, targetSets: 2 },
      { id: 3, name: 'Life Fit Lying Leg Curl', settings: 'Leg M, notch 3', lastWeight: 55, lastReps: 10, targetSets: 2 },
      { id: 4, name: 'Strive Chest Press', settings: 'Seat 5', lastWeight: 90, lastReps: 12, targetSets: 2 },
      { id: 5, name: 'Cybex Lat Raise', settings: 'Seat 3', lastWeight: 35, lastReps: 10, targetSets: 2 },
      { id: 6, name: 'Hammer Big Red Pulldown', settings: 'Seat 5', lastWeight: 60, lastReps: 15, targetSets: 2 },
      { id: 7, name: 'Nautilus Low Back', settings: 'Seat 1, feet 7', lastWeight: 75, lastReps: 15, targetSets: 2 },
    ],
  },
  {
    id: 'full-body-b',
    name: 'Full Body B',
    tag: 'Full',
    exercises: [
      { id: 1, name: 'GB KickBack', settings: '—', lastWeight: 70, lastReps: 15, targetSets: 2 },
      { id: 2, name: 'GB Hip Thrusts', settings: 'Shoulders 3, back 4', lastWeight: 40, lastReps: 10, targetSets: 2 },
      { id: 3, name: 'Adduction', settings: 'Seat 6, seat 4, butt pad', lastWeight: 70, lastReps: 12, targetSets: 2 },
      { id: 4, name: 'Magnum Incline Chest Press', settings: 'Seat 1', lastWeight: 80, lastReps: 10, targetSets: 2 },
      { id: 5, name: 'Strive Seated Pec Fly', settings: 'Seat 3, notch 1', lastWeight: 45, lastReps: 12, targetSets: 2 },
      { id: 6, name: 'Seated Row', settings: 'Chest pad 3', lastWeight: 70, lastReps: 12, targetSets: 2 },
      { id: 7, name: 'Nautilus Low Back', settings: 'Seat 1, feet 7', lastWeight: 75, lastReps: 15, targetSets: 2 },
    ],
  },
  {
    id: 'full-body-c',
    name: 'Full Body C',
    tag: 'Full',
    exercises: [
      { id: 1, name: 'Adduction', settings: 'Seat 6, seat 4, butt pad', lastWeight: 80, lastReps: 12, targetSets: 2 },
      { id: 2, name: 'Abduction', settings: 'Thigh pads, lean forward', lastWeight: 100, lastReps: 15, targetSets: 2 },
      { id: 3, name: 'Leg Press', settings: 'Feet high, wide', lastWeight: 200, lastReps: 12, targetSets: 2 },
      { id: 4, name: 'Strive Overhead Press', settings: 'Seat 4', lastWeight: 40, lastReps: 12, targetSets: 2 },
      { id: 5, name: 'Rear Delt Fly', settings: 'Seat 4', lastWeight: 35, lastReps: 15, targetSets: 2 },
      { id: 6, name: 'Wide Grip Lat Pulldown', settings: 'Seat 4', lastWeight: 80, lastReps: 12, targetSets: 2 },
      { id: 7, name: 'Nautilus Low Back', settings: 'Seat 1, feet 7', lastWeight: 75, lastReps: 15, targetSets: 2 },
    ],
  },
  {
    id: 'full-body-express',
    name: 'Full Body - Express',
    tag: 'Quick',
    exercises: [
      { id: 1, name: 'Cybex Squat Press', settings: 'Total weight', lastWeight: 250, lastReps: 15, targetSets: 2 },
      { id: 2, name: 'Strive Chest Press', settings: 'Seat 5', lastWeight: 90, lastReps: 12, targetSets: 2 },
      { id: 3, name: 'Seated Row', settings: 'Chest pad 3', lastWeight: 70, lastReps: 12, targetSets: 2 },
      { id: 4, name: 'Nautilus Low Back', settings: 'Seat 1, feet 7', lastWeight: 75, lastReps: 15, targetSets: 2 },
    ],
  },
  // SPECIALTY
  {
    id: 'arms-only',
    name: 'Arms Only',
    tag: 'Arms',
    exercises: [
      { id: 1, name: 'Bicep Curl Machine', settings: 'Seat 3', lastWeight: 40, lastReps: 12, targetSets: 2 },
      { id: 2, name: 'Hammer Curl', settings: 'Dumbbells', lastWeight: 20, lastReps: 12, targetSets: 2 },
      { id: 3, name: 'Preacher Curl', settings: 'Seat 2', lastWeight: 35, lastReps: 12, targetSets: 2 },
      { id: 4, name: 'Tricep Pressdown', settings: 'Cable', lastWeight: 40, lastReps: 15, targetSets: 2 },
      { id: 5, name: 'Tricep Dip Machine', settings: 'Seat 3', lastWeight: 80, lastReps: 12, targetSets: 2 },
      { id: 6, name: 'Overhead Tricep Extension', settings: 'Cable, rope', lastWeight: 35, lastReps: 12, targetSets: 2 },
    ],
  },
  {
    id: 'core-focus',
    name: 'Core Focus',
    tag: 'Core',
    exercises: [
      { id: 1, name: 'Nautilus Low Back', settings: 'Seat 1, feet 7', lastWeight: 75, lastReps: 15, targetSets: 2 },
      { id: 2, name: 'Ab Crunch Machine', settings: 'Seat 3', lastWeight: 60, lastReps: 15, targetSets: 2 },
      { id: 3, name: 'Rotary Torso', settings: 'Seat 4', lastWeight: 50, lastReps: 12, targetSets: 2, notes: 'Each side' },
      { id: 4, name: 'Cable Woodchop', settings: 'High to low', lastWeight: 30, lastReps: 12, targetSets: 2, notes: 'Each side' },
      { id: 5, name: 'Plank Hold', settings: '—', lastWeight: 0, lastReps: 60, targetSets: 2, notes: 'Seconds' },
      { id: 6, name: 'Dead Bug', settings: '—', lastWeight: 0, lastReps: 12, targetSets: 2, notes: 'Each side' },
    ],
  },
  {
    id: 'posterior-chain',
    name: 'Posterior Chain',
    tag: 'Back',
    exercises: [
      { id: 1, name: 'Nautilus Low Back', settings: 'Seat 1, feet 7', lastWeight: 75, lastReps: 15, targetSets: 2 },
      { id: 2, name: 'Life Fit Lying Leg Curl', settings: 'Leg M, notch 3', lastWeight: 55, lastReps: 10, targetSets: 2 },
      { id: 3, name: 'GB Hip Thrusts', settings: 'Shoulders 3, back 4', lastWeight: 40, lastReps: 10, targetSets: 2 },
      { id: 4, name: 'Romanian Deadlift', settings: 'Dumbbells', lastWeight: 40, lastReps: 12, targetSets: 2 },
      { id: 5, name: 'Seated Row', settings: 'Chest pad 3', lastWeight: 70, lastReps: 12, targetSets: 2 },
      { id: 6, name: 'Face Pulls', settings: 'Cable, rope', lastWeight: 30, lastReps: 15, targetSets: 2 },
    ],
  },
  {
    id: 'glute-express',
    name: 'Glute Builder - Express',
    tag: 'Quick',
    exercises: [
      { id: 1, name: 'GB KickBack', settings: '—', lastWeight: 70, lastReps: 15, targetSets: 2 },
      { id: 2, name: 'GB Hip Thrusts', settings: 'Shoulders 3, back 4', lastWeight: 40, lastReps: 10, targetSets: 2 },
      { id: 3, name: 'GB Gluteator', settings: 'Seat 4', lastWeight: 70, lastReps: 15, targetSets: 2, notes: 'MYO 2nd set' },
      { id: 4, name: 'Adduction', settings: 'Seat 6, seat 4, butt pad', lastWeight: 70, lastReps: 12, targetSets: 2 },
    ],
  },
  {
    id: 'upper-complete',
    name: 'Upper Body - Complete',
    tag: 'Upper',
    exercises: [
      { id: 1, name: 'Strive Seated Pec Fly', settings: 'Seat 3, notch 1', lastWeight: 45, lastReps: 12, targetSets: 2 },
      { id: 2, name: 'Strive Chest Press', settings: 'Seat 5', lastWeight: 90, lastReps: 12, targetSets: 2 },
      { id: 3, name: 'Cybex Lat Raise', settings: 'Seat 3', lastWeight: 35, lastReps: 10, targetSets: 2 },
      { id: 4, name: 'Strive Overhead Press', settings: 'Seat 4', lastWeight: 40, lastReps: 12, targetSets: 2 },
      { id: 5, name: 'Hammer Big Red Pulldown', settings: 'Seat 5', lastWeight: 60, lastReps: 15, targetSets: 2 },
      { id: 6, name: 'Seated Row', settings: 'Chest pad 3', lastWeight: 70, lastReps: 12, targetSets: 2 },
      { id: 7, name: 'Bicep Curl Machine', settings: 'Seat 3', lastWeight: 40, lastReps: 12, targetSets: 2 },
      { id: 8, name: 'Tricep Pressdown', settings: 'Cable', lastWeight: 40, lastReps: 15, targetSets: 2 },
    ],
  },
  {
    id: 'push-pull-combo',
    name: 'Push/Pull Combo',
    tag: 'Upper',
    exercises: [
      { id: 1, name: 'Strive Chest Press', settings: 'Seat 5', lastWeight: 90, lastReps: 12, targetSets: 2 },
      { id: 2, name: 'Seated Row', settings: 'Chest pad 3', lastWeight: 70, lastReps: 12, targetSets: 2 },
      { id: 3, name: 'Strive Overhead Press', settings: 'Seat 4', lastWeight: 40, lastReps: 12, targetSets: 2 },
      { id: 4, name: 'Hammer Big Red Pulldown', settings: 'Seat 5', lastWeight: 60, lastReps: 15, targetSets: 2 },
      { id: 5, name: 'Strive Seated Pec Fly', settings: 'Seat 3, notch 1', lastWeight: 45, lastReps: 12, targetSets: 2 },
      { id: 6, name: 'Rear Delt Fly', settings: 'Seat 4', lastWeight: 35, lastReps: 15, targetSets: 2 },
    ],
  },
  {
    id: 'legs-core',
    name: 'Legs & Core',
    tag: 'Lower',
    exercises: [
      { id: 1, name: 'Cybex Leg Extension', settings: 'Seat 3, feet 2', lastWeight: 90, lastReps: 12, targetSets: 2 },
      { id: 2, name: 'Life Fit Lying Leg Curl', settings: 'Leg M, notch 3', lastWeight: 55, lastReps: 10, targetSets: 2 },
      { id: 3, name: 'Cybex Squat Press', settings: 'Total weight', lastWeight: 250, lastReps: 15, targetSets: 2 },
      { id: 4, name: 'Nautilus Low Back', settings: 'Seat 1, feet 7', lastWeight: 75, lastReps: 15, targetSets: 2 },
      { id: 5, name: 'Ab Crunch Machine', settings: 'Seat 3', lastWeight: 60, lastReps: 15, targetSets: 2 },
      { id: 6, name: 'Rotary Torso', settings: 'Seat 4', lastWeight: 50, lastReps: 12, targetSets: 2, notes: 'Each side' },
    ],
  },
  // INTENSITY TECHNIQUES
  {
    id: 'lower-myo',
    name: 'Lower Body - MYO Reps',
    tag: 'Intense',
    exercises: [
      { id: 1, name: 'Cybex Leg Extension', settings: 'Seat 3, feet 2', lastWeight: 80, lastReps: 15, targetSets: 1, notes: 'MYO reps' },
      { id: 2, name: 'Life Fit Lying Leg Curl', settings: 'Leg M, notch 3', lastWeight: 50, lastReps: 15, targetSets: 1, notes: 'MYO reps' },
      { id: 3, name: 'Adduction', settings: 'Seat 6, seat 4, butt pad', lastWeight: 65, lastReps: 15, targetSets: 1, notes: 'MYO reps' },
      { id: 4, name: 'Abduction', settings: 'Thigh pads, lean forward', lastWeight: 90, lastReps: 15, targetSets: 1, notes: 'MYO reps' },
      { id: 5, name: 'Cybex Squat Press', settings: 'Total weight', lastWeight: 220, lastReps: 15, targetSets: 2 },
      { id: 6, name: 'Nautilus Low Back', settings: 'Seat 1, feet 7', lastWeight: 75, lastReps: 15, targetSets: 2 },
    ],
  },
  {
    id: 'upper-negatives',
    name: 'Upper Body - Negatives',
    tag: 'Intense',
    exercises: [
      { id: 1, name: 'Nautilus Pull Ups', settings: '125 / neg', lastWeight: 125, lastReps: 8, targetSets: 2, notes: 'Slow negatives' },
      { id: 2, name: 'Strive Chest Press', settings: 'Seat 5', lastWeight: 100, lastReps: 8, targetSets: 2, notes: 'Slow negatives' },
      { id: 3, name: 'Seated Row', settings: 'Chest pad 3', lastWeight: 80, lastReps: 8, targetSets: 2, notes: 'Slow negatives' },
      { id: 4, name: 'Strive Overhead Press', settings: 'Seat 4', lastWeight: 45, lastReps: 8, targetSets: 2, notes: 'Slow negatives' },
      { id: 5, name: 'Bicep Curl Machine', settings: 'Seat 3', lastWeight: 45, lastReps: 8, targetSets: 2, notes: 'Slow negatives' },
      { id: 6, name: 'Tricep Dip Machine', settings: 'Seat 3', lastWeight: 90, lastReps: 8, targetSets: 2, notes: 'Slow negatives' },
    ],
  },
];

export const getProtocolSuggestion = (recentWorkouts) => {
  if (!recentWorkouts || recentWorkouts.length === 0) {
    return { protocol: PROTOCOLS[0], greeting: "Let's move." };
  }

  const recentTags = recentWorkouts.map(w => w.protocolTag);
  const lastTag = recentTags[0];

  const lowerTags = ['Glutes', 'Quads', 'Hams', 'Legs', 'Lower'];
  const upperPushTags = ['Push', 'Chest', 'Shoulders'];
  const upperPullTags = ['Pull', 'Back'];

  const isLower = (tag) => lowerTags.includes(tag);
  const isPush = (tag) => upperPushTags.includes(tag);
  const isPull = (tag) => upperPullTags.includes(tag);
  const isUpper = (tag) => isPush(tag) || isPull(tag) || tag === 'Upper';

  const recentLower = recentTags.filter(isLower).length;
  const recentUpper = recentTags.filter(isUpper).length;
  const lastTwoLower = recentTags.slice(0, 2).filter(isLower).length;
  const lastTwoUpper = recentTags.slice(0, 2).filter(isUpper).length;

  let suggestedTag = null;
  let greeting = "Let's move.";

  if (lastTwoLower >= 2) {
    suggestedTag = 'Push';
    greeting = 'Two leg days in a row. Let\'s hit upper body.';
  } else if (lastTwoUpper >= 2) {
    suggestedTag = 'Glutes';
    greeting = 'Upper body\'s been working hard. Leg day.';
  } else if (isPush(lastTag)) {
    suggestedTag = 'Pull';
    greeting = 'You crushed push yesterday. Pull day?';
  } else if (isPull(lastTag)) {
    suggestedTag = 'Push';
    greeting = 'Back\'s recovered. Time to push.';
  } else if (isLower(lastTag)) {
    suggestedTag = 'Push';
    greeting = 'Legs got their work. Upper body today.';
  } else if (isUpper(lastTag)) {
    suggestedTag = 'Glutes';
    greeting = 'Let\'s hit the lower body.';
  } else {
    suggestedTag = recentLower > recentUpper ? 'Push' : 'Glutes';
    greeting = "Let's move.";
  }

  const suggested = PROTOCOLS.find(p => p.tag === suggestedTag) || PROTOCOLS[0];
  return { protocol: suggested, greeting };
};
