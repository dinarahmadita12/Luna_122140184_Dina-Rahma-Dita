
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define types
interface CycleDay {
  date: string;
  flow?: 'light' | 'medium' | 'heavy' | null;
  isPeriod: boolean;
  isFertile: boolean;
  isOvulation: boolean;
}

interface MoodEntry {
  id: string;
  date: string;
  mood: 'great' | 'good' | 'okay' | 'bad' | 'awful';
  notes?: string;
}

interface SymptomEntry {
  id: string;
  date: string;
  symptoms: string[];
  intensity: 'mild' | 'moderate' | 'severe';
  notes?: string;
}

interface MedicationReminder {
  id: string;
  name: string;
  time: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'as-needed';
  taken?: boolean;
  lastTaken?: string;
}

interface HealthTip {
  id: string;
  title: string;
  content: string;
  category: 'nutrition' | 'exercise' | 'mental' | 'cycle' | 'general';
}

interface WellnessContextType {
  // Cycle tracking
  cycleData: Record<string, CycleDay>;
  updateCycleDay: (date: string, data: Partial<CycleDay>) => void;
  
  // Mood tracking
  moods: MoodEntry[];
  addMood: (entry: Omit<MoodEntry, 'id'>) => void;
  updateMood: (id: string, data: Partial<MoodEntry>) => void;
  deleteMood: (id: string) => void;
  
  // Symptom tracking
  symptoms: SymptomEntry[];
  addSymptom: (entry: Omit<SymptomEntry, 'id'>) => void;
  updateSymptom: (id: string, data: Partial<SymptomEntry>) => void;
  deleteSymptom: (id: string) => void;
  
  // Medication reminders
  medications: MedicationReminder[];
  addMedication: (med: Omit<MedicationReminder, 'id'>) => void;
  updateMedication: (id: string, data: Partial<MedicationReminder>) => void;
  deleteMedication: (id: string) => void;
  
  // Health tips
  dailyTip: HealthTip | null;
  refreshDailyTip: () => void;
}

const WellnessContext = createContext<WellnessContextType | undefined>(undefined);

// Helper function to generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 10);

// Sample health tips
const healthTips: HealthTip[] = [
  {
    id: '1',
    title: 'Stay Hydrated',
    content: 'Drink at least 8 glasses of water daily to maintain energy levels and support your body\'s functions.',
    category: 'nutrition'
  },
  {
    id: '2',
    title: 'Mindful Breathing',
    content: 'Practice deep breathing for 5 minutes when feeling stressed - inhale for 4 counts, hold for 2, exhale for 6.',
    category: 'mental'
  },
  {
    id: '3',
    title: 'Cycle Nutrition',
    content: 'During menstruation, iron-rich foods like leafy greens and beans can help replenish what\'s lost.',
    category: 'cycle'
  },
  {
    id: '4',
    title: 'Gentle Movement',
    content: 'Even a 10-minute walk can boost your mood and energy levels when feeling low.',
    category: 'exercise'
  },
  {
    id: '5',
    title: 'Seed Cycling',
    content: 'Consider consuming pumpkin and flax seeds during the first half of your cycle, and sunflower and sesame seeds during the second half to support hormone balance.',
    category: 'cycle'
  },
  {
    id: '6',
    title: 'Screen-Free Wind Down',
    content: 'Try avoiding screens for 30-60 minutes before bedtime to improve sleep quality.',
    category: 'general'
  },
  {
    id: '7',
    title: 'Cycle Tracking Benefit',
    content: 'Consistent tracking can help identify patterns that might indicate hormonal imbalances or health issues.',
    category: 'cycle'
  }
];

// Generate sample cycle data
const generateSampleCycleData = () => {
  const cycleData: Record<string, CycleDay> = {};
  
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  // Generate data for current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Sample period from day 5-10
  for (let day = 1; day <= daysInMonth; day++) {
    const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const isPeriod = day >= 5 && day <= 10;
    const isFertile = day >= 12 && day <= 17;
    const isOvulation = day === 14;
    
    cycleData[date] = {
      date,
      isPeriod,
      isFertile,
      isOvulation,
      flow: isPeriod ? (day >= 7 && day <= 8 ? 'heavy' : 'medium') : null
    };
  }
  
  return cycleData;
};

export const WellnessProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state
  const [cycleData, setCycleData] = useState<Record<string, CycleDay>>(generateSampleCycleData());
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [symptoms, setSymptoms] = useState<SymptomEntry[]>([]);
  const [medications, setMedications] = useState<MedicationReminder[]>([
    { id: '1', name: 'Vitamin D', time: '08:00', frequency: 'daily' },
    { id: '2', name: 'Iron Supplement', time: '12:30', frequency: 'daily' }
  ]);
  const [dailyTip, setDailyTip] = useState<HealthTip | null>(null);
  
  // Function to update cycle data
  const updateCycleDay = (date: string, data: Partial<CycleDay>) => {
    setCycleData(prev => ({
      ...prev,
      [date]: { ...prev[date], ...data, date }
    }));
  };
  
  // Mood tracking functions
  const addMood = (entry: Omit<MoodEntry, 'id'>) => {
    const newEntry: MoodEntry = { ...entry, id: generateId() };
    setMoods(prev => [...prev, newEntry]);
  };
  
  const updateMood = (id: string, data: Partial<MoodEntry>) => {
    setMoods(prev => prev.map(mood => 
      mood.id === id ? { ...mood, ...data } : mood
    ));
  };
  
  const deleteMood = (id: string) => {
    setMoods(prev => prev.filter(mood => mood.id !== id));
  };
  
  // Symptom tracking functions
  const addSymptom = (entry: Omit<SymptomEntry, 'id'>) => {
    const newEntry: SymptomEntry = { ...entry, id: generateId() };
    setSymptoms(prev => [...prev, newEntry]);
  };
  
  const updateSymptom = (id: string, data: Partial<SymptomEntry>) => {
    setSymptoms(prev => prev.map(symptom => 
      symptom.id === id ? { ...symptom, ...data } : symptom
    ));
  };
  
  const deleteSymptom = (id: string) => {
    setSymptoms(prev => prev.filter(symptom => symptom.id !== id));
  };
  
  // Medication reminder functions
  const addMedication = (med: Omit<MedicationReminder, 'id'>) => {
    const newMed: MedicationReminder = { ...med, id: generateId() };
    setMedications(prev => [...prev, newMed]);
  };
  
  const updateMedication = (id: string, data: Partial<MedicationReminder>) => {
    setMedications(prev => prev.map(med => 
      med.id === id ? { ...med, ...data } : med
    ));
  };
  
  const deleteMedication = (id: string) => {
    setMedications(prev => prev.filter(med => med.id !== id));
  };
  
  // Health tip functions
  const refreshDailyTip = () => {
    const randomIndex = Math.floor(Math.random() * healthTips.length);
    setDailyTip(healthTips[randomIndex]);
  };
  
  // Initialize daily tip
  useEffect(() => {
    refreshDailyTip();
  }, []);
  
  return (
    <WellnessContext.Provider value={{
      cycleData,
      updateCycleDay,
      moods,
      addMood,
      updateMood,
      deleteMood,
      symptoms,
      addSymptom,
      updateSymptom,
      deleteSymptom,
      medications,
      addMedication,
      updateMedication,
      deleteMedication,
      dailyTip,
      refreshDailyTip
    }}>
      {children}
    </WellnessContext.Provider>
  );
};

export const useWellness = () => {
  const context = useContext(WellnessContext);
  if (context === undefined) {
    throw new Error('useWellness must be used within a WellnessProvider');
  }
  return context;
};
