import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Switch,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
  Platform,
} from 'react-native';
import { C } from '../constants/theme';
import { Icons } from '../components/Icons';
import { useAuth } from '../lib/auth';

export const SettingsScreen = ({ onClose, settings, onUpdateSettings }) => {
  const [restTimer, setRestTimer] = useState(settings?.restTimer || 90);
  const [units, setUnits] = useState(settings?.units || 'lbs');
  const [notifications, setNotifications] = useState(settings?.notifications ?? true);
  const [authLoading, setAuthLoading] = useState(false);

  const {
    isSignedIn,
    loading: authCheckLoading,
    signInWithApple,
    signInWithGoogle,
    signOut,
    getUserInfo,
  } = useAuth();

  const userInfo = getUserInfo();

  const handleRestTimerChange = (value) => {
    setRestTimer(value);
    onUpdateSettings?.({ ...settings, restTimer: value });
  };

  const handleNotificationsToggle = () => {
    const newValue = !notifications;
    setNotifications(newValue);
    onUpdateSettings?.({ ...settings, notifications: newValue });
  };

  const handleAppleSignIn = async () => {
    setAuthLoading(true);
    const { error } = await signInWithApple();
    setAuthLoading(false);
    if (error) {
      Alert.alert('Sign In Failed', error.message || 'Could not sign in with Apple');
    }
  };

  const handleGoogleSignIn = async () => {
    setAuthLoading(true);
    const { error } = await signInWithGoogle();
    setAuthLoading(false);
    if (error) {
      Alert.alert('Sign In Failed', error.message || 'Could not sign in with Google');
    }
  };

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            setAuthLoading(true);
            const { error } = await signOut();
            setAuthLoading(false);
            if (error) {
              Alert.alert('Error', 'Could not sign out');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <Pressable style={styles.closeBtn} onPress={onClose}>
          {Icons.close(C.text, 24)}
        </Pressable>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {/* Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROFILE</Text>
          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              {userInfo?.avatar ? (
                <Image source={{ uri: userInfo.avatar }} style={styles.avatarImage} />
              ) : (
                Icons.profile(C.textMuted, 40)
              )}
            </View>
            <View style={styles.profileInfo}>
              {isSignedIn && userInfo ? (
                <>
                  <Text style={styles.profileName}>{userInfo.name}</Text>
                  <Text style={styles.profileEmail}>{userInfo.email}</Text>
                </>
              ) : (
                <Text style={styles.profilePlaceholder}>Not signed in</Text>
              )}
            </View>
          </View>
        </View>

        {/* Auth Buttons */}
        {!isSignedIn && (
          <View style={styles.section}>
            {authLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={C.accent} />
                <Text style={styles.loadingText}>Signing in...</Text>
              </View>
            ) : (
              <>
                {Platform.OS === 'ios' && (
                  <Pressable style={styles.authBtn} onPress={handleAppleSignIn}>
                    <View style={styles.authBtnIcon}>
                      {Icons.apple(C.text, 20)}
                    </View>
                    <Text style={styles.authBtnText}>Sign in with Apple</Text>
                  </Pressable>
                )}

                <Pressable
                  style={[styles.authBtn, styles.googleBtn]}
                  onPress={handleGoogleSignIn}
                >
                  <View style={styles.authBtnIcon}>
                    {Icons.google(20)}
                  </View>
                  <Text style={[styles.authBtnText, styles.googleBtnText]}>
                    Sign in with Google
                  </Text>
                </Pressable>
              </>
            )}
          </View>
        )}

        <View style={styles.divider} />

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SETTINGS</Text>

          {/* Rest Timer */}
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Default Rest Timer</Text>
              <Text style={styles.settingValue}>{restTimer} seconds</Text>
            </View>
          </View>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>60s</Text>
            <View style={styles.sliderTrack}>
              <View
                style={[
                  styles.sliderFill,
                  { width: `${((restTimer - 60) / 60) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.sliderLabel}>120s</Text>
          </View>
          <View style={styles.sliderButtons}>
            {[60, 75, 90, 105, 120].map((val) => (
              <Pressable
                key={val}
                style={[
                  styles.sliderBtn,
                  restTimer === val && styles.sliderBtnActive,
                ]}
                onPress={() => handleRestTimerChange(val)}
              >
                <Text
                  style={[
                    styles.sliderBtnText,
                    restTimer === val && styles.sliderBtnTextActive,
                  ]}
                >
                  {val}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Units */}
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Units</Text>
            <View style={styles.toggleContainer}>
              <Pressable
                style={[styles.toggleBtn, units === 'lbs' && styles.toggleBtnActive]}
                onPress={() => {
                  setUnits('lbs');
                  onUpdateSettings?.({ ...settings, units: 'lbs' });
                }}
              >
                <Text
                  style={[
                    styles.toggleBtnText,
                    units === 'lbs' && styles.toggleBtnTextActive,
                  ]}
                >
                  lbs
                </Text>
              </Pressable>
              <Pressable
                style={[styles.toggleBtn, units === 'kg' && styles.toggleBtnActive]}
                onPress={() => {
                  setUnits('kg');
                  onUpdateSettings?.({ ...settings, units: 'kg' });
                }}
              >
                <Text
                  style={[
                    styles.toggleBtnText,
                    units === 'kg' && styles.toggleBtnTextActive,
                  ]}
                >
                  kg
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Notifications */}
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={handleNotificationsToggle}
              trackColor={{ false: C.border, true: C.accentMid }}
              thumbColor={notifications ? C.accent : C.textMuted}
            />
          </View>
        </View>

        <View style={styles.divider} />

        {/* Sign Out */}
        <View style={styles.section}>
          <Pressable
            style={[styles.signOutBtn, !isSignedIn && styles.signOutBtnDisabled]}
            disabled={!isSignedIn || authLoading}
            onPress={handleSignOut}
          >
            {authLoading && isSignedIn ? (
              <ActivityIndicator size="small" color={C.error} />
            ) : (
              <Text
                style={[
                  styles.signOutBtnText,
                  !isSignedIn && styles.signOutBtnTextDisabled,
                ]}
              >
                Sign Out
              </Text>
            )}
          </Pressable>
        </View>

        {/* App Version */}
        <View style={styles.footer}>
          <Text style={styles.versionText}>InvoFit v1.0.0</Text>
          <Text style={styles.buildText}>Built with Expo</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: C.text,
  },
  closeBtn: {
    padding: 4,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: C.textMuted,
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 12,
    padding: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: C.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    overflow: 'hidden',
  },
  avatarImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 17,
    fontWeight: '600',
    color: C.text,
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 14,
    color: C.textSec,
  },
  profilePlaceholder: {
    fontSize: 15,
    color: C.textMuted,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: C.textSec,
  },
  authBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: C.text,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  authBtnIcon: {
    marginRight: 10,
  },
  authBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: C.bg,
  },
  googleBtn: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
  },
  googleBtnText: {
    color: C.text,
  },
  divider: {
    height: 1,
    backgroundColor: C.border,
    marginVertical: 8,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: C.text,
  },
  settingValue: {
    fontSize: 13,
    color: C.accent,
    marginTop: 2,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  sliderLabel: {
    fontSize: 12,
    color: C.textMuted,
    width: 32,
  },
  sliderTrack: {
    flex: 1,
    height: 4,
    backgroundColor: C.border,
    borderRadius: 2,
    marginHorizontal: 8,
    position: 'relative',
  },
  sliderFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    backgroundColor: C.accent,
    borderRadius: 2,
  },
  sliderButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sliderBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    marginHorizontal: 2,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 8,
  },
  sliderBtnActive: {
    backgroundColor: C.accentDim,
    borderColor: C.accent,
  },
  sliderBtnText: {
    fontSize: 13,
    fontWeight: '500',
    color: C.textSec,
  },
  sliderBtnTextActive: {
    color: C.accent,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: C.surface,
    borderRadius: 8,
    padding: 2,
  },
  toggleBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  toggleBtnActive: {
    backgroundColor: C.accent,
  },
  toggleBtnText: {
    fontSize: 14,
    fontWeight: '500',
    color: C.textMuted,
  },
  toggleBtnTextActive: {
    color: C.bg,
  },
  signOutBtn: {
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.error,
  },
  signOutBtnDisabled: {
    borderColor: C.border,
  },
  signOutBtnText: {
    fontSize: 15,
    fontWeight: '500',
    color: C.error,
  },
  signOutBtnTextDisabled: {
    color: C.textMuted,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 20,
  },
  versionText: {
    fontSize: 13,
    color: C.textMuted,
    marginBottom: 4,
  },
  buildText: {
    fontSize: 11,
    color: C.textMuted,
  },
});
