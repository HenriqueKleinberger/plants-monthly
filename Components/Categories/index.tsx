import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { ICategory, IPlant } from '../../types';
import Plant from '../Plants';

interface IProps {
  categories: ICategory[];
  selectPlant: (plant: IPlant) => void;
  selectedPlants: IPlant[];
}

const Categories = ({ categories, selectPlant, selectedPlants }: IProps) => {
  const [activesCategories, setActivesCategories] = useState<ICategory[]>([]);

  const isCategoryActive = (category: ICategory) =>
    activesCategories.find((ac) => ac.id === category.id) !== undefined;

  const toggleCategory = (category: ICategory) => {
    if (!isCategoryActive(category)) {
      setActivesCategories(activesCategories.concat([category]));
    } else {
      setActivesCategories(
        activesCategories.filter((c) => {
          c.id === category.id;
        })
      );
    }
  };
  return (
    <View style={styles.container}>
      {categories.map((c) => {
        const isActive = isCategoryActive(c);
        return (
          <View key={c.id}>
            <TouchableOpacity
              onPress={() => toggleCategory(c)}
              accessibilityLabel={
                isActive ? 'Collapse category' : 'Open category'
              }
              style={styles.category}
            >
              <Text style={styles.categoryName}>{c.name}</Text>
            </TouchableOpacity>
            {isActive &&
              c.plants
                .filter(
                  (p) =>
                    selectedPlants.find((sp) => sp.id === p.id) === undefined
                )
                .map((p) => (
                  <Plant key={p.id} plant={p} selectPlant={selectPlant} />
                ))}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  selectedPlants: {},
  category: {
    borderWidth: 1,
    borderColor: 'black',
  },
  categoryName: {
    color: '#3d2f4b',
    justifyContent: 'flex-start',
    fontSize: 18,
    textTransform: 'uppercase',
  },
  container: {
    marginTop: 20,
  },
});

export default Categories;
