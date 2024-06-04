import { useUserStore } from "@/stores/userStore";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useNavigation } from "expo-router";
import { Text, Image, Modal, View } from "react-native";
import { TabBarIcon } from "./navigation/TabBarIcon";
import { useState } from "react";
import AddServer from "./servers/AddServer";

export default function CustomDrawerContent(props: any) {
  const { user } = useUserStore();
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {user?.servers.map((server) => {
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
      <DrawerItem
        label={() => null}
        onPress={() => setIsModalVisible(true)}
        icon={() => <TabBarIcon name={"add-circle-outline"} color={"black"} />}
      ></DrawerItem>
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
