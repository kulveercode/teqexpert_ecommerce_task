import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useLayoutEffect } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

const cart = () => {
  const navigation = useNavigation();

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
        <FontAwesome5
          name="cart-arrow-down"
          size={22}
          color="white"
          style={{ marginRight: 15 }}
        />
      ),
    });
  }, [navigation]);

  return (
    <ScrollView style={{ margin: 20 }}>
      <View>
        <Text>cart</Text>
      </View>
    </ScrollView>
  );
};

export default cart;

const styles = StyleSheet.create({});
