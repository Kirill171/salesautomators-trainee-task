import { Task } from '@/types/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TASKS_KEY = 'TASKS_KEY';

export default function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const stored = await AsyncStorage.getItem(TASKS_KEY);
      if (stored) {
        setTasks(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load tasks:', e);
    }
  };

  const saveTasks = async (updatedTasks: Task[]) => {
    try {
      await AsyncStorage.setItem(
        TASKS_KEY,
        JSON.stringify(updatedTasks)
      );
      setTasks(updatedTasks);
    } catch (e) {
      console.error('Failed to save tasks:', e);
    }
  };

  const addTask = (task: Omit<Task, 'id' | 'status'>) => {
    const newTask: Task = {
      ...task,
      id: uuidv4(),
      status: 'In progress'
    };
    saveTasks([newTask, ...tasks]);
  };

  const updateTask = (updatedTask: Task) => {
    const updatedTasks = tasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    );
    saveTasks(updatedTasks);
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    saveTasks(updatedTasks);
  };

  return {
    tasks,
    addTask,
    loadTasks,
    updateTask,
    deleteTask
  };
}
