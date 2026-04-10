import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { C } from '../constants/theme';
import { VIO } from '../constants/vio';
import { VioBubble } from '../components/VioBubble';
import { Icons } from '../components/Icons';
import { Storage } from '../storage';

// Exercise tips
const EXERCISE_TIPS = {
  "Glutebuilder Leg Press": "Drive through your heels. Keep lower back pressed into pad.",
  "GB Gluteator": "Squeeze at the top. Control the negative.",
  "GB KickBack": "Full extension. Don't swing—control the motion.",
  "GB Hip Thrusts": "Pause at the top. Squeeze glutes hard.",
  "Adduction": "Slow and controlled. Feel the inner thigh.",
  "Cybex Leg Extension": "Don't lock out. Keep tension on the quads.",
  "Nautilus Low Back": "Controlled movement. Don't hyperextend.",
  "Cybex Squat Press": "Full depth. Drive through heels.",
  "Abduction": "Lean slightly forward. Squeeze at the widest point.",
  "Life Fit Lying Leg Curl": "Don't lift hips. Squeeze hamstrings at top.",
  "Magnum Incline Chest Press": "Chest up. Control the negative.",
  "Strive Seated Pec Fly": "Squeeze at center. Don't let arms go too far back.",
  "Strive Chest Press": "Full range. Don't bounce at bottom.",
  "Hammer Big Red Pulldown": "Lead with elbows. Squeeze lats at bottom.",
  "Cybex Lat Raise": "Slight bend in elbows. Don't shrug.",
  "Nautilus Pull Ups": "Slow negative. Full stretch at bottom.",
  "Strive Overhead Press": "Core tight. Don't arch your back.",
  "Tricep Pressdown": "Elbows pinned. Full lockout at bottom.",
  "Seated Row": "Chest to pad. Squeeze shoulder blades together.",
  "Rear Delt Fly": "Lead with elbows. Don't use momentum.",
  "Bicep Curl Machine": "Full range. Control the negative.",
  "Face Pulls": "Pull to forehead. External rotate at the end.",
  "Leg Press": "Don't lock knees. Full range of motion.",
};

const getTip = (name) => EXERCISE_TIPS[name] || "Focus on form. Control the movement.";

