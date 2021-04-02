import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {dySize} from '../utils/responsive';
import themes from '../utils/themes';

interface SearchInputProps {
  width?: number;
  placeholder?: string;
  onChange: (text: string) => void;
  style?: any;
}

const SearchInput: React.FC<SearchInputProps> = ({
  width = dySize(345),
  placeholder = 'Search by...',
  onChange,
  style = {},
}) => {
  return (
    <View style={[styles.container, {width, ...style}]}>
      <Icon name="search-outline" size={30} style={styles.searchIcon} />
      <TextInput
        style={styles.input}
        onChangeText={onChange}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themes.color.gray,
    borderRadius: 6,
    overflow: 'hidden',
  },
  input: {
    height: dySize(30),
    flex: 1,
    paddingHorizontal: 5,
    fontSize: 20,
  },
  searchIcon: {
    color: 'gray',
    padding: 5,
  },
});

export default SearchInput;
