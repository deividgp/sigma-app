import React from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import ContactItem from "./ContactItem";
import { useUserStore } from "@/stores/userStore";

export function ContactsList() {
  const { user } = useUserStore();
  
  if (!user) {
    return <Text>Loading</Text>;
  }

  return (
    <>
      {user.contacts.map((contact) => {
        return <ContactItem contact={contact} key={contact.id} />;
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
