import React, { useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import PendingItem from "./PendingItem";
import { useUserStore } from "@/stores/userStore";
import { useTranslation } from "react-i18next";

export default function PendingList() {
  const { user } = useUserStore();
  const { t } = useTranslation();

  if (!user) {
    return <Text>{t("loading")}</Text>;
  }

  return (
    <ScrollView style={styles.stepContainer}>
      {user.pending.map((pending) => {
        return <PendingItem pending={pending} key={pending.id} />;
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