export const WorkoutScreen = ({
  protocol,
  onComplete,
  onExit,
}) => {
  // Workout state
  const [phase, setPhase] = useState('warmup-prompt');
  const [exIndex, setExIndex] = useState(0);
  const [completedSets, setCompletedSets] = useState({});
  const [skipped, setSkipped] = useState([]);
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [vioMsg, setVioMsg] = useState(VIO.warmupPrompt);
  const [resting, setResting] = useState(false);
  const [restSec, setRestSec] = useState(90);
  const [prs, setPrs] = useState(0);
  const [editingSettings, setEditingSettings] = useState(false);
  const [tempSettings, setTempSettings] = useState('');
  const [cardioSeconds, setCardioSeconds] = useState(0);
  const [warmupDuration, setWarmupDuration] = useState(0);
  const [cooldownDuration, setCooldownDuration] = useState(0);

  const startTime = useRef(Date.now());
  const timerRef = useRef(null);
  const cardioTimerRef = useRef(null);

  const exercise = protocol.exercises[exIndex];
  const totalEx = protocol.exercises.length;
  const setsForCurrent = completedSets[exercise?.id] || [];

  // Rest timer
  useEffect(() => {
    if (resting) {
      const startRestTime = Date.now();
      timerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startRestTime) / 1000);
        const remaining = Math.max(0, 90 - elapsed);
        if (remaining <= 0) {
          clearInterval(timerRef.current);
          setResting(false);
          setVioMsg(VIO.restDone);
          setRestSec(90);
        } else {
          setRestSec(remaining);
        }
      }, 500);
    }
    return () => clearInterval(timerRef.current);
  }, [resting]);

  // Cardio timer
  useEffect(() => {
    if (phase === 'warmup' || phase === 'cooldown') {
      const startCardioTime = Date.now();
      cardioTimerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startCardioTime) / 1000);
        setCardioSeconds(elapsed);
      }, 500);
    }
    return () => clearInterval(cardioTimerRef.current);
  }, [phase]);

  // Get progression hint
  const getProgressionHint = async (exerciseName) => {
    const progression = await Storage.getProgression();
    const prog = progression[exerciseName];
    if (prog && prog.readyToProgress) {
      return prog.currentWeight + 5;
    }
    return null;
  };

  // Start warmup
  const startWarmup = () => {
    setPhase('warmup');
    setCardioSeconds(0);
    setVioMsg(VIO.cardioStart);
  };

  // Skip warmup
  const skipWarmup = () => {
    setPhase('lifting');
    setVioMsg(VIO.start(protocol.name, totalEx));
    setWeight(String(exercise.lastWeight));
  };

  // Finish warmup
  const finishWarmup = () => {
    clearInterval(cardioTimerRef.current);
    setWarmupDuration(cardioSeconds);
    setPhase('lifting');
    setVioMsg(VIO.start(protocol.name, totalEx));
    setWeight(String(exercise.lastWeight));
  };

  // Log a set
  const logSet = async () => {
    if (!weight || !reps) return;
    const w = isNaN(Number(weight)) ? weight : Number(weight);
    const r = Number(reps);

    const currentSets = completedSets[exercise.id] || [];
    const newSets = [...currentSets, { weight: w, reps: r }];
    setCompletedSets({ ...completedSets, [exercise.id]: newSets });

    // Haptic feedback simulation
    console.log('haptic: success');

    const numW = Number(w);
    const numLast = Number(exercise.lastWeight);

    // Check against all-time PR
    const storedPRs = await Storage.getPRs();
    const currentPR = storedPRs[exercise.name];

    if (!currentPR || numW > Number(currentPR.weight)) {
      // New PR!
      storedPRs[exercise.name] = { weight: w, reps: r, date: new Date().toISOString() };
      await Storage.savePRs(storedPRs);
      setPrs((p) => p + 1);
      setVioMsg(VIO.pr(w));
    } else if (numW > numLast) {
      setVioMsg(VIO.improved(w, r));
    } else {
      setVioMsg(VIO.logged(w, r));
    }

    setReps('');
    setResting(true);
    setRestSec(90);
  };

  // Next exercise
  const nextExercise = () => {
    clearInterval(timerRef.current);
    setResting(false);
    setRestSec(90);

    if (exIndex < totalEx - 1) {
      const nextEx = protocol.exercises[exIndex + 1];
      setExIndex(exIndex + 1);
      setVioMsg(VIO.exercise(nextEx.name, nextEx.settings, nextEx.lastWeight, nextEx.lastReps, null));
      setWeight(String(nextEx.lastWeight));
      setReps('');
    } else {
      // Last exercise done
      setPhase('cooldown-prompt');
      setVioMsg(VIO.cooldownPrompt);
    }
  };

  // Navigate to specific exercise
  const navigateToExercise = (index) => {
    clearInterval(timerRef.current);
    setResting(false);
    setRestSec(90);
    const ex = protocol.exercises[index];
    setExIndex(index);
    setVioMsg(VIO.exercise(ex.name, ex.settings, ex.lastWeight, ex.lastReps, null));
    setWeight(String(ex.lastWeight));
    setReps('');
    if (skipped.includes(ex.id)) {
      setSkipped(skipped.filter((id) => id !== ex.id));
    }
  };

  // Mark machine busy
  const markBusy = () => {
    setVioMsg(VIO.busy);
    if (exIndex < totalEx - 1) {
      const nextEx = protocol.exercises[exIndex + 1];
      setExIndex(exIndex + 1);
      setWeight(String(nextEx.lastWeight));
      setReps('');
    }
  };

  // Skip exercise
  const skipEx = () => {
    if (!skipped.includes(exercise.id)) {
      setSkipped([...skipped, exercise.id]);
    }
    setVioMsg(VIO.skip);
    if (exIndex < totalEx - 1) {
      const nextEx = protocol.exercises[exIndex + 1];
      setExIndex(exIndex + 1);
      setWeight(String(nextEx.lastWeight));
      setReps('');
    }
  };

  // Save workout to history
  const saveWorkoutToHistory = async (duration) => {
    const totalSetsLogged = Object.values(completedSets).reduce((a, b) => a + b.length, 0);
    const historyEntry = {
      date: new Date().toISOString(),
      protocol: protocol.name,
      protocolId: protocol.id,
      duration,
      setsLogged: totalSetsLogged,
      prs,
    };

    const history = await Storage.getHistory();
    history.unshift(historyEntry);
    await Storage.saveHistory(history);

    // Update equipment and progression
    const savedEquipment = await Storage.getEquipment();
    const progression = await Storage.getProgression();

    for (const ex of protocol.exercises) {
      const sets = completedSets[ex.id] || [];
      if (sets.length > 0) {
        const bestSet = sets.reduce((best, s) => {
          const sWeight = Number(s.weight) || 0;
          const bestWeight = Number(best.weight) || 0;
          if (sWeight > bestWeight) return s;
          if (sWeight === bestWeight && s.reps > best.reps) return s;
          return best;
        });
        const bestWeight = Number(bestSet.weight) || ex.lastWeight;
        const bestReps = bestSet.reps;

        const targetWeight = ex.lastWeight;
        const allSetsHitTarget = sets.every((s) => Number(s.weight) >= targetWeight);
        const completedAllSets = sets.length >= ex.targetSets;

        const currentProg = progression[ex.name] || {
          currentWeight: targetWeight,
          sessionsAtWeight: 0,
          readyToProgress: false,
        };

        if (allSetsHitTarget && completedAllSets) {
          if (bestWeight === currentProg.currentWeight) {
            currentProg.sessionsAtWeight += 1;
            currentProg.readyToProgress = currentProg.sessionsAtWeight >= 2;
          } else if (bestWeight > currentProg.currentWeight) {
            currentProg.currentWeight = bestWeight;
            currentProg.sessionsAtWeight = 1;
            currentProg.readyToProgress = false;
          }
        }
        progression[ex.name] = currentProg;

        savedEquipment[ex.name] = {
          settings: ex.settings,
          lastWeight: bestWeight,
          lastReps: bestReps,
        };
      }
    }

    await Storage.saveEquipment(savedEquipment);
    await Storage.saveProgression(progression);

    // Save to recent
    const recentEntry = {
      date: new Date().toISOString(),
      protocolId: protocol.id,
      protocolTag: protocol.tag,
    };
    const recent = await Storage.getRecent();
    recent.unshift(recentEntry);
    await Storage.saveRecent(recent.slice(0, 5));
  };

  // Start cooldown
  const startCooldown = () => {
    setPhase('cooldown');
    setCardioSeconds(0);
    setVioMsg(VIO.cardioStart);
  };

  // Skip cooldown / finish workout
  const finishWorkout = async () => {
    clearInterval(cardioTimerRef.current);
    if (phase === 'cooldown') {
      setCooldownDuration(cardioSeconds);
    }
    const duration = Math.round((Date.now() - startTime.current) / 60000) || 1;
    await saveWorkoutToHistory(duration);
    setVioMsg(VIO.complete(totalEx, duration, prs));
    setPhase('summary');
  };

  // Save settings
  const saveSettings = async () => {
    exercise.settings = tempSettings;
    setEditingSettings(false);

    const savedEquipment = await Storage.getEquipment();
    savedEquipment[exercise.name] = {
      settings: tempSettings,
      lastWeight: exercise.lastWeight,
      lastReps: exercise.lastReps,
    };
    await Storage.saveEquipment(savedEquipment);
  };

  // Format time
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${String(sec).padStart(2, '0')}`;
  };

  // Exercise Nav
  const ExerciseNav = () => (
    <View style={styles.exerciseNav}>
      {protocol.exercises.map((ex, i) => {
        const sets = completedSets[ex.id] || [];
        const done = sets.length >= ex.targetSets;
        const current = i === exIndex;
        const isSkipped = skipped.includes(ex.id) && !done;
        const hasAnySet = sets.length > 0;

        return (
          <Pressable
            key={i}
            onPress={() => navigateToExercise(i)}
            style={[
              styles.navDot,
              current && styles.navDotCurrent,
              done && styles.navDotDone,
              isSkipped && styles.navDotSkipped,
              hasAnySet && !done && styles.navDotPartial,
            ]}
          >
            {done ? (
              Icons.check('#000', 12)
            ) : (
              <Text
                style={[
                  styles.navDotText,
                  current && styles.navDotTextCurrent,
                  isSkipped && styles.navDotTextSkipped,
                ]}
              >
                {i + 1}
              </Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );

  // Rest Timer
  const RestTimer = () => {
    const isUrgent = restSec <= 10;
    return (
      <View style={[styles.restCard, isUrgent && styles.restCardUrgent]}>
        <Text style={styles.restLabel}>REST</Text>
        <Text style={[styles.restTime, isUrgent && styles.restTimeUrgent]}>
          {formatTime(restSec)}
        </Text>
        <View style={styles.restProgress}>
          <View
            style={[styles.restProgressBar, { width: `${((90 - restSec) / 90) * 100}%` }]}
          />
        </View>
        <Pressable
          style={styles.skipRestBtn}
          onPress={() => {
            clearInterval(timerRef.current);
            setResting(false);
            setRestSec(90);
            setVioMsg(VIO.restDone);
          }}
        >
          <Text style={styles.skipRestText}>Skip Rest</Text>
        </Pressable>
      </View>
    );
  };

  // Cardio Timer
  const CardioTimer = ({ onFinish }) => (
    <View style={styles.cardioCard}>
      <Text style={styles.cardioTime}>{formatTime(cardioSeconds)}</Text>
      <Pressable style={styles.finishCardioBtn} onPress={onFinish}>
        <Text style={styles.finishCardioBtnText}>Finish</Text>
      </Pressable>
    </View>
  );

  // ═══════════════════════════════════════════════════
  // RENDER PHASES
  // ═══════════════════════════════════════════════════

  // Warmup Prompt
  if (phase === 'warmup-prompt') {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.protocolLabel}>{protocol.name}</Text>
        <VioBubble msg={vioMsg} size="lg" />
        <View style={styles.promptCard}>
          {Icons.running(C.accent, 48)}
          <Text style={styles.promptTitle}>Treadmill Warm-up?</Text>
          <Text style={styles.promptSubtitle}>15-20 min recommended</Text>
          <Pressable style={styles.primaryBtn} onPress={startWarmup}>
            <Text style={styles.primaryBtnText}>Yes, Start Timer</Text>
          </Pressable>
          <Pressable style={styles.outlineBtn} onPress={skipWarmup}>
            <Text style={styles.outlineBtnText}>Skip to Lifting</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }

  // Warmup
  if (phase === 'warmup') {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.phaseLabel}>WARM-UP</Text>
          <Pressable style={styles.endBtn} onPress={onExit}>
            <Text style={styles.endBtnText}>End</Text>
          </Pressable>
        </View>
        <VioBubble msg={vioMsg} />
        <CardioTimer onFinish={finishWarmup} />
      </ScrollView>
    );
  }

  // Cooldown Prompt
  if (phase === 'cooldown-prompt') {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.completeHeader}>
          {Icons.dumbbell(C.accent, 48)}
          <Text style={styles.completeTitle}>Lifting Complete!</Text>
        </View>
        <VioBubble msg={vioMsg} size="lg" />
        <View style={styles.promptCard}>
          {Icons.walking(C.accent, 48)}
          <Text style={styles.promptTitle}>Cool-down Cardio?</Text>
          <Text style={styles.promptSubtitle}>Helps recovery</Text>
          <Pressable style={styles.primaryBtn} onPress={startCooldown}>
            <Text style={styles.primaryBtnText}>Yes, Start Timer</Text>
          </Pressable>
          <Pressable style={styles.outlineBtn} onPress={finishWorkout}>
            <Text style={styles.outlineBtnText}>Finish Workout</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }

  // Cooldown
  if (phase === 'cooldown') {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.phaseLabel}>COOL-DOWN</Text>
          <Pressable style={styles.endBtn} onPress={finishWorkout}>
            <Text style={styles.endBtnText}>Skip</Text>
          </Pressable>
        </View>
        <VioBubble msg={vioMsg} />
        <CardioTimer onFinish={finishWorkout} />
      </ScrollView>
    );
  }

  // Summary
  if (phase === 'summary') {
    const duration = Math.round((Date.now() - startTime.current) / 60000) || 1;
    const totalSetsLogged = Object.values(completedSets).reduce((a, b) => a + b.length, 0);
    const exercisesCompleted = Object.keys(completedSets).filter(
      (k) => completedSets[k]?.length > 0
    ).length;
    const warmupMin = Math.round(warmupDuration / 60);
    const cooldownMin = Math.round(cooldownDuration / 60);

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.completeHeader}>
          {Icons.checkCircle(C.accent, 48)}
          <Text style={styles.completeTitle}>Workout Complete</Text>
        </View>
        <VioBubble msg={vioMsg} size="lg" />

        {(warmupMin > 0 || cooldownMin > 0) && (
          <View style={styles.cardioSummary}>
            <Text style={styles.cardioSummaryLabel}>CARDIO</Text>
            <View style={styles.cardioSummaryRow}>
              {warmupMin > 0 && (
                <View style={styles.cardioSummaryItem}>
                  <Text style={styles.cardioSummaryValue}>{warmupMin} min</Text>
                  <Text style={styles.cardioSummaryText}>Warm-up</Text>
                </View>
              )}
              {cooldownMin > 0 && (
                <View style={styles.cardioSummaryItem}>
                  <Text style={styles.cardioSummaryValue}>{cooldownMin} min</Text>
                  <Text style={styles.cardioSummaryText}>Cool-down</Text>
                </View>
              )}
            </View>
          </View>
        )}

        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{duration} min</Text>
            <Text style={styles.statLabel}>Duration</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{totalSetsLogged}</Text>
            <Text style={styles.statLabel}>Sets</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{exercisesCompleted}</Text>
            <Text style={styles.statLabel}>Exercises</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statValue, prs > 0 && styles.statValuePR]}>{prs}</Text>
            <Text style={styles.statLabel}>PRs</Text>
          </View>
        </View>

        <View style={styles.exerciseSummary}>
          <Text style={styles.exerciseSummaryLabel}>STRENGTH TRAINING</Text>
          {protocol.exercises.map((ex) => {
            const sets = completedSets[ex.id] || [];
            const wasSkipped = skipped.includes(ex.id) && sets.length === 0;
            return (
              <View key={ex.id} style={styles.exerciseSummaryRow}>
                <View>
                  <Text style={[styles.exSummaryName, wasSkipped && styles.exSummarySkipped]}>
                    {ex.name}
                  </Text>
                  <Text style={styles.exSummarySettings}>{ex.settings}</Text>
                </View>
                <View style={styles.exSummarySets}>
                  {wasSkipped ? (
                    <Text style={styles.skippedText}>Skipped</Text>
                  ) : sets.length > 0 ? (
                    sets.map((s, i) => (
                      <Text key={i} style={styles.exSummarySet}>
                        {s.weight} × {s.reps}
                      </Text>
                    ))
                  ) : (
                    <Text style={styles.exSummaryDash}>—</Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>

        <Pressable style={styles.primaryBtn} onPress={onComplete}>
          <Text style={styles.primaryBtnText}>Done</Text>
        </Pressable>
      </ScrollView>
    );
  }

  // ═══════════════════════════════════════════════════
  // LIFTING (default phase)
  // ═══════════════════════════════════════════════════
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.protocolLabel}>{protocol.name}</Text>
          <Text style={styles.progressText}>
            {exIndex + 1} of {totalEx}
          </Text>
        </View>
        <Pressable style={styles.endBtn} onPress={onExit}>
          <Text style={styles.endBtnText}>End</Text>
        </Pressable>
      </View>

      <ExerciseNav />
      <VioBubble msg={vioMsg} />

      {resting && <RestTimer />}

      {!resting && (
        <View style={styles.exerciseCard}>
          <Text style={styles.exerciseName}>{exercise.name}</Text>

          <View style={styles.settingsRow}>
            {editingSettings ? (
              <View style={styles.settingsEditRow}>
                <TextInput
                  style={styles.settingsInput}
                  value={tempSettings}
                  onChangeText={setTempSettings}
                  autoFocus
                />
                <Pressable style={styles.saveSettingsBtn} onPress={saveSettings}>
                  <Text style={styles.saveSettingsBtnText}>Save</Text>
                </Pressable>
              </View>
            ) : (
              <>
                <Text style={styles.settingsText}>{exercise.settings}</Text>
                <Pressable
                  onPress={() => {
                    setTempSettings(exercise.settings);
                    setEditingSettings(true);
                  }}
                >
                  {Icons.settings(C.textMuted, 14)}
                </Pressable>
              </>
            )}
          </View>

          <Text style={styles.lastInfo}>
            Last: {exercise.lastWeight} × {exercise.lastReps} • Target: {exercise.targetSets} sets
          </Text>

          <View style={styles.tipBox}>
            {Icons.info(C.accent, 14)}
            <Text style={styles.tipText}>{getTip(exercise.name)}</Text>
          </View>

          {setsForCurrent.length > 0 && (
            <View style={styles.setsLogged}>
              {setsForCurrent.map((s, i) => (
                <View key={i} style={styles.setRow}>
                  <Text style={styles.setLabel}>Set {i + 1}</Text>
                  <Text style={styles.setWeight}>
                    {s.weight} × {s.reps}
                  </Text>
                </View>
              ))}
            </View>
          )}

          <View style={styles.inputRow}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Weight</Text>
              <TextInput
                style={styles.input}
                keyboardType="decimal-pad"
                value={weight}
                onChangeText={setWeight}
                placeholder="lbs"
                placeholderTextColor={C.textMuted}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Reps</Text>
              <TextInput
                style={styles.input}
                keyboardType="number-pad"
                value={reps}
                onChangeText={setReps}
                placeholder="reps"
                placeholderTextColor={C.textMuted}
              />
            </View>
          </View>

          <Pressable
            style={[styles.primaryBtn, (!weight || !reps) && styles.btnDisabled]}
            onPress={logSet}
            disabled={!weight || !reps}
          >
            <Text style={styles.primaryBtnText}>Log Set {setsForCurrent.length + 1}</Text>
          </Pressable>

          {setsForCurrent.length > 0 && (
            <Pressable style={styles.outlineBtn} onPress={nextExercise}>
              <Text style={styles.outlineBtnText}>
                {exIndex < totalEx - 1 ? 'Next Exercise →' : 'Complete Workout'}
              </Text>
            </Pressable>
          )}
        </View>
      )}

      {!resting && (
        <View style={styles.actionRow}>
          <Pressable style={styles.ghostBtn} onPress={markBusy}>
            {Icons.refresh(C.textSec, 16)}
            <Text style={styles.ghostBtnText}>Machine Busy</Text>
          </Pressable>
          <Pressable style={styles.ghostBtn} onPress={skipEx}>
            {Icons.skip(C.textSec, 16)}
            <Text style={styles.ghostBtnText}>Skip</Text>
          </Pressable>
        </View>
      )}

      {exIndex < totalEx - 1 && (
        <View style={styles.upNext}>
          <View style={styles.upNextBadge}>
            <Text style={styles.upNextBadgeText}>{exIndex + 2}</Text>
          </View>
          <View style={styles.upNextInfo}>
            <Text style={styles.upNextLabel}>UP NEXT</Text>
            <Text style={styles.upNextName}>{protocol.exercises[exIndex + 1].name}</Text>
            <Text style={styles.upNextSettings}>{protocol.exercises[exIndex + 1].settings}</Text>
          </View>
        </View>
      )}

      {exIndex === totalEx - 1 && (
        <View style={styles.lastExercise}>
          <Text style={styles.lastExerciseText}>Last exercise — finish strong.</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
  },
  content: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  protocolLabel: {
    fontSize: 11,
    color: C.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 13,
    color: C.textSec,
  },
  phaseLabel: {
    fontSize: 11,
    color: C.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  endBtn: {
    backgroundColor: 'rgba(255,107,107,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,107,107,0.3)',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  endBtnText: {
    color: C.error,
    fontSize: 12,
    fontWeight: '500',
  },
  exerciseNav: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6,
    marginVertical: 16,
  },
  navDot: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navDotCurrent: {
    borderWidth: 2,
    borderColor: C.accent,
  },
  navDotDone: {
    backgroundColor: C.accent,
  },
  navDotSkipped: {
    backgroundColor: C.warningDim,
  },
  navDotPartial: {
    backgroundColor: C.accentDim,
  },
  navDotText: {
    fontSize: 13,
    fontWeight: '600',
    color: C.textMuted,
  },
  navDotTextCurrent: {
    color: C.accent,
  },
  navDotTextSkipped: {
    color: C.warning,
  },
  exerciseCard: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: '600',
    color: C.text,
    marginBottom: 6,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  settingsText: {
    fontSize: 14,
    color: C.textSec,
  },
  settingsEditRow: {
    flexDirection: 'row',
    flex: 1,
    gap: 8,
  },
  settingsInput: {
    flex: 1,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 8,
    padding: 8,
    paddingHorizontal: 12,
    color: C.text,
    fontSize: 14,
  },
  saveSettingsBtn: {
    backgroundColor: C.accent,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  saveSettingsBtnText: {
    color: '#000',
    fontSize: 13,
    fontWeight: '600',
  },
  lastInfo: {
    fontSize: 13,
    color: C.textMuted,
    marginBottom: 16,
  },
  tipBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: C.surface,
    borderRadius: 10,
    padding: 12,
    paddingHorizontal: 14,
    marginBottom: 20,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: C.textSec,
    lineHeight: 18,
  },
  setsLogged: {
    marginBottom: 20,
  },
  setRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: C.accentDim,
    borderRadius: 8,
    padding: 10,
    paddingHorizontal: 14,
    marginBottom: 6,
  },
  setLabel: {
    fontSize: 14,
    color: C.accent,
  },
  setWeight: {
    fontSize: 14,
    fontWeight: '600',
    color: C.accent,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  inputGroup: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 11,
    color: C.textMuted,
    letterSpacing: 1,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 10,
    padding: 14,
    color: C.text,
    fontSize: 16,
    textAlign: 'center',
  },
  primaryBtn: {
    backgroundColor: C.accent,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryBtnText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '600',
  },
  btnDisabled: {
    opacity: 0.3,
  },
  outlineBtn: {
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  outlineBtnText: {
    color: C.text,
    fontSize: 15,
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  ghostBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 10,
    padding: 12,
  },
  ghostBtnText: {
    color: C.textSec,
    fontSize: 13,
    fontWeight: '500',
  },
  upNext: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 16,
    padding: 14,
    paddingHorizontal: 16,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 12,
  },
  upNextBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upNextBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: C.textMuted,
  },
  upNextInfo: {
    flex: 1,
  },
  upNextLabel: {
    fontSize: 11,
    color: C.textMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  upNextName: {
    fontSize: 14,
    fontWeight: '500',
    color: C.textSec,
  },
  upNextSettings: {
    fontSize: 12,
    color: C.textMuted,
  },
  lastExercise: {
    marginTop: 16,
    padding: 14,
    paddingHorizontal: 16,
    backgroundColor: C.accentDim,
    borderWidth: 1,
    borderColor: C.accentMid,
    borderRadius: 12,
    alignItems: 'center',
  },
  lastExerciseText: {
    fontSize: 13,
    color: C.accent,
    fontWeight: '500',
  },
  restCard: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  restCardUrgent: {
    borderColor: C.highlight,
  },
  restLabel: {
    fontSize: 11,
    color: C.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  restTime: {
    fontSize: 56,
    fontWeight: '200',
    color: C.text,
    marginBottom: 16,
  },
  restTimeUrgent: {
    fontWeight: '700',
    color: C.highlight,
  },
  restProgress: {
    height: 4,
    width: '100%',
    backgroundColor: C.border,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 20,
  },
  restProgressBar: {
    height: '100%',
    backgroundColor: C.accent,
  },
  skipRestBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  skipRestText: {
    color: C.textSec,
    fontSize: 13,
    fontWeight: '500',
  },
  promptCard: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  promptTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: C.text,
    marginTop: 16,
    marginBottom: 8,
  },
  promptSubtitle: {
    fontSize: 14,
    color: C.textSec,
    marginBottom: 24,
  },
  cardioCard: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
  },
  cardioTime: {
    fontSize: 64,
    fontWeight: '200',
    color: C.text,
    marginBottom: 24,
  },
  finishCardioBtn: {
    backgroundColor: C.accent,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 48,
  },
  finishCardioBtnText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '600',
  },
  completeHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  completeTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: C.text,
    marginTop: 8,
  },
  cardioSummary: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  cardioSummaryLabel: {
    fontSize: 11,
    color: C.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  cardioSummaryRow: {
    flexDirection: 'row',
    gap: 16,
  },
  cardioSummaryItem: {
    flex: 1,
  },
  cardioSummaryValue: {
    fontSize: 24,
    fontWeight: '600',
    color: C.accent,
  },
  cardioSummaryText: {
    fontSize: 12,
    color: C.textMuted,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  statBox: {
    width: '48%',
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '600',
    color: C.text,
  },
  statValuePR: {
    color: C.accent,
  },
  statLabel: {
    fontSize: 12,
    color: C.textMuted,
    marginTop: 4,
  },
  exerciseSummary: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  exerciseSummaryLabel: {
    fontSize: 11,
    color: C.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  exerciseSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  exSummaryName: {
    fontSize: 14,
    fontWeight: '500',
    color: C.text,
  },
  exSummarySkipped: {
    color: C.textMuted,
  },
  exSummarySettings: {
    fontSize: 12,
    color: C.textMuted,
  },
  exSummarySets: {
    alignItems: 'flex-end',
  },
  exSummarySet: {
    fontSize: 13,
    fontWeight: '500',
    color: C.accent,
  },
  exSummaryDash: {
    fontSize: 12,
    color: C.textMuted,
  },
  skippedText: {
    fontSize: 12,
    color: C.warning,
  },
});
