import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { ICategory, IPlant } from './types';
import Categories from './Components/Categories';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function App() {
  const [orderDate, setOrderDate] = useState<Date>(new Date());
  const [selectedPlants, setSelectedPlants] = useState<IPlant[]>([
    {
      id: 'cucumber_iznik',
      name: 'Cucumber - Iznik',
      imageId: 'iznik',
    },
    {
      id: 'cilantro_santo',
      name: 'Cilantro - Santo',
      imageId: 'cilantro_santo',
    },
    { id: 'tomato_bigdena', name: 'Tomato - Bigdena', imageId: 'bigdena' },
    {
      id: 'pac_choi_mei_qing_choi',
      name: 'Pac Choi - Mei Qing Choi',
      imageId: 'pac_choi_mei_qing_choi',
    },
    {
      id: 'lettuce_green_butter',
      name: 'Lettuce - Green Butter',
      imageId: 'lettuce_green_butter',
    },
  ]);
  const [categories, setCategories] = useState<ICategory[]>([]);

  // useEffect(() => {
  //   const getPlants = async () => {
  //     const response = await fetch(
  //       'https://dev-agwa-public-static-assets-web.s3-us-west-2.amazonaws.com/data/catalogs/plants.json',
  //     );
  //     // console.warn(await response.json());
  //     const plants = (await response.json()).plants;
  //     setSelectedPlants(plants);
  //   };
  //   getPlants();
  // }, []);

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch(
        'https://dev-agwa-public-static-assets-web.s3-us-west-2.amazonaws.com/data/catalogs/agwafarm.json'
      );
      // console.warn(await response.json());
      const categoriesResponse = (await response.json()).categories;
      setCategories(categoriesResponse);
    };
    getCategories();
  }, []);

  const selectPlant = (plant: IPlant) => {
    if (selectedPlants.length === 5) {
      Alert.alert("You can't select for than 5 plants for your next order");
      return;
    }
    setSelectedPlants(selectedPlants.concat([plant]));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.title}>Your next order</Text>
        </View>
        <View style={styles.message}>
          <Text style={styles.paragraph}>
            The monthly plants order consists of 5 plants.
          </Text>
          <Text
            style={styles.paragraph}
          >{`Changes to your next order ca be made until the end of ${
            monthNames[orderDate.getMonth()]
          }`}</Text>
          <Text
            style={styles.paragraph}
          >{`This order will be shipped on the beginning of ${
            monthNames[orderDate.getMonth() + 1]
          }`}</Text>
        </View>
        <View />
        <View style={styles.selectedPlants}>
          {selectedPlants.map((s) => (
            <View style={styles.selectedPlant}>
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: `https://dev-agwa-public-static-assets-web.s3-us-west-2.amazonaws.com/images/vegetables/${s.imageId}@3x.jpg`,
                }}
              />
              <View style={styles.selectedName}>
                <Text style={styles.selectedNameText}>{s.name}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.categories}>
          <Categories categories={categories} selectPlant={selectPlant} />
        </View>
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f5ff',
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: '30%',
  },
  message: {
    fontSize: 16,
    marginTop: '5%',
  },
  paragraph: {
    marginTop: '1%',
  },
  selectedPlants: {
    flexDirection: 'row',
  },
  categories: {},
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  selectedNameText: {
    flexWrap: 'wrap',
    maxWidth: '100%',
    fontSize: 9,
    fontWeight: '600',
    justifyContent: 'center',
  },
  selectedPlant: {
    width: '20%',
    padding: 10,
  },
  selectedName: {
    justifyContent: 'center',
  },
});
