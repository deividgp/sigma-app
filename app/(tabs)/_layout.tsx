import { Tabs, useFocusEffect } from "expo-router";
import React, { useState } from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Redirect, Slot, Stack, router, useNavigation } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { useUserStore } from "@/stores/userStore";
import createSignalRConnection from "@/helpers/createSignalRConnection";
import { useSignal } from "@/context/signalContext";
import { getUser } from "@/services/UserService";

export default function AppLayout() {
  const {
    accessToken,
    refreshToken,
    setAccessToken,
    setRefreshToken,
    isLoadingAccess,
    isLoadingRefresh,
  } = useAuth();
  const {
    user,
    updateUser,
    addContact,
    removeContact,
    addPending,
    removePending,
    addServer,
    removeServer,
  } = useUserStore();
  const navigation = useNavigation();
  const { setConnection, setServerConnection, connected, setConnected } =
    useSignal();

  useEffect(() => {
    getUser()
      .then((r) => {
        updateUser(r.data);
      })
      .catch(() => {
        setAccessToken(null);
        setRefreshToken(null);
      });
  }, []);

  useEffect(() => {
    if (!accessToken || connected) return;

    try {
      const connection = createSignalRConnection(
        process.env.EXPO_PUBLIC_USER_CONVERSATION_HUB_URL!,
        accessToken
      );

      const serverConnection = createSignalRConnection(
        process.env.EXPO_PUBLIC_SERVER_CHANNEL_HUB_URL!,
        accessToken
      );

      connection
        ?.start()
        .then(() => {
          connection.on("ReceiveContactRequest", (data) => {
            addPending({
              id: data.userId,
              username: data.username,
            });
          });
          connection.on("ReceiveAcceptPending", (data) => {
            removePending(data.id);
            addContact(data);
          });
          connection.on("ReceiveRemovePending", (data) => {
            removePending(data.targetUserId);
          });
          connection.on("ReceiveRemoveContact", (data) => {
            removeContact(data.targetUserId);
          });
          connection.on("ReceiveJoinServer", (data) => {
            console.log("holahola");
            addServer(data);
          });
          setConnection(connection);
          setConnected(true);

          serverConnection
            ?.start()
            .then(() => {
              serverConnection.on("ReceiveCreateServer", (data) => {
                connection.invoke("SendJoinServer", {
                  UserId: data.userId,
                  ServerId: data.id,
                  ServerName: data.name,
                  Icon: data.icon,
                });
              });

              serverConnection.on("ReceiveAddMember", (data) => {
                console.log(data);
                connection.invoke("SendJoinServer", {
                  UserId: data.userId,
                  ServerId: data.id,
                  ServerName: data.name,
                  Icon: data.icon,
                });
              });

              setServerConnection(serverConnection);
              setConnected(true);
            })
            .catch((error) =>
              console.log("Server hub connection failed: ", error)
            );
        })
        .catch((error) => console.log("User hub connection failed: ", error));
    } catch (e) {
      console.error(e);
    }
    /*return () => {
      connection?.stop().then(() => console.log("SignalR Disconnected."));
    };*/
  }, [accessToken]);

  return (
    <>
      {!accessToken && !refreshToken ? (
        <Redirect href="/login" />
      ) : (
        <Tabs
          screenOptions={{
            headerShown: true,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Contacts",
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? "home" : "home-outline"}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="servers"
            options={{
              title: "Servers",
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? "home" : "home-outline"}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? "home" : "home-outline"}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="contactChat"
            options={{
              tabBarButton: () => null,
              tabBarStyle: { display: "none" },
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name="channelChat"
            options={{
              tabBarButton: () => null,
              tabBarStyle: { display: "none" },
              headerShown: false,
            }}
          />
        </Tabs>
      )}
    </>
  );
}
