import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { Image, StyleSheet, Platform, Text, View } from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import ProductItem from "../../components/ProductItem";
import { useSelector } from "react-redux";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

  const cart = useSelector((state) => state.cart.cart);
  const totalQuantity = cart.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );

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
        <>
          <Text
            style={{
              color: "white",
              marginRight: 10,
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            ({totalQuantity})
          </Text>

          <FontAwesome5
            name="cart-arrow-down"
            size={22}
            color="white"
            style={{ marginRight: 15 }}
            onPress={() => navigation.navigate("cart")}
          />
        </>
      ),
    });
  }, [navigation, totalQuantity]);

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
  // console.log("products", products);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView style={{ margin: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {products?.map((item, index) => (
            <ProductItem item={item} key={index} />
          ))}
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});
