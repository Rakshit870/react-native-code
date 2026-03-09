import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import SearchingComponent from "../components/SearchingComponent";

interface propsTypes {
  handleAdd: () => void;
}
const ProductList = ({ handleAdd }: propsTypes) => {
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [searchingText, setSearchingText] = useState("");
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setLoading(false);
      console.log(data.products);
      setProductData(data.products);
    } catch (e) {
      setLoading(false);
      Alert.alert("someThing went wrong");
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.item} onPress={() => handleAdd(item)}>
        <Image
          source={{ uri: item?.thumbnail }}
          width={300}
          height={80}
          resizeMode="contain"
        />
        <View style={styles.desc}>
          <Text>{item.title}</Text>
          <Text>{item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchingText == "") {
      return;
    }
    const timerId = setTimeout(() => {
      const searchedData = productData.filter((res) =>
        res.title.toLowerCase().includes(searchingText.toLowerCase()),
      );
      setSearchedData(searchedData);
    }, 2000);

    return () => clearTimeout(timerId);
  }, [searchingText]);
  if (loading) {
    return (
      <View style={styles.loadingStyle}>
        <Text>Loding...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 70 }}>
        <SearchingComponent
          searchingText={searchingText}
          setSearchingText={setSearchingText}
        />
      </View>
      <FlatList
        data={searchingText == "" ? productData : searchedData}
        keyExtractor={(res) => res.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: 300,
    height: 150,
    backgroundColor: "grey",
    borderRadius: 10,
    marginHorizontal: "auto",
    marginVertical: 5,
  },
  loadingStyle: {
    flex: 1,
    justifyContent: "center",
    alignItem: "center",
    flexDirection: "row",
  },
  desc: {
    marginHorizontal: 10,
    marginTop: 10,
  },
});

export default ProductList;
