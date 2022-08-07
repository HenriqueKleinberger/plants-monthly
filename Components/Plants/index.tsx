import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { IPlant } from '../../types';

interface IProps {
  plant: IPlant;
  onPress: (plant: IPlant) => void;
  accessibilityLabel: string;
}

const Plant = ({ plant, onPress, accessibilityLabel }: IProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(plant)}
      accessibilityLabel={accessibilityLabel}
      style={styles.touchable}
    >
      <Image
        style={styles.plantImg}
        source={{
          uri: `https://dev-agwa-public-static-assets-web.s3-us-west-2.amazonaws.com/images/vegetables/${plant.imageId}@3x.jpg`,
        }}
      />
      <Text style={styles.text}>{plant.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  plant: { padding: 10 },
  selectedPlants: {
    flexDirection: 'row',
  },
  plantImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  text: {
    flexWrap: 'wrap',
    maxWidth: '100%',
    fontSize: 9,
    fontWeight: '600',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  touchable: {
    width: 65,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default Plant;
