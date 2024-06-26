import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MessageItem({ username, message }) {
  const date = new Date(message.timestamp);

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{username}</Text>
      <Text style={styles.description}>{date.getHours()}:{date.getMinutes()} - {message.content}</Text>
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
