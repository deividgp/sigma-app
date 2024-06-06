import { useSignal } from "@/context/signalContext";
import { useUserStore } from "@/stores/userStore";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

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
      <Text style={styles.title}>{contact.username}</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("contactChat", {
            conversationId: contact.conversationId,
            contactUsername: contact.username,
          })
        }
      >
        <Ionicons name="chatbox-outline" size={50} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={removeContact}>
        <Ionicons name="person-remove-outline" size={50} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#B04B2B",
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
