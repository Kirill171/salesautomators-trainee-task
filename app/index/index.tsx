import TaskForm from '@/components/TaskForm';
import colors from '@/constants/colors';
import useTasks from '@/hooks/useTasks';
import { NewTaskData, Task, TaskStatus } from '@/types/Task';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Platform,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button, FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styled';

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [statusFilter, setStatusFilter] = useState<
    TaskStatus | 'All'
  >('All');
  const [sortByDate, setSortByDate] = useState<'asc' | 'desc' | null>(
    null
  );
  const [dateFilter, setDateFilter] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [statusOpen, setStatusOpen] = useState(false);
  const [statusItems, setStatusItems] = useState([
    { label: 'All', value: 'All' },
    { label: 'In progress', value: 'In progress' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Cancelled', value: 'Cancelled' }
  ]);

  const { tasks, addTask, updateTask, deleteTask } = useTasks();

  const handleSaveTask = (taskData: NewTaskData) => {
    if (editingTask) {
      updateTask({ ...editingTask, ...taskData });
      setEditingTask(null);
    } else {
      addTask(taskData);
    }
    setModalVisible(false);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setModalVisible(true);
  };

  const handleDeleteTask = (id: string) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteTask(id)
        }
      ]
    );
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (event.type === 'dismissed') return;
    if (selectedDate) setDateFilter(selectedDate);
  };

  const clearDateFilter = () => setDateFilter(null);

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks;

    if (statusFilter !== 'All') {
      filtered = filtered.filter(
        (task) => task.status === statusFilter
      );
    }

    if (dateFilter) {
      filtered = filtered.filter((task) => {
        const taskDate = new Date(task.date);
        return (
          taskDate.getFullYear() === dateFilter.getFullYear() &&
          taskDate.getMonth() === dateFilter.getMonth() &&
          taskDate.getDate() === dateFilter.getDate()
        );
      });
    }

    if (sortByDate) {
      filtered = [...filtered].sort((a, b) =>
        sortByDate === 'asc'
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }

    return filtered;
  }, [tasks, statusFilter, sortByDate, dateFilter]);

  const renderTask = ({ item }: { item: Task }) => (
    <View style={styles.taskItem}>
      <View style={styles.taskHeader}>
        <Text
          style={styles.taskTitle}
          numberOfLines={1}
          ellipsizeMode='tail'
        >
          {item.title}
        </Text>
        <View style={styles.taskActions}>
          <TouchableOpacity onPress={() => handleEditTask(item)}>
            <MaterialIcons
              name='edit'
              size={20}
              color={colors.text}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDeleteTask(item.id)}
            style={{ marginLeft: 10 }}
          >
            <MaterialIcons
              name='delete'
              size={20}
              color={colors.trashIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text>{item.description}</Text>
      <Text>{new Date(item.date).toLocaleString()}</Text>
      <Text>Status: {item.status}</Text>
      <Text>Location: {item.location}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.addTaskContainer}>
        <Text style={styles.headerText}>Task Manager</Text>
        <FAB
          style={styles.fab}
          icon='plus'
          color={colors.background}
          size='small'
          onPress={() => {
            setEditingTask(null);
            setModalVisible(true);
          }}
        />
        <TaskForm
          visible={modalVisible}
          onSave={handleSaveTask}
          onClose={() => {
            setEditingTask(null);
            setModalVisible(false);
          }}
          existingTask={editingTask}
        />
      </View>

      <View style={styles.filterContainer}>
        <DropDownPicker
          open={statusOpen}
          value={statusFilter}
          items={statusItems}
          setOpen={setStatusOpen}
          setValue={setStatusFilter}
          setItems={setStatusItems}
          placeholder='Filter by status'
          style={{ borderColor: colors.gray }}
          dropDownContainerStyle={{ zIndex: 1000 }}
        />

        <View style={styles.ascDescContainer}>
          <Button
            mode={sortByDate === 'asc' ? 'contained' : 'outlined'}
            onPress={() => setSortByDate('asc')}
            style={{
              borderColor: colors.gray,
              flex: 1,
              backgroundColor:
                sortByDate === 'asc'
                  ? colors.activeFilter
                  : colors.background
            }}
            textColor={
              sortByDate === 'asc' ? colors.background : colors.text
            }
          >
            Sort Asc
          </Button>
          <Button
            mode={sortByDate === 'desc' ? 'contained' : 'outlined'}
            onPress={() => setSortByDate('desc')}
            style={{
              borderColor: colors.gray,
              flex: 1,
              backgroundColor:
                sortByDate === 'desc'
                  ? colors.activeFilter
                  : colors.background
            }}
            textColor={
              sortByDate === 'desc' ? colors.background : colors.text
            }
          >
            Sort Desc
          </Button>
        </View>

        <View style={styles.filterByDateContainer}>
          <Button
            mode='outlined'
            onPress={() => setShowDatePicker(true)}
            textColor={colors.text}
            style={styles.dateFilterButton}
          >
            {dateFilter
              ? dateFilter.toLocaleDateString()
              : 'Filter by date'}
          </Button>
          {dateFilter && (
            <Button
              mode='text'
              onPress={clearDateFilter}
              textColor={colors.activeFilter}
            >
              x Clear
            </Button>
          )}
        </View>

        {showDatePicker && (
          <DateTimePicker
            minimumDate={new Date()}
            value={dateFilter ?? new Date()}
            mode='date'
            style={styles.dateTimePicker}
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={handleDateChange}
          />
        )}
      </View>

      <FlatList
        data={filteredAndSortedTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        contentContainerStyle={styles.flatList}
        ListEmptyComponent={<Text>No tasks yet</Text>}
      />
    </SafeAreaView>
  );
}
