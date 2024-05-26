import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Redirect, Slot, Stack, router, useNavigation } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { useUserStore } from "@/stores/userStore";

export default function AppLayout() {
  const {
    accessToken,
    refreshToken,
    setAccessToken,
    setRefreshToken,
    isLoadingAccess,
    isLoadingRefresh,
  } = useAuth();
  const { fetchUser } = useUserStore();
  const navigation = useNavigation();

  useEffect(() => {
    if (!accessToken && !refreshToken) {
      navigation.navigate("login");
    } else {
      fetchUser().catch(() => {
        setAccessToken(null);
        setRefreshToken(null);
      });
    }
  }, [accessToken, refreshToken]);
  const colorScheme = useColorScheme();

  return (
    <>
      {!accessToken && !refreshToken ? (
        <Redirect href="/login" />
      ) : (
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            headerShown: false,
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
        </Tabs>
      )}
    </>
  );
}
