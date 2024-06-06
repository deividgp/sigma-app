import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import ContactItem from "./ContactItem";
import { useUserStore } from "@/stores/userStore";
import { useTranslation } from "react-i18next";
import AddContact from "./AddContact";

export function ContactsList() {
  const { user } = useUserStore();
  const { t } = useTranslation();

  if (!user) {
    return <Text>{t("loading")}</Text>;
  }

  return (
    <>
      <View style={styles.titleContainer}>
        <AddContact />
      </View>
      <ScrollView style={styles.stepContainer}>
        {user.contacts.map((contact) => {
          return <ContactItem contact={contact} key={contact.id} />;
        })}
      </ScrollView>
    </>
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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
