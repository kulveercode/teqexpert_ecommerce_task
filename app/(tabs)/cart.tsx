import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { decrementQuantity, incrementQuantity } from "@/redux/CartReducer";

const cart = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const addItemToCart = (item) => {
    dispatch(incrementQuantity(item));
  };

  const removeItemToCart = (item) => {
    dispatch(decrementQuantity(item));
  };

  const cart = useSelector((state) => state.cart.cart);
  // console.log(cart);
  const totalQuantity = cart.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );

  //total
  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

    const totalPrice = total.toFixed(2);

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
        />
        </>
      ),
    });
  }, [navigation, totalQuantity]);

  return (
    <ScrollView style={{ margin: 20, marginHorizontal:10 }}>
      <View style={{ marginHorizontal: 10 }}>
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <Text style={{ fontSize: 18, fontWeight: "400" }}>Total:</Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>₹{totalPrice}</Text>
        </View>
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <Pressable
              key={index}
              style={{
                marginHorizontal: 10,
                marginVertical: 10,
                backgroundColor: "white",
                borderRadius: 8,
                padding: 10,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={{ width: 150, height: 150, resizeMode: "contain" }}
                  source={{ uri: item?.image }}
                />
                <View style={{ marginTop: 10 }}>
                  <Text
                    numberOfLines={2}
                    style={{ width: 180, fontSize: 16, fontWeight: "600" }}
                  >
                    {item?.title}
                  </Text>
                  <Text numberOfLines={4} style={{ width: 150, marginTop: 10 }}>
                    {item?.description}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      marginVertical: 10,
                    }}
                  >
                    ₹{item?.price}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Pressable
                  onPress={() => addItemToCart(item)}
                  style={{
                    backgroundColor: "#white",
                    padding: 7,
                    borderRadius: 20,
                    width: 40,
                    height: 40,
                    borderWidth: 1,
                  }}
                >
                  <AntDesign name="plus" size={24} color="black" />
                </Pressable>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "600",
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                >
                  {item.quantity}
                </Text>
                <Pressable
                  onPress={() => removeItemToCart(item)}
                  style={{
                    backgroundColor: "#white",
                    padding: 7,
                    borderRadius: 20,
                    width: 40,
                    height: 40,
                    borderWidth: 1,
                  }}
                >
                  <AntDesign name="minus" size={24} color="black" />
                </Pressable>
              </View>
            </Pressable>
          ))
        ) : (
          <Text style={{ fontSize: 18, textAlign: "center", marginTop: 20 }}>
            Your cart is empty.
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default cart;

const styles = StyleSheet.create({});
