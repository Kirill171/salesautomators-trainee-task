import { Task } from '@/types/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'TASKS';

export const saveTasks = async (tasks: Task[]) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const loadTasks = async (): Promise<Task[]> => {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
};
