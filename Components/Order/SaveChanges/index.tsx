import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface IProps {
  isActive: boolean;
  saveOrder: () => void;
}

const SaveChanges = ({ isActive, saveOrder }: IProps) => {
  return (
    <TouchableOpacity
      onPress={isActive ? saveOrder : () => {}}
      accessibilityLabel={'Save order'}
      style={isActive ? styles.saveOrder : styles.saveOrderDisabled}
    >
      <Text>SAVE CHANGES</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  saveOrder: {
    backgroundColor: '#6ea23e',
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#a9d275',
    color: '#fff',
  },
  saveOrderDisabled: {
    borderWidth: 1,
    borderColor: '#999999',
    backgroundColor: '#cccccc',
    color: '#666666',
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default SaveChanges;
