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
  TouchableOpacity,
} from 'react-native';
import { ICategory, IOrder, IOrderResponse, IPlant } from './types';
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
  const [order, setOrder] = useState<IOrder>({
    id: 0,
    date: new Date(),
    plants: [],
  });
  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    const getOrderOpened = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/order/user/1/opened`
      );
      console.log(response);
      if (response.status === 200) {
        const orderResponse: IOrderResponse = await response.json();
        console.log(orderResponse);
        setOrder({ ...orderResponse, date: new Date(orderResponse.date) });
      }
    };
    getOrderOpened();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/category`
        );
        const categoriesResponse = await response.json();
        setCategories(categoriesResponse);
      } catch (error) {
        console.warn(error);
      }
    };
    getCategories();
  }, []);

  const selectPlant = (plant: IPlant) => {
    if (order?.plants.length === 5) {
      Alert.alert("You can't select for than 5 plants for your next order");
      return;
    }
    setOrder({ ...order, plants: order.plants.concat([plant]) });
  };

  const saveOrder = async () => {
    if (order.id) {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/order/user/1/order/${order.id}`,
        {
          method: 'PUT',
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify(order),
        }
      );
      const orderResponse = await response.json();
      setOrder({ ...orderResponse, date: new Date(orderResponse.date) });
    } else {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/order/user/1`,
        {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify(order),
        }
      );
      const orderResponse = await response.json();
      setOrder({ ...orderResponse, date: new Date(orderResponse.date) });
    }
  };

  const removeSelectedPlant = (plant: IPlant) =>
    setOrder({
      ...order,
      plants: order.plants.filter((sp) => sp.id !== plant.id),
    });

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
            monthNames[order.date.getMonth()]
          }`}</Text>
          <Text
            style={styles.paragraph}
          >{`This order will be shipped on the beginning of ${
            monthNames[order.date.getMonth() + 1]
          }`}</Text>
        </View>
        <View />
        <View style={styles.selectedPlants}>
          {order.plants.map((p) => (
            <TouchableOpacity
              onPress={() => removeSelectedPlant(p)}
              accessibilityLabel={`Remove the ${p.name} from your next order`}
              style={styles.selectedPlant}
            >
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: `https://dev-agwa-public-static-assets-web.s3-us-west-2.amazonaws.com/images/vegetables/${p.imageId}@3x.jpg`,
                }}
              />
              <View style={styles.selectedName}>
                <Text style={styles.selectedNameText}>{p.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.categories}>
          <Categories
            categories={categories}
            selectPlant={selectPlant}
            selectedPlants={order.plants}
          />
        </View>
        <TouchableOpacity
          onPress={saveOrder}
          accessibilityLabel={'Save order'}
          style={styles.saveOrder}
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
  saveOrder: {},
});
