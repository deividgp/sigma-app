import {
  StyleSheet,
  Image,
  Platform,
  View,
  TouchableOpacity,
  Modal,
  useWindowDimensions,
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
import AddChannel from "@/components/servers/AddChannel";
import { useSignal } from "@/context/signalContext";
import { produce } from "immer";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import ServerSettings from "@/components/servers/ServerSettings";
import { useServer } from "@/context/serverContext";
import CustomButton from "@/components/CustomButton";

export default function ServersScreen() {
  const { server, setServer } = useServer();
  const { user } = useUserStore();
  const { serverConnection } = useSignal();
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const params = useLocalSearchParams();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "channels", title: "Channels" },
    { key: "members", title: "Members" },
  ]);

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

    serverConnection.on("ReceiveChannelDelete", (data) => {
      setServer(
        produce((draft) => {
          const index = draft.channels.findIndex(
            (item) => item.id === data.channelId
          );
          if (index !== -1) {
            draft.channels.splice(index, 1);
          }
        })
      );
    });

    serverConnection.on("ReceiveMemberRemove", (data) => {
      setServer(
        produce((draft) => {
          const index = draft.members.findIndex(
            (item) => item.id === data.memberId
          );
          if (index !== -1) {
            draft.channels.splice(index, 1);
          }
        })
      );
    });

    return () => {
      serverConnection.off("ReceiveChannelCreate");
      serverConnection.off("ReceiveChannelDelete");
      serverConnection.off("ReceiveMemberRemove");
    };
  }, [server]);

  const membersRoute = () => (
    <MembersList members={server!.members}></MembersList>
  );

  const channelsRoute = () => (
    <ChannelsList channels={server!.channels}></ChannelsList>
  );

  const renderScene = SceneMap({
    channels: channelsRoute,
    members: membersRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "orange" }}
      style={{ backgroundColor: "#0A21EF" }}
    />
  );

  const layout = useWindowDimensions();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <ThemedText type="title">{server?.name}</ThemedText>
        {server != null && server.ownerId == user?.id && (
          <CustomButton
            onPress={() => setIsSettingsModalVisible(true)}
            title="Server settings"
          />
        )}
        {server != null && server.ownerId != user?.id && (
          <CustomButton
            onPress={() =>
              serverConnection.send("SendRemoveMember", {
                serverId: server?.id,
                memberId: user?.id,
              })
            }
            title="Leave server"
          />
        )}
      </View>
      {server != null && (
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
      )}
      <ServerSettings
        isModalVisible={isSettingsModalVisible}
        setIsModalVisible={setIsSettingsModalVisible}
      ></ServerSettings>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    flexDirection: "column",
    flex: 1,
  },
});
