import { useServer } from "@/context/serverContext";
import { useSignal } from "@/context/signalContext";
import { useUserStore } from "@/stores/userStore";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function MemberItem({ member }) {
  const { server } = useServer();
  const { user } = useUserStore();
  const { serverConnection } = useSignal();

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{member.username}</Text>
      {server.ownerId == user?.id && (
        <TouchableOpacity
          onPress={() =>
            serverConnection.send("SendRemoveMember", {
              serverId: server?.id,
              memberId: member.id,
            })
          }
        >
          <Ionicons name="trash-outline" size={50} color="black" />
        </TouchableOpacity>
      )}
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
});
