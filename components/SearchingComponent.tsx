import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TextInput,
} from "react-native";

interface PropsType {
  searchingText: string;
  setSearchingText: () => void;
}

const SearchingComponent = ({ searchingText, setSearchingText }: PropsType) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="serach here"
        value={searchingText}
        onChangeText={(text: string) => {
          setSearchingText(text);
        }}
        style={styles.inputstyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 50,
    marginHorizontal: "auto",
  },
  inputStyle: {
    flex: 1,
    borderWidth: 5,
    borderStyle: "solid",
    borderColor: "gray",
    backgroundColor: "gray",
  },
});
export default SearchingComponent;
