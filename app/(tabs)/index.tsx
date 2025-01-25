import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from 'expo-router';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Image, StyleSheet, Platform, Text, View } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Ecommerce Cart",
      headerTitleAlign: "left",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 20,
        color: "white",
      },
      headerStyle: {
        backgroundColor: "#3275d4",
        height: 90,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
      headerRight: () => (
        <FontAwesome5 name="cart-arrow-down" size={22} color="white" style={{ marginRight: 15 }} />
      ),
    });
  }, [navigation]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, []);
console.log("products", products);


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <ScrollView style={{margin:20}}>
      <View>
        <Text>Hello</Text>
      </View>
    </ScrollView>
    </GestureHandlerRootView>

  );
}

const styles = StyleSheet.create({
  
});