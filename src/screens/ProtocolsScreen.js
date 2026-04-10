import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { C } from '../constants/theme';

export const ProtocolsScreen = ({
  protocols,
  selectedProtocol,
  onSelectProtocol,
}) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Protocols</Text>

      {protocols.map((p) => (
        <Pressable
          key={p.id}
          onPress={() => onSelectProtocol(p)}
          style={[
            styles.card,
            selectedProtocol.id === p.id && styles.cardActive,
          ]}
        >
          <View style={styles.cardHeader}>
            <View style={styles.cardInfo}>
              <Text style={styles.protocolName}>{p.name}</Text>
              <Text style={styles.exerciseCount}>
                {p.exercises.length} exercises
              </Text>
            </View>
            <View style={styles.tagBadge}>
              <Text style={styles.tagText}>{p.tag}</Text>
            </View>
          </View>

          <View style={styles.exerciseList}>
            {p.exercises.map((ex, i) => (
              <Text key={i} style={styles.exerciseName}>
                {ex.name}
              </Text>
            ))}
          </View>
        </Pressable>
      ))}
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
    marginBottom: 24,
  },
  card: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 14,
    padding: 20,
    marginBottom: 10,
  },
  cardActive: {
    borderColor: C.accent,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardInfo: {
    flex: 1,
  },
  protocolName: {
    fontSize: 17,
    fontWeight: '600',
    color: C.text,
    marginBottom: 4,
  },
  exerciseCount: {
    fontSize: 13,
    color: C.textSec,
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
  },
  exerciseList: {
    marginTop: 12,
  },
  exerciseName: {
    fontSize: 13,
    color: C.textMuted,
    paddingVertical: 3,
  },
});
