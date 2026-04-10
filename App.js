import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, AppState } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { ProtocolsScreen } from './src/screens/ProtocolsScreen';
import { EquipmentScreen } from './src/screens/EquipmentScreen';
import { HistoryScreen } from './src/screens/HistoryScreen';
import { WorkoutScreen } from './src/screens/WorkoutScreen';
import { TabBar } from './src/components/TabBar';
import { C } from './src/constants/theme';
import { VIO } from './src/constants/vio';
import { PROTOCOLS, getProtocolSuggestion } from './src/constants/protocols';
import { Storage } from './src/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProtocol, setSelectedProtocol] = useState(PROTOCOLS[0]);
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [homeGreeting, setHomeGreeting] = useState(VIO.greeting);
  const [equipment, setEquipment] = useState({});
  const [prs, setPrs] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [history, equip, recent, storedPrs] = await Promise.all([
          Storage.getHistory(),
          Storage.getEquipment(),
          Storage.getRecent(),
          Storage.getPRs(),
        ]);

        setWorkoutHistory(history);
        setEquipment(equip);
        setPrs(storedPrs);

        // Generate smart greeting based on recent workouts
        const suggestion = getProtocolSuggestion(recent, PROTOCOLS);
        if (suggestion.message) {
          setHomeGreeting(suggestion.message);
        }
        if (suggestion.protocol) {
          setSelectedProtocol(suggestion.protocol);
        }
      } catch (error) {
        console.log('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle app state changes (replaces document.visibilitychange)
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        // Refresh data when app comes to foreground
        Storage.getHistory().then(setWorkoutHistory);
      }
    });

    return () => subscription?.remove();
  }, []);

  // Get last workout text
  const getLastWorkoutText = () => {
    if (workoutHistory.length === 0) return null;
    const lastDate = new Date(workoutHistory[workoutHistory.length - 1].date);
    const now = new Date();
    const diffDays = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Last workout: Today';
    if (diffDays === 1) return 'Last workout: Yesterday';
    return `Last workout: ${diffDays} days ago`;
  };

  // Refresh all data (after workout completes)
  const refreshData = async () => {
    const [history, storedPrs, recent] = await Promise.all([
      Storage.getHistory(),
      Storage.getPRs(),
      Storage.getRecent(),
    ]);
    setWorkoutHistory(history);
    setPrs(storedPrs);

    const suggestion = getProtocolSuggestion(recent, PROTOCOLS);
    if (suggestion.message) {
      setHomeGreeting(suggestion.message);
    }
  };

  const handleStartWorkout = () => {
    setActiveTab('workout');
  };

  const handleWorkoutComplete = async () => {
    await refreshData();
    setActiveTab('home');
  };

  const handleWorkoutExit = () => {
    setActiveTab('home');
  };

  const handleSelectProtocol = (protocol) => {
    setSelectedProtocol(protocol);
  };

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
  };

  // Render active screen
  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            selectedProtocol={selectedProtocol}
            homeGreeting={homeGreeting}
            lastWorkoutText={getLastWorkoutText()}
            workoutHistory={workoutHistory}
            onStartWorkout={handleStartWorkout}
            onSelectProtocol={handleSelectProtocol}
            protocols={PROTOCOLS}
          />
        );
      case 'protocols':
        return (
          <ProtocolsScreen
            protocols={PROTOCOLS}
            selectedProtocol={selectedProtocol}
            onSelectProtocol={(p) => {
              setSelectedProtocol(p);
              setActiveTab('home');
            }}
          />
        );
      case 'equipment':
        return (
          <EquipmentScreen
            protocols={PROTOCOLS}
            prs={prs}
          />
        );
      case 'history':
        return (
          <HistoryScreen
            workoutHistory={workoutHistory}
            prs={prs}
          />
        );
      case 'workout':
        return (
          <WorkoutScreen
            protocol={selectedProtocol}
            onComplete={handleWorkoutComplete}
            onExit={handleWorkoutExit}
          />
        );
      default:
        return null;
    }
  };

  const isWorkout = activeTab === 'workout';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
      {renderScreen()}
      {!isWorkout && <TabBar activeTab={activeTab} onTabPress={handleTabPress} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
  },
});
