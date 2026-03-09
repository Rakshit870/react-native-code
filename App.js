import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import ProductList from "./screens/ProductList";

function App() {
  //as i am using code sandBox unable to use contaxt and redux as i have limited time
  const [cartState, setCartState] = useState([]);
  const handleAdd = (data) => {
    setCartState([...cartState, data]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.cart}>
        <Text style={styles.text}>{cartState.length || 0}</Text>
      </View>
      <ProductList handleAdd={handleAdd} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cart: {
    position: "absolute",
    right: 10,
    top: 30,
    backgroundColor: "red",
    borderRadius: 50,
    padding: 10,
  },
  text: {
    color: "#FFF",
  },
});
export default App;
