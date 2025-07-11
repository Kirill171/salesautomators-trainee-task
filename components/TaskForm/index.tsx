import colors from '@/constants/colors';
import { NewTaskData, Task, TaskStatus } from '@/types/Task';
import { useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Modal, Portal } from 'react-native-paper';
import styles from './styled';

type Props = {
  visible: boolean;
  onSave: (task: NewTaskData) => void;
  onClose: () => void;
  existingTask?: Task | null;
};

const MAX_TITLE = 50;
const MAX_DESCRIPTION = 300;
const MAX_LOCATION = 100;

export default function TaskForm({
  visible,
  onSave,
  onClose,
  existingTask = null
}: Props) {
  const [task, setTask] = useState({
    title: '',
    description: '',
    location: '',
    date: new Date(),
    status: 'Pending' as TaskStatus
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    location: ''
  });

  const [isDatePickerVisible, setDatePickerVisibility] =
    useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [statusItems, setStatusItems] = useState([
    { label: 'In progress', value: 'In progress' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Cancelled', value: 'Cancelled' }
  ]);

  useEffect(() => {
    if (visible && existingTask) {
      setTask({
        title: existingTask.title,
        description: existingTask.description,
        location: existingTask.location,
        date: new Date(existingTask.date),
        status: existingTask.status
      });
    } else if (visible) {
      setTask({
        title: '',
        description: '',
        location: '',
        date: new Date(),
        status: 'In progress'
      });
    }
    setErrors({ title: '', description: '', location: '' });
  }, [visible, existingTask]);

  const handleChange = (
    field: keyof typeof task,
    value: string | Date
  ) => {
    setTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleConfirm = (date: Date) => {
    handleChange('date', date);
    setDatePickerVisibility(false);
  };

  const handleCancel = () => {
    setDatePickerVisibility(false);
  };

  const handleSave = () => {
    const newErrors = {
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

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((e) => e !== '');
    if (hasErrors) return;

    onSave(task);
    setTask({
      title: '',
      description: '',
      location: '',
      date: new Date(),
      status: 'In progress'
    });
    setErrors({ title: '', description: '', location: '' });
    onClose();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.modal}
      >
        <View>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder='Enter title'
            placeholderTextColor={colors.placeholder}
            value={task.title}
            maxLength={MAX_TITLE}
            onChangeText={(text) => {
              handleChange('title', text);
              if (errors.title)
                setErrors((e) => ({ ...e, title: '' }));
            }}
          />
          <Text style={styles.charCount}>
            {task.title.length} / {MAX_TITLE}
          </Text>
          {errors.title ? (
            <Text style={styles.error}>{errors.title}</Text>
          ) : null}

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder='Enter description'
            placeholderTextColor={colors.placeholder}
            value={task.description}
            maxLength={MAX_DESCRIPTION}
            onChangeText={(text) => {
              handleChange('description', text);
              if (errors.description)
                setErrors((e) => ({ ...e, description: '' }));
            }}
            multiline
          />
          <Text style={styles.charCount}>
            {task.description.length} / {MAX_DESCRIPTION}
          </Text>
          {errors.description ? (
            <Text style={styles.error}>{errors.description}</Text>
          ) : null}

          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder='Enter location'
            placeholderTextColor={colors.placeholder}
            value={task.location}
            maxLength={MAX_LOCATION}
            onChangeText={(text) => {
              handleChange('location', text);
              if (errors.location)
                setErrors((e) => ({ ...e, location: '' }));
            }}
          />
          <Text style={styles.charCount}>
            {task.location.length} / {MAX_LOCATION}
          </Text>
          {errors.location ? (
            <Text style={styles.error}>{errors.location}</Text>
          ) : null}

          <Text style={styles.label}>Status</Text>
          <DropDownPicker
            open={statusOpen}
            value={task.status}
            items={statusItems}
            setOpen={setStatusOpen}
            setValue={(cb) => {
              const value = cb(task.status);
              handleChange('status', value);
            }}
            setItems={setStatusItems}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            zIndex={3000}
            zIndexInverse={1000}
          />

          <Text style={styles.label}>Date & Time</Text>
          <Button
            title={task.date.toLocaleString()}
            onPress={() => setDatePickerVisibility(true)}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            minimumDate={new Date()}
            mode='datetime'
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />

          <View style={styles.buttons}>
            <Button
              title='Cancel'
              onPress={onClose}
              color={colors.gray}
            />
            <Button title='Save Task' onPress={handleSave} />
          </View>
        </View>
      </Modal>
    </Portal>
  );
}
