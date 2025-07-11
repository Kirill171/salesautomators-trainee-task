import colors from '@/constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.gray
  },
  addTaskContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20
  },
  headerText: {
    fontSize: 30,
    fontWeight: 700
  },
  filterContainer: {
    paddingHorizontal: 16,
    marginVertical: 12,
    zIndex: 1000
  },
  ascDescContainer: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 10
  },
  dateFilterButton: {
    flex: 1,
    backgroundColor: colors.background,
    borderColor: colors.gray
  },
  filterByDateContainer: {
    borderColor: colors.gray,
    flexDirection: 'row',
    gap: 8
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
    maxWidth: '100%'
  },
  taskActions: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  fab: {
    backgroundColor: colors.addTaskIcon
  },
  flatList: {
    paddingHorizontal: 16,
    paddingBottom: 100
  },
  taskItem: {
    gap: 10,
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: 20,
    marginTop: 20
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 700,
    width: '85%'
  },
  dateTimePicker: {
    backgroundColor: '#888',
    borderRadius: 20
  }
});

export default styles;
