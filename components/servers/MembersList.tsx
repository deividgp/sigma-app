import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import MemberItem from "./MemberItem";

const data = [
  { id: "1", title: "Member 1", description: "Description 1" },
  { id: "2", title: "Member 2", description: "Description 2" },
  { id: "3", title: "Member 3", description: "Description 3" },
  { id: "4", title: "Member 4", description: "Description 4" },
  { id: "5", title: "Member 5", description: "Description 5" },
];

export function MembersList() {
  const renderItem = ({ item }) => (
    <MemberItem title={item.title} description={item.description} />
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
