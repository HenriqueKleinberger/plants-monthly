import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { IPlant } from '../../types';

interface IProps {
  plant: IPlant;
  selectPlant: (plant: IPlant) => void;
}

const Plant = ({ plant, selectPlant }: IProps) => {
  return (
    <TouchableOpacity
      onPress={() => selectPlant(plant)}
      accessibilityLabel={`Select the ${plant.name} for your next order`}
      style={styles.plant}
    >
      <Text>{plant.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  plant: { padding: 10 },
});

export default Plant;
