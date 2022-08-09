import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IPlant } from '../../../types';
import DeleteIcon from '../../Images/DeleteIcon';
import Plant from '../Plants';

interface IProps {
  changePlants: (plants: IPlant[]) => void;
  plants: IPlant[];
}

const SelectedPlants = ({ changePlants, plants }: IProps) => {
  const removeSelectedPlant = (plant: IPlant) => {
    changePlants(plants.filter((sp) => sp.key !== plant.key));
  };

  return (
    <View style={styles.selectedPlants}>
      {plants.map((p) => {
        return (
          <Plant
            key={p.key}
            plant={p}
            onPress={removeSelectedPlant}
            accessibilityLabel={`Remove the ${p.name} from your next order`}
          >
            <DeleteIcon />
          </Plant>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  selectedPlants: { flexDirection: 'row' },
});

export default SelectedPlants;
