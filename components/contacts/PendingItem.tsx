import { useSignal } from "@/context/signalContext";
import { useUserStore } from "@/stores/userStore";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../CustomButton";

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
      <CustomButton onPress={acceptContact} title="Accept" />
      <CustomButton onPress={rejectContact} title="Reject" />
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
