import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import PendingItem from "./PendingItem";
import { useUserStore } from "@/stores/userStore";

export default function PendingList() {
  const { user } = useUserStore();

  if (!user) {
    return <Text>Loading</Text>;
  }

  return (
    <>
      {user.pending.map((pending) => {
        return <PendingItem pending={pending} key={pending.id} />;
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
