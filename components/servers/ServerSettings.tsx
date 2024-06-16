import { Modal, View } from "react-native";
import AddChannel from "./AddChannel";
import CustomButton from "../CustomButton";
import { useSignal } from "@/context/signalContext";
import { useServer } from "@/context/serverContext";
import { useNavigation } from "expo-router";
import { useTranslation } from "react-i18next";

export default function ServerSettings({ isModalVisible, setIsModalVisible }) {
  const { serverConnection } = useSignal();
  const { server } = useServer();
  const navigation = useNavigation();
  const { t } = useTranslation();

  const onPressDeleteServer = () => {
    serverConnection
      .invoke("SendDeleteServer", server.id)
      .then((r: Boolean) => {
        if (r == true) {
          setIsModalVisible(false);
          navigation.navigate("index");
        } else {
          alert(t("deleteServerError"));
        }
      });
  };

  return (
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
          gap: 15
        }}
      >
        <AddChannel />
        <CustomButton title={t("deleteServer")} onPress={onPressDeleteServer} />
      </View>
    </Modal>
  );
}
