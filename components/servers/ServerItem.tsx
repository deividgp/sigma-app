import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function ServerItem({ server }) {
  const handlePress = () => {};

  return (
    <TouchableOpacity onPress={() => handlePress()}>
      {server.icon ? (
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      ) : (
        <Text>{server.name}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 100,
    width: 100,
    bottom: 0,
    left: 0,
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 1,
  },
});
