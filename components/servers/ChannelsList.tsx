import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import ChannelItem from "./ChannelItem";

export function ChannelsList({channels}) {
  return (
    <ScrollView style={{ flex: 1 }}>
      {channels.map((channel) => {
        return <ChannelItem key={channel.id} channel={channel} />;
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});
