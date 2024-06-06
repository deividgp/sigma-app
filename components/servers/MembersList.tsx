import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import MemberItem from "./MemberItem";

export function MembersList({members}) {
  return (
    <ScrollView style={{ flex: 1 }}>
      {members.map((member) => {
        return <MemberItem key={member.id} member={member} />;
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
