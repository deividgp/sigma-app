import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
export default function ChannelItem({ channel }) {
  const navigation = useNavigation();

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{channel.name}</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("channelChat", {
            channelId: channel.id,
            channelName: channel.name,
          })
        }
      >
        <Ionicons name="chatbox-outline" size={50} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    flexDirection: "row",
    gap: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
});
