import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { C } from '../constants/theme';
import { VioBubble } from '../components/VioBubble';

export const HomeScreen = ({
  selectedProtocol,
  homeGreeting,
  lastWorkoutText,
  workoutHistory,
  onStartWorkout,
  onSelectProtocol,
  protocols,
}) => {
  // Calculate stats from history
  const totalWorkouts = workoutHistory.length;
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const prsThisWeek = workoutHistory
    .filter(h => new Date(h.date) > weekAgo)
    .reduce((sum, h) => sum + (h.prs || 0), 0);
  const consistency = totalWorkouts > 0
    ? Math.min(100, Math.round((totalWorkouts / 12) * 100))
    : 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Text style={styles.logoInvo}>Invo</Text>
          <Text style={styles.logoFit}>Fit</Text>
        </View>
        <Text style={styles.tagline}>Move with purpose</Text>
      </View>

      {/* Vio Greeting */}
      <VioBubble msg={homeGreeting} size="lg" />

      {/* Last Workout */}
      {lastWorkoutText && (
        <Text style={styles.lastWorkout}>{lastWorkoutText}</Text>
      )}

      {/* Today's Protocol Card */}
      <View style={styles.protocolCard}>
        <View style={styles.protocolHeader}>
          <Text style={styles.protocolLabel}>TODAY'S PROTOCOL</Text>
          <View style={styles.tagBadge}>
            <Text style={styles.tagText}>{selectedProtocol.tag}</Text>
          </View>
        </View>
        <Text style={styles.protocolName}>{selectedProtocol.name}</Text>
        <Text style={styles.protocolInfo}>
          {selectedProtocol.exercises.length} exercises
        </Text>
        <Pressable style={styles.startButton} onPress={onStartWorkout}>
          <Text style={styles.startButtonText}>Start Workout</Text>
        </Pressable>
      </View>

      {/* Protocol Quick Select */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.protocolScroll}
        contentContainerStyle={styles.protocolScrollContent}
      >
        {protocols.slice(0, 6).map((p) => (
          <Pressable
            key={p.id}
            onPress={() => onSelectProtocol(p)}
            style={[
              styles.protocolChip,
              selectedProtocol.id === p.id && styles.protocolChipActive,
            ]}
          >
            <Text
              style={[
                styles.protocolChipText,
                selectedProtocol.id === p.id && styles.protocolChipTextActive,
              ]}
            >
              {p.tag}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalWorkouts}</Text>
          <Text style={styles.statLabel}>Workouts</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{prsThisWeek}</Text>
          <Text style={styles.statLabel}>PRs This Week</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{consistency}%</Text>
          <Text style={styles.statLabel}>Consistency</Text>
        </View>
      </View>
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
    paddingBottom: 120,
  },
  header: {
    marginBottom: 32,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 4,
  },
  logoInvo: {
    fontSize: 28,
    fontWeight: '700',
    color: C.text,
  },
  logoFit: {
    fontSize: 28,
    fontWeight: '700',
    color: C.accent,
  },
  tagline: {
    fontSize: 13,
    color: C.textMuted,
    letterSpacing: 0.5,
  },
  lastWorkout: {
    fontSize: 12,
    color: C.textMuted,
    textAlign: 'center',
    marginTop: -12,
    marginBottom: 16,
  },
  protocolCard: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
  },
  protocolHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  protocolLabel: {
    fontSize: 11,
    color: C.textMuted,
    letterSpacing: 1.5,
  },
  tagBadge: {
    backgroundColor: C.accentDim,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
    color: C.accent,
    letterSpacing: 0.5,
  },
  protocolName: {
    fontSize: 22,
    fontWeight: '600',
    color: C.text,
    marginBottom: 6,
  },
  protocolInfo: {
    fontSize: 14,
    color: C.textSec,
    marginBottom: 24,
  },
  startButton: {
    backgroundColor: C.accent,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '600',
  },
  protocolScroll: {
    marginBottom: 24,
  },
  protocolScrollContent: {
    gap: 8,
  },
  protocolChip: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  protocolChipActive: {
    backgroundColor: C.accentDim,
    borderColor: C.accent,
  },
  protocolChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: C.textSec,
  },
  protocolChipTextActive: {
    color: C.accent,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '600',
    color: C.accent,
  },
  statLabel: {
    fontSize: 11,
    color: C.textMuted,
    marginTop: 4,
  },
});
