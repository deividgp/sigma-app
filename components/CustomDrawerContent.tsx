import { useUserStore } from "@/stores/userStore";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useNavigation } from "expo-router";
import { Text, Image, Modal, View, StyleSheet } from "react-native";
import { TabBarIcon } from "./navigation/TabBarIcon";
import { useState } from "react";
import AddServer from "./servers/AddServer";
import { ThemedText } from "./ThemedText";
import { useTranslation } from "react-i18next";

export default function CustomDrawerContent(props: any) {
  const { user } = useUserStore();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label={t("addServer")}
        onPress={() => setIsModalVisible(true)}
        icon={({ focused, size }) => (
          <TabBarIcon
            name={"add-circle-outline"}
            size={size}
            color={focused ? "#7cc" : "#ccc"}
          />
        )}
      ></DrawerItem>
      {user != null && user.servers.length > 0 && (
        <View style={styles.container}>
          <ThemedText type="subtitle">Servers</ThemedText>
        </View>
      )}
      {user != null &&
        user.servers.map((server) => {
          return (
            <DrawerItem
              label={server.name}
              onPress={() =>
                navigation.navigate("servers", {
                  serverId: server.id,
                })
              }
              key={server.id}
            ></DrawerItem>
          );
        })}
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
          <AddServer />
        </View>
      </Modal>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
