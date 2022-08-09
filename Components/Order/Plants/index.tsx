import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import { IPlant } from '../../../types';
import DeleteIcon from '../../Images/DeleteIcon';

interface IProps {
  plant: IPlant;
  onPress: (plant: IPlant) => void;
  accessibilityLabel: string;
  children?: React.ReactNode;
}

const Plant = ({ plant, onPress, accessibilityLabel, children }: IProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(plant)}
      accessibilityLabel={accessibilityLabel}
      style={styles.touchable}
    >
      <View style={styles.deleteImg}>{children}</View>
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
  touchable: {
    width: 65,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
  },
  plantImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  deleteImg: {
    position: 'absolute',
    zIndex: 2,
    right: 0,
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
});

export default Plant;
