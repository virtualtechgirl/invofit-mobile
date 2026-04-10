import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { C } from '../constants/theme';
import { Icons } from './Icons';

const tabs = [
  { id: 'home', icon: Icons.bolt, label: 'Today' },
  { id: 'protocols', icon: Icons.list, label: 'Protocols' },
  { id: 'equipment', icon: Icons.dumbbellSmall, label: 'Equipment' },
  { id: 'history', icon: Icons.chart, label: 'History' },
];

export const TabBar = ({ activeTab, onTabPress }) => {
  return (
    <View style={styles.container}>
      {tabs.map((t) => {
        const isActive = activeTab === t.id;
        return (
          <Pressable
            key={t.id}
            onPress={() => onTabPress(t.id)}
            style={styles.tab}
          >
            {t.icon(isActive ? C.accent : C.textMuted, 22)}
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {t.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: C.surface,
    borderTopWidth: 1,
    borderTopColor: C.border,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 34,
  },
  tab: {
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontSize: 10,
    color: C.textMuted,
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  labelActive: {
    color: C.accent,
    fontWeight: '600',
  },
});
