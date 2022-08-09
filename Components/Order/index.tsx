import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { ICategory, IOrderResponse, IPlant } from '../../types';
import Categories from './Categories';
import orderActions, { initialOrder } from '../../actions/order';
import categoryActions from '../../actions/category';
import SelectedPlants from './SelectedPlants';
import SaveChanges from './SaveChanges';

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
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const changePlants = (plants: IPlant[]) => {
    const orderUpdated = { ...order, plants };
    setOrder(orderUpdated);
    toggleSaveChangesEnabled(orderUpdated.plants.length === 5);
  };

  const saveOrder = async () => {
    setLoading(true);
    try {
      const response = await orderActions.saveOrder(order);
      setOrder(response);
      Alert.alert('Order saved');
    } finally {
      setLoading(false);
    }
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
        <SelectedPlants plants={order.plants} changePlants={changePlants} />
        <Categories
          categories={categories}
          changePlants={changePlants}
          plantsSelected={order.plants}
        />
        <SaveChanges isActive={isSaveChangesEnabled} saveOrder={saveOrder} />
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
  selectedPlantsText: {
    fontWeight: '600',
    paddingTop: 45,
  },
});
