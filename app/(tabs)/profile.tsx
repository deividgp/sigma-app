import { Image, StyleSheet, Platform, View, Button } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/context/authContext";
import React from "react";

export default function ProfileScreen() {
  const { logOut } = useAuth();

  return (
    <>
      <View style={styles.stepContainer}>
        <Button title="Log Out" onPress={logOut} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    width: 80
  },
});
