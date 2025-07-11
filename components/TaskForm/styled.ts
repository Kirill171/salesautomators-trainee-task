import colors from '@/constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.background,
    padding: 20,
    margin: 20,
    borderRadius: 10,
    color: colors.text
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 4
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 8
  },
  error: {
    color: colors.trashIcon,
    fontSize: 12,
    marginTop: -18,
    paddingLeft: 5,
    marginBottom: 8
  },
  charCount: {
    fontSize: 12,
    color: colors.placeholder,
    alignSelf: 'flex-end'
  },
  pickerWrapper: {
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 10
  },
  dropdown: {
    borderColor: colors.gray,
    borderRadius: 8,
    marginBottom: 12,
    zIndex: 3000
  },
  dropdownContainer: {
    borderColor: colors.gray,
    borderRadius: 8,
    zIndex: 2000
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  }
});

export default styles;
