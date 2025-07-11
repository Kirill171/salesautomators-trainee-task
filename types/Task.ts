export type TaskStatus = 'In progress' | 'Completed' | 'Cancelled';

export interface Task {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  status: TaskStatus;
}

export type NewTaskData = Omit<Task, 'id'>;
