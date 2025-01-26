import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrementQuantity, incrementQuantity } from "@/redux/CartReducer";
import { AntDesign } from "@expo/vector-icons";

const ProductItem = ({ item }) => {
  const dispatch = useDispatch();

  const addItemToCart = (item) => {
    dispatch(incrementQuantity(item));
  };

  const removeItemToCart = (item) => {
    dispatch(decrementQuantity(item));
  };

  // Get the product from the cart
  const cart = useSelector((state) => state.cart.cart);
  const cartItem = cart.find((cartItem) => cartItem.id === item.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <Pressable
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
            style={{ fontSize: 18, fontWeight: "bold", marginVertical: 10 }}
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
          {quantity}
        </Text>
        <Pressable
          onPress={() => quantity > 0 && removeItemToCart(item)}
          style={{
            backgroundColor: "#white",
            padding: 7,
            borderRadius: 20,
            width: 40,
            height: 40,
            borderWidth: 1,
          }}
          disabled={quantity === 0}
        >
          <AntDesign name="minus" size={24} color="black" />
        </Pressable>
      </View>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
