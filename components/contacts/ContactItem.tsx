import { useSignal } from "@/context/signalContext";
import { useUserStore } from "@/stores/userStore";
import { useNavigation } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";

export default function ContactItem({ contact }) {
  const { user } = useUserStore();
  const { connection } = useSignal();
  const navigation = useNavigation();

  const removeContact = () => {
    connection
      .invoke("SendRemoveContact", {
        userId: user?.id,
        targetUserId: contact.id,
      })
      .then((r: boolean) => {
        if (!r) {
          console.error("Error");
        }
      });
  };

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('contactChat', { conversationId: contact.conversationId, contactUsername: contact.username })}>
        <Text style={styles.title}>{contact.username}</Text>
      </TouchableOpacity>
      <Button onPress={removeContact} title="Remove" />
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
