import { useServer } from "@/context/serverContext";
import { useSignal } from "@/context/signalContext";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ChannelItem({ channel }) {
  const navigation = useNavigation();
  const { serverConnection } = useSignal();
  const { server } = useServer();

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
      <TouchableOpacity
        onPress={() =>
          serverConnection.send("SendDeleteChannel", {
            serverId: server?.id,
            channelId: channel.id,
          })
        }
      >
        <Ionicons name="trash-outline" size={50} color="black" />
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
