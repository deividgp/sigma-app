import {
  StyleSheet,
  Image,
  Platform,
  Button,
  View,
  TouchableOpacity,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { useNavigation } from "expo-router";
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

export default function ServersScreen() {
  const [isMembers, setIsMembers] = useState(false);
  const [server, setServer] = useState(null);
  const { user } = useUserStore();
  const { serverConnection } = useSignal();

  const onPress = () => {
    setIsMembers(!isMembers);
  };

  const serverOnPress = (serverId) => {
    getServer(serverId)
      .then((r) => {
        setServer(r.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

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
    <>
      <View style={styles.titleContainer}>
        <AddServer></AddServer>
        {server != null && (
          <Button
            onPress={onPress}
            title={isMembers ? "Channels list" : "Members list"}
          />
        )}
      </View>
      {server != null && server.ownerId == user.id && (
        <View style={styles.titleContainer}>
          <AddChannel onSubmitAddChannel={onSubmitAddChannel}></AddChannel>
        </View>
      )}
      <View
        style={[
          styles.container,
          {
            flexDirection: "row",
          },
        ]}
      >
        <ScrollView
          style={{
            maxWidth: 100,
            borderRightWidth: 1,
            backgroundColor: "lightblue",
          }}
        >
          {/*<TouchableOpacity>
            <Ionicons name="add-circle-outline" size={100} color="black" />
      </TouchableOpacity>*/}
          {user?.servers.map((server) => {
            return (
              <ServerItem
                key={server.id}
                server={server}
                onPress={() => {
                  serverOnPress(server.id);
                }}
              />
            );
          })}
        </ScrollView>
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
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  button: {
    width: 50,
  },
});
