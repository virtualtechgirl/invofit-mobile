import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { C } from '../constants/theme';
import { Icons } from './Icons';

export const Header = ({ onProfilePress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.spacer} />
      <Pressable style={styles.profileBtn} onPress={onProfilePress}>
        {Icons.profile(C.textSec, 24)}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 54,
    paddingHorizontal: 20,
    paddingBottom: 8,
    zIndex: 10,
  },
  spacer: {
    width: 32,
  },
  profileBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
