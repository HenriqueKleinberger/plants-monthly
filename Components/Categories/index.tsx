import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import { ICategory, IPlant } from '../../types';
import AddIcon from '../Images/AddIcon';
import Arrow from '../Images/Arrow';
import Plant from '../Plants';

interface IProps {
  categories: ICategory[];
  selectPlant: (plant: IPlant) => void;
  nrPlantsSelected: number;
}

const Categories = ({ categories, selectPlant, nrPlantsSelected }: IProps) => {
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
              <View style={styles.collapse}>
                <Text style={styles.categoryName}>{c.name}</Text>
                <Arrow collapsed={isActive} />
              </View>
            </TouchableOpacity>
            {isActive && (
              <ScrollView style={styles.scroll} horizontal>
                {c.plants.map((p) => (
                  <Plant
                    key={p.id}
                    plant={p}
                    onPress={selectPlant}
                    accessibilityLabel={`Select the ${p.name} for your next order`}
                  >
                    {nrPlantsSelected !== 5 && <AddIcon />}
                  </Plant>
                ))}
              </ScrollView>
            )}
          </View>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  scroll: { flexDirection: 'row' },
  collapse: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  selectedPlants: {},
  category: {
    borderWidth: 1,
    borderColor: 'black',
    margin: 1,
  },
  categoryName: {
    color: '#3d2f4b',
    justifyContent: 'flex-start',
    fontSize: 18,
    textTransform: 'uppercase',
    padding: 8,
  },
  container: {
    marginTop: 20,
  },
});

export default Categories;
