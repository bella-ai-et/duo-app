import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';

// Custom storage wrapper to handle "Native module is null" errors gracefully.
// It tries AsyncStorage first, then falls back to SecureStore on Native or localStorage on Web.
const safeAsyncStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      const value = await AsyncStorage.getItem(name);
      return value;
    } catch (error) {
      console.warn('AsyncStorage.getItem failed, trying fallback:', error);
      if (Platform.OS === 'web') {
        return localStorage.getItem(name);
      }
      try {
        return await SecureStore.getItemAsync(name);
      } catch (fallbackError) {
        console.error('All storage fallbacks failed:', fallbackError);
        return null;
      }
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(name, value);
    } catch (error) {
      console.warn('AsyncStorage.setItem failed, trying fallback:', error);
      if (Platform.OS === 'web') {
        localStorage.setItem(name, value);
        return;
      }
      try {
        await SecureStore.setItemAsync(name, value);
      } catch (fallbackError) {
        console.error('All storage fallbacks failed:', fallbackError);
      }
    }
  },
  removeItem: async (name: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(name);
    } catch (error) {
      console.warn('AsyncStorage.removeItem failed, trying fallback:', error);
      if (Platform.OS === 'web') {
        localStorage.removeItem(name);
        return;
      }
      try {
        await SecureStore.deleteItemAsync(name);
      } catch (fallbackError) {
        console.error('All storage fallbacks failed:', fallbackError);
      }
    }
  },
};

interface LanguageState {
  selectedLanguageId: string | null;
  isHydrated: boolean;
  setLanguage: (id: string) => void;
  clearLanguage: () => void;
  setHydrated: (state: boolean) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      selectedLanguageId: null,
      isHydrated: false,
      setLanguage: (id) => set({ selectedLanguageId: id }),
      clearLanguage: () => set({ selectedLanguageId: null }),
      setHydrated: (state) => set({ isHydrated: state }),
    }),
    {
      name: 'language-storage',
      storage: createJSONStorage(() => safeAsyncStorage),
      onRehydrateStorage: (state) => {
        return () => state?.setHydrated(true);
      },
    }
  )
);
