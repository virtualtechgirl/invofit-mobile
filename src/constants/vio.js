export const VIO = {
  greeting: "Let's move.",
  start: (name, count) => `${name}. ${count} exercises. You know the drill.`,
  exercise: (name, settings, lastW, lastR, progressHint) =>
    progressHint
      ? `${name}. ${settings}. You hit ${lastW} for ${lastR}. Ready for ${progressHint}?`
      : `${name}. ${settings}. You hit ${lastW} for ${lastR} last time.`,
  logged: (w, r) => `${w} for ${r}. Logged.`,
  improved: (w, r) => `${w} for ${r}. That's progress.`,
  pr: (w) => `${w}. New PR.`,
  rest: "90 seconds. Breathe.",
  restDone: "Ready when you are.",
  busy: "Machine's taken. We'll circle back.",
  skip: "Skipping for now. Come back anytime.",
  complete: (ex, min, prs) =>
    prs > 0
      ? `Done. ${ex} exercises, ${min} min, ${prs} PR${prs > 1 ? 's' : ''}. Solid work.`
      : `Done. ${ex} exercises, ${min} min. Consistency wins.`,
  warmupPrompt: "Warm-up cardio first?",
  cooldownPrompt: "Cool-down cardio?",
  cardioStart: "Get that heart rate up. I'll track the time.",
  cardioComplete: (min) => `${min} min cardio. Good warm-up.`,
  cooldownComplete: (min) => `${min} min cool-down. Nice finish.`,
};
