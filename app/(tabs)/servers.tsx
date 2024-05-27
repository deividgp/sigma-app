import { StyleSheet, Image, Platform, Button, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { useNavigation } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import ServersList from "@/components/servers/ServersList";
import { ChannelsList } from "@/components/servers/ChannelsList";
import React, { useState } from "react";
import { MembersList } from "@/components/servers/MembersList";

export default function ServersScreen() {
  const [isMembers, setIsMembers] = useState(false);

  const onPress = () => {
    setIsMembers(!isMembers);
  };

  return (
    <>
      <View style={styles.titleContainer}>
        <Button
          onPress={onPress}
          title={isMembers ? "Channels list" : "Members list"}
        />
      </View>
      <View
        style={[
          styles.container,
          {
            flexDirection: "row",
          },
        ]}
      >
        <ScrollView style={{ maxWidth: 100 }}>
          <ServersList />
        </ScrollView>
        <ScrollView style={{ flex: 1 }}>
          {isMembers ? (
            <MembersList></MembersList>
          ) : (
            <ChannelsList></ChannelsList>
          )}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  container: {
    flex: 1,
  },
  button: {
    width: 50,
  },
});
