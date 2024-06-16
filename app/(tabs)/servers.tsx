import { StyleSheet, View, useWindowDimensions } from "react-native";
import ThemedText from "@/components/ThemedText";
import { useLocalSearchParams } from "expo-router";
import { ChannelsList } from "@/components/servers/ChannelsList";
import React, { useEffect, useState } from "react";
import { MembersList } from "@/components/servers/MembersList";
import { useUserStore } from "@/stores/userStore";
import { getServer } from "@/services/ServerService";
import { useSignal } from "@/context/signalContext";
import { produce } from "immer";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import ServerSettings from "@/components/servers/ServerSettings";
import { useServer } from "@/context/serverContext";
import CustomButton from "@/components/CustomButton";
import { useTranslation } from "react-i18next";

export default function ServersScreen() {
  const { server, setServer } = useServer();
  const { user } = useUserStore();
  const { serverConnection } = useSignal();
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const params = useLocalSearchParams();
  const [index, setIndex] = useState(0);
  const { i18n, t } = useTranslation();
  const [routes, setRoutes] = useState([
    { key: "channels", title: t("channels") },
    { key: "members", title: t("members") },
  ]);

  useEffect(() => {
    setRoutes([
      { key: "channels", title: t("channels") },
      { key: "members", title: t("members") },
    ]);
  }, [i18n.language]);

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
            title={t("serverSettings")}
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
            title={t("leaveServer")}
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
