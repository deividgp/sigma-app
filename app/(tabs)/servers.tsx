import {
  StyleSheet,
  Image,
  Platform,
  Button,
  View,
  TouchableOpacity,
  Modal,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { ChannelsList } from "@/components/servers/ChannelsList";
import React, { useEffect, useState } from "react";
import { MembersList } from "@/components/servers/MembersList";
import { useUserStore } from "@/stores/userStore";
import ServerItem from "@/components/servers/ServerItem";
import { getServer } from "@/services/ServerService";
import { Ionicons } from "@expo/vector-icons";
import AddServer from "@/components/servers/AddServer";
import AddChannel from "@/components/servers/AddChannel";
import { useSignal } from "@/context/signalContext";
import { produce } from "immer";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ServersScreen() {
  const [isMembers, setIsMembers] = useState(false);
  const [server, setServer] = useState(null);
  const { user } = useUserStore();
  const { serverConnection } = useSignal();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const params = useLocalSearchParams();

  const onPress = () => {
    setIsMembers(!isMembers);
  };

  useEffect(() => {
    getServer(params.serverId)
      .then((r) => {
        setServer(r.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [params.serverId]);

  useEffect(() => {
    if (server == null) return;

    serverConnection.on("ReceiveChannelCreate", (data) => {
      setServer(
        produce((draft) => {
          draft!.channels.push(data);
        })
      );
    });

    return () => {
      serverConnection.off("ReceiveChannelCreate");
    };
  }, [server]);

  const onSubmitAddChannel = (data) => {
    serverConnection.send("SendCreateChannel", {
      serverId: server?.id,
      channelName: data.channel,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <ThemedText type="title">{server?.name}</ThemedText>
        {server != null && server.ownerId == user.id && (
          <Button onPress={() => setIsModalVisible(true)} title="New channel" />
        )}
      </View>
      <View style={styles.titleContainer}>
        {server != null && (
          <Button
            onPress={onPress}
            title={isMembers ? "Channels list" : "Members list"}
          />
        )}
      </View>
      <ScrollView style={{ flex: 1 }}>
        {server != null && (
          <>
            {isMembers ? (
              <MembersList members={server.members}></MembersList>
            ) : (
              <ChannelsList channels={server.channels}></ChannelsList>
            )}
          </>
        )}
      </ScrollView>
      <Modal
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        transparent={false}
        animationType="slide"
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AddChannel onSubmitAddChannel={onSubmitAddChannel} />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  container: {
    flexDirection: "column",
    flex: 1,
  },
  button: {
    width: 50,
  },
});
