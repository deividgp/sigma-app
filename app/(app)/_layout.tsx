import { Redirect, Slot, Stack, router, useNavigation } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useAuth } from "@/context/authContext";
import { Text } from "react-native";
import { getUser } from "@/services/UserService";
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
  const { fetchUser, id } = useUserStore();
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

  return (
    <>
      {!accessToken && !refreshToken ? (
        <Redirect href="/login" />
      ) : (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      )}
    </>
  );
}
