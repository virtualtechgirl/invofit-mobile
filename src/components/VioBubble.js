import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { C } from '../constants/theme';

export const VioBubble = ({ msg, size = 'default' }) => {
  const isLarge = size === 'lg';

  return (
    <View style={[styles.container, isLarge && styles.containerLarge]}>
      <Text style={styles.label}>VIO</Text>
      <Text style={[styles.message, isLarge && styles.messageLarge]}>{msg}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: C.accentDim,
    borderWidth: 1,
    borderColor: C.accentMid,
    borderRadius: 16,
    padding: 14,
    paddingHorizontal: 18,
    marginBottom: 20,
  },
  containerLarge: {
    padding: 20,
    paddingHorizontal: 24,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: C.accent,
    letterSpacing: 1.5,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  message: {
    color: C.text,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400',
  },
  messageLarge: {
    fontSize: 17,
    lineHeight: 25,
  },
});
