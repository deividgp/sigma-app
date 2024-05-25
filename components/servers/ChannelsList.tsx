import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ChannelItem from "./ChannelItem";

const data = [
  { id: "1", title: "Channel 1", description: "Description 1" },
  { id: "2", title: "Channel 2", description: "Description 2" },
  { id: "3", title: "Channel 3", description: "Description 3" },
  { id: "4", title: "Channel 4", description: "Description 4" },
  { id: "5", title: "Channel 5", description: "Description 5" },
];

export function ChannelsList() {
  const renderItem = ({ item }) => (
    <ChannelItem title={item.title} description={item.description} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});
