import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  useWindowDimensions,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ContactsList } from "@/components/contacts/ContactsList";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import PendingList from "@/components/contacts/PendingList";
import AddContact from "@/components/contacts/AddContact";
import { useAuth } from "@/context/authContext";
import { useUserStore } from "@/stores/userStore";
import React from "react";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { useTranslation } from "react-i18next";

export default function HomeScreen() {
  const {
    accessToken,
    refreshToken,
    setAccessToken,
    setRefreshToken,
    isLoadingAccess,
    isLoadingRefresh,
  } = useAuth();
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "contacts", title: t("contacts") },
    { key: "pending", title: "Pending" },
  ]);

  if (isLoadingAccess || isLoadingRefresh) {
    return <Text>{t("loading")}</Text>;
  }

  const contactsRoute = () => <ContactsList />;

  const pendingRoute = () => <PendingList />;

  const renderScene = SceneMap({
    contacts: contactsRoute,
    pending: pendingRoute,
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
    <>
      {isLoadingAccess || isLoadingRefresh ? (
        <Text>{t("loading")}</Text>
      ) : (
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
      )}
    </>
  );
}
