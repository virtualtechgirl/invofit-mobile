import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { C } from '../constants/theme';
import { Icons } from '../components/Icons';

export const EquipmentScreen = ({
  protocols,
  prs,
}) => {
  const [filter, setFilter] = useState('');

  // Get unique equipment from all protocols
  const unique = [];
  const seen = new Set();
  protocols.forEach((p) => {
    p.exercises.forEach((ex) => {
      if (!seen.has(ex.name)) {
        seen.add(ex.name);
        unique.push(ex);
      }
    });
  });

  // Filter by search
  const filtered = filter
    ? unique.filter((eq) =>
        eq.name.toLowerCase().includes(filter.toLowerCase())
      )
    : unique;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Equipment</Text>
      <Text style={styles.subtitle}>
        {unique.length} machines in your library
      </Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search machines..."
        placeholderTextColor={C.textMuted}
        value={filter}
        onChangeText={setFilter}
      />

      {filtered.map((eq, i) => {
        const pr = prs[eq.name];
        return (
          <View
            key={i}
            style={[styles.card, pr && styles.cardWithPR]}
          >
            <View style={styles.cardLeft}>
              <View style={styles.nameRow}>
                <Text style={styles.equipmentName}>{eq.name}</Text>
                {pr && Icons.flame(C.accent)}
              </View>
              <Text style={styles.settings}>{eq.settings}</Text>
            </View>
            <View style={styles.cardRight}>
              {pr ? (
                <>
                  <Text style={styles.prWeight}>{pr.weight}</Text>
                  <Text style={styles.prLabel}>PR</Text>
                </>
              ) : (
                <>
                  <Text style={styles.weight}>{eq.lastWeight}</Text>
                  <Text style={styles.reps}>× {eq.lastReps}</Text>
                </>
              )}
            </View>
          </View>
        );
      })}
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
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: C.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: C.textSec,
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 10,
    padding: 12,
    paddingHorizontal: 16,
    color: C.text,
    fontSize: 15,
    marginBottom: 16,
  },
  card: {
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
  cardWithPR: {
    borderColor: C.accentMid,
  },
  cardLeft: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  equipmentName: {
    fontSize: 15,
    fontWeight: '500',
    color: C.text,
  },
  settings: {
    fontSize: 12,
    color: C.textMuted,
    marginTop: 2,
  },
  cardRight: {
    alignItems: 'flex-end',
  },
  weight: {
    fontSize: 15,
    fontWeight: '600',
    color: C.accent,
  },
  reps: {
    fontSize: 11,
    color: C.textMuted,
  },
  prWeight: {
    fontSize: 15,
    fontWeight: '600',
    color: C.accent,
  },
  prLabel: {
    fontSize: 10,
    color: C.accent,
    fontWeight: '500',
  },
});
