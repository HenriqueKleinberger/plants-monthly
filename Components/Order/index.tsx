import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { ICategory, IOrderResponse, IPlant } from '../../types';
import Categories from '../Categories';
import Plant from '../Plants';
import orderActions, { initialOrder } from '../../actions/order';
import categoryActions from '../../actions/category';
import DeleteIcon from '../Images/DeleteIcon';

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
  'January',
];

export default function App() {
  const [order, setOrder] = useState<IOrderResponse>(initialOrder);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSaveChangesEnabled, toggleSaveChangesEnabled] = useState(false);

  useEffect(() => {
    const getOrder = async () => {
      setOrder(await orderActions.getLastOrder());
    };
    const getCategories = async () => {
      setCategories(await categoryActions.getCategories());
    };

    const loadInitialData = async () => {
      setLoading(true);
      try {
        await Promise.all([getCategories(), getOrder()]);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const selectPlant = (plant: IPlant) => {
    if (order.plants.length === 5) {
      Alert.alert('You cant add more than 5 plants');
      return;
    }
    const orderUpdated = {
      ...order,
      plants: order.plants.concat([{ ...plant, key: uuidv4() }]),
    };
    setOrder(orderUpdated);
    toggleSaveChangesEnabled(orderUpdated.plants.length === 5);
  };

  const saveOrder = async () => {
    setLoading(true);
    try {
      const response = await orderActions.saveOrder(order);
      setOrder(response);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) Alert.alert(error.message);
    }
    setLoading(false);
  };

  const removeSelectedPlant = (plant: IPlant) => {
    setOrder({
      ...order,
      plants: order.plants.filter((sp) => sp.key !== plant.key),
    });
    toggleSaveChangesEnabled(false);
  };

  if (loading) return <Text>loading....</Text>;

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
          >{`Changes to your next order can be made until the end of ${
            monthNames[order.month - 1]
          }`}</Text>
          <Text
            style={styles.paragraph}
          >{`This order will be shipped on the beginning of ${
            monthNames[order.month]
          }`}</Text>
        </View>

        <View />
        <Text style={styles.selectedPlantsText}>
          {order.plants.length ? 'Your selected plants:' : 'Select your plants'}
        </Text>
        <View style={styles.selectedPlants}>
          {order.plants.map((p) => {
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
        <Categories categories={categories} selectPlant={selectPlant} />
        <TouchableOpacity
          onPress={isSaveChangesEnabled ? saveOrder : () => {}}
          accessibilityLabel={'Save order'}
          style={
            isSaveChangesEnabled ? styles.saveOrder : styles.saveOrderDisabled
          }
        >
          <Text>SAVE CHANGES</Text>
        </TouchableOpacity>
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
  selectedPlantsText: {
    fontWeight: '600',
    paddingTop: 45,
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
  deleteImage: {
    height: 50,
  },
});
