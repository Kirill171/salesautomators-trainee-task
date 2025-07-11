import { NewTaskData, TaskStatus } from '@/types/Task';

export const MAX_TITLE = 50;
export const MAX_DESCRIPTION = 300;
export const MAX_LOCATION = 100;

export const statusItems = [
  { label: 'In progress', value: 'In progress' },
  { label: 'Completed', value: 'Completed' },
  { label: 'Cancelled', value: 'Cancelled' }
];

export const initialErrors = {
  title: '',
  description: '',
  location: ''
};

export const initialTaskData: NewTaskData = {
  title: '',
  description: '',
  location: '',
  date: new Date(),
  status: 'In progress' as TaskStatus
};
