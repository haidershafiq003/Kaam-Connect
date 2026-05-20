import { create } from 'zustand';

interface AppState {
  language: 'english' | 'urdu' | 'roman_urdu';
  setLanguage: (lang: 'english' | 'urdu' | 'roman_urdu') => void;
  user: {
    id: string;
    name: string;
    area: string;
  } | null;
  setUser: (user: any) => void;
}

export const useAppStore = create<AppState>((set) => ({
  language: 'roman_urdu',
  setLanguage: (language) => set({ language }),
  user: {
    id: 'usr_demo_001',
    name: 'Ahsaan Saeed',
    area: 'G-13'
  },
  setUser: (user) => set({ user }),
}));
