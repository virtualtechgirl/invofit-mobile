import AsyncStorage from '@react-native-async-storage/async-storage';

const Storage = {
  getHistory: async () => {
    try {
      const data = await AsyncStorage.getItem('invofit_history');
      return data ? JSON.parse(data) : [];
    } catch { return []; }
  },
  saveHistory: async (history) => {
    await AsyncStorage.setItem('invofit_history', JSON.stringify(history));
  },
  getEquipment: async () => {
    try {
      const data = await AsyncStorage.getItem('invofit_equipment');
      return data ? JSON.parse(data) : {};
    } catch { return {}; }
  },
  saveEquipment: async (equipment) => {
    await AsyncStorage.setItem('invofit_equipment', JSON.stringify(equipment));
  },
  getProgression: async () => {
    try {
      const data = await AsyncStorage.getItem('invofit_progression');
      return data ? JSON.parse(data) : {};
    } catch { return {}; }
  },
  saveProgression: async (progression) => {
    await AsyncStorage.setItem('invofit_progression', JSON.stringify(progression));
  },
  getPRs: async () => {
    try {
      const data = await AsyncStorage.getItem('invofit_prs');
      return data ? JSON.parse(data) : {};
    } catch { return {}; }
  },
  savePRs: async (prs) => {
    await AsyncStorage.setItem('invofit_prs', JSON.stringify(prs));
  },
  getRecent: async () => {
    try {
      const data = await AsyncStorage.getItem('invofit_recent');
      return data ? JSON.parse(data) : [];
    } catch { return []; }
  },
  saveRecent: async (recent) => {
    await AsyncStorage.setItem('invofit_recent', JSON.stringify(recent.slice(0, 5)));
  },
};

export default Storage;
