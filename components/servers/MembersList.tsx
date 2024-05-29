import React from "react";
import { StyleSheet } from "react-native";
import MemberItem from "./MemberItem";

export function MembersList({members}) {
  return (
    <>
      {members.map((member) => {
        return <MemberItem key={member.id} member={member} />;
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
