import {
  MAX_DESCRIPTION,
  MAX_LOCATION,
  MAX_TITLE
} from '@/constants/taskFormConstants';
import { NewTaskData } from '@/types/Task';

export function validateTask(task: NewTaskData) {
  return {
    title: !task.title.trim()
      ? 'Title is required'
      : task.title.length > MAX_TITLE
      ? `Title must be less than ${MAX_TITLE} characters`
      : '',
    description: !task.description.trim()
      ? 'Description is required'
      : task.description.length > MAX_DESCRIPTION
      ? `Description must be less than ${MAX_DESCRIPTION} characters`
      : '',
    location: !task.location.trim()
      ? 'Location is required'
      : task.location.length > MAX_LOCATION
      ? `Location must be less than ${MAX_LOCATION} characters`
      : ''
  };
}
