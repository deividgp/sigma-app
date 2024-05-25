import React from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import ContactItem from "./ContactItem";
import { useUser } from "@/context/userContext";

const data = [
  { id: "1", title: "Item 1", description: "Description 1" },
  { id: "2", title: "Item 2", description: "Description 2" },
  { id: "3", title: "Item 3", description: "Description 3" },
  { id: "4", title: "Item 4", description: "Description 4" },
  { id: "5", title: "Item 5", description: "Description 5" },
];

export function ContactsList() {
  const { user } = useUser();

  if (!user) {
    return <Text>Loading</Text>;
  }

  return (
    <>
      {user.contacts.map((contact) => {
        <ContactItem contact={contact} />;
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
