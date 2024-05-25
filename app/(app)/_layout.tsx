import { Redirect, Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useAuth } from "@/context/authContext";
import { useUser } from "@/context/userContext";
import { Text } from "react-native";
import { getUser } from "@/services/UserService";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const {
    accessToken,
    refreshToken,
    setAccessToken,
    setRefreshToken,
    isLoadingAccess,
    isLoadingRefresh,
  } = useAuth();
  const { setUser } = useUser();

  if (isLoadingAccess || isLoadingRefresh) {
    return <Text>Loading</Text>;
  }

  useEffect(() => {
    if (!accessToken && !refreshToken) {
      //<Redirect href="/login" />;
      router.replace("/login");
    } else {
      getUser()
        .then((r) => {
          console.log(r.data);
          setUser(r.data);
        })
        .catch(() => {
          console.log("Error");
          setAccessToken(null);
          setRefreshToken(null);
        });
    }
  }, [accessToken, refreshToken]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
