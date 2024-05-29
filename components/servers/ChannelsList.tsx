import React from "react";
import { StyleSheet } from "react-native";
import ChannelItem from "./ChannelItem";

export function ChannelsList({channels}) {
  return (
    <>
      {channels.map((channel) => {
        return <ChannelItem key={channel.id} channel={channel} />;
      })}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});
