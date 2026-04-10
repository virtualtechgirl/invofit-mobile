import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { C } from '../constants/theme';
import { Icons } from '../components/Icons';

const formatDate = (isoDate) => {
  const d = new Date(isoDate);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const HistoryScreen = ({
  workoutHistory,
  prs,
}) => {
  // Get PRs sorted by most recent
  const prList = Object.entries(prs)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Pull to refresh hint */}
      <Text style={styles.refreshHint}>↓ Pull to refresh</Text>

      <Text style={styles.title}>History</Text>

      {/* PRs Section */}
      {prList.length > 0 && (
        <View style={styles.prsSection}>
          <View style={styles.prsSectionHeader}>
            {Icons.flame(C.accent)}
            <Text style={styles.prsSectionTitle}>Personal Records</Text>
          </View>
          <View style={styles.prsCard}>
            {prList.slice(0, 5).map((pr, i) => (
              <View
                key={pr.name}
                style={[
                  styles.prRow,
                  i < Math.min(prList.length, 5) - 1 && styles.prRowBorder,
                ]}
              >
                <View>
                  <Text style={styles.prName}>{pr.name}</Text>
                  <Text style={styles.prDate}>{formatDate(pr.date)}</Text>
                </View>
                <View style={styles.prStats}>
                  <Text style={styles.prWeight}>{pr.weight}</Text>
                  <Text style={styles.prReps}>× {pr.reps}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Recent Workouts */}
      <Text style={styles.sectionTitle}>Recent Workouts</Text>

      {workoutHistory.length === 0 ? (
        <Text style={styles.emptyState}>
          No workouts yet. Complete your first workout to see it here.
        </Text>
      ) : (
        workoutHistory.map((h, i) => (
          <View key={i} style={styles.workoutCard}>
            <View style={styles.workoutInfo}>
              <Text style={styles.workoutProtocol}>{h.protocol}</Text>
              <Text style={styles.workoutMeta}>
                {formatDate(h.date)} • {h.duration} min • {h.setsLogged} sets
              </Text>
            </View>
            {h.prs > 0 && (
              <View style={styles.prBadge}>
                <Text style={styles.prBadgeText}>
                  {h.prs} PR{h.prs > 1 ? 's' : ''}
                </Text>
              </View>
            )}
          </View>
        ))
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
    paddingTop: 48,
    paddingBottom: 120,
  },
  refreshHint: {
    textAlign: 'center',
    paddingVertical: 8,
    paddingBottom: 16,
    color: C.textMuted,
    fontSize: 11,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: C.text,
    marginBottom: 24,
  },
  prsSection: {
    marginBottom: 24,
  },
  prsSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  prsSectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: C.accent,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  prsCard: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 12,
    overflow: 'hidden',
  },
  prRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 16,
  },
  prRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  prName: {
    fontSize: 14,
    fontWeight: '500',
    color: C.text,
  },
  prDate: {
    fontSize: 11,
    color: C.textMuted,
  },
  prStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  prWeight: {
    fontSize: 15,
    fontWeight: '600',
    color: C.accent,
  },
  prReps: {
    fontSize: 11,
    color: C.textMuted,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: C.textSec,
    letterSpacing: 1,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  emptyState: {
    textAlign: 'center',
    padding: 40,
    color: C.textMuted,
  },
  workoutCard: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workoutInfo: {
    flex: 1,
  },
  workoutProtocol: {
    fontSize: 15,
    fontWeight: '500',
    color: C.text,
  },
  workoutMeta: {
    fontSize: 12,
    color: C.textMuted,
    marginTop: 2,
  },
  prBadge: {
    backgroundColor: C.accentDim,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  prBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: C.accent,
  },
});
