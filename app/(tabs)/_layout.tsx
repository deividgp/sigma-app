import { Drawer } from "expo-router/drawer";
import React, { useState } from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Redirect, Slot, Stack, router, useNavigation } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { useUserStore } from "@/stores/userStore";
import createSignalRConnection from "@/helpers/createSignalRConnection";
import { useSignal } from "@/context/signalContext";
import { getUser, updatePushToken } from "@/services/UserService";
import CustomDrawerContent from "@/components/CustomDrawerContent";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { usePushNotifications } from "@/hooks/usePushNotifications";

export default function AppLayout() {
  const { accessToken, refreshToken, setAccessToken, setRefreshToken } =
    useAuth();
  const {
    updateUser,
    addContact,
    removeContact,
    addPending,
    removePending,
    addServer,
    removeServer,
  } = useUserStore();
  const { t } = useTranslation();
  const { setConnection, setServerConnection, connected, setConnected } =
    useSignal();
  usePushNotifications();

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
  }, [accessToken]);

  return (
    <>
      {!accessToken && !refreshToken ? (
        <Redirect href="/login" />
      ) : (
        <Drawer
          drawerContent={CustomDrawerContent}
          screenOptions={{
            drawerType: "front",
            drawerStyle: {
              width: 250,
            },
          }}
        >
          <Drawer.Screen
            name="index"
            options={{
              title: t("contacts"),
              drawerLabel: t("contacts"),
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name="people-outline"
                  size={size}
                  color={focused ? "#7cc" : "#ccc"}
                />
              ),
            }}
          ></Drawer.Screen>
          <Drawer.Screen
            name="settings"
            options={{
              title: "Settings",
              drawerLabel: "Settings",
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name="person-outline"
                  size={size}
                  color={focused ? "#7cc" : "#ccc"}
                />
              ),
            }}
          ></Drawer.Screen>
          <Drawer.Screen
            name="channelChat"
            options={{
              headerShown: false,
              drawerItemStyle: { display: "none" },
            }}
          ></Drawer.Screen>
          <Drawer.Screen
            name="servers"
            options={{
              headerShown: false,
              drawerItemStyle: { display: "none" },
            }}
          ></Drawer.Screen>
          <Drawer.Screen
            name="contactChat"
            options={{
              headerShown: false,
              drawerItemStyle: { display: "none" },
            }}
          ></Drawer.Screen>
        </Drawer>
      )}
    </>
  );
}
