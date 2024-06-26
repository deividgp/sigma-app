import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function ServerItem({ server, onPress }) {

  return (
    <TouchableOpacity onPress={onPress}>
        <Text>{server.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 100,
    width: 100,
    bottom: 0,
    left: 0,
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 1,
  },
});
