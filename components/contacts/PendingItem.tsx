import { useSignal } from "@/context/signalContext";
import { useUserStore } from "@/stores/userStore";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PendingItem({ pending }) {
  const { user } = useUserStore();
  const { connection } = useSignal();

  const acceptContact = () => {
    connection
      .invoke("SendAcceptPending", {
        userId: user?.id,
        username: user?.username,
        targetUsername: pending.username,
        targetUserId: pending.id,
      })
      .then((r: boolean) => {
        if (!r) {
          console.error("Error");
        }
      });
  };

  const rejectContact = () => {
    connection
      .invoke("SendRemovePending", {
        UserId: user?.id,
        TargetUserId: pending.id,
      })
      .then((r: boolean) => {
        if (!r) {
          console.error("Error");
        }
      });
  };

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{pending.username}</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={acceptContact}>
          <Ionicons name="checkmark-outline" size={50} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={rejectContact}>
          <Ionicons name="close-outline" size={50} color="black" />
        </TouchableOpacity>
      </View>
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
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 25,
  },
});
