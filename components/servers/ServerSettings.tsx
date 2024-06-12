import { Modal, View } from "react-native";
import AddChannel from "./AddChannel";
import CustomButton from "../CustomButton";
import { useSignal } from "@/context/signalContext";
import { useServer } from "@/context/serverContext";
import { useNavigation } from "expo-router";

export default function ServerSettings({ isModalVisible, setIsModalVisible }) {
  const { serverConnection } = useSignal();
  const { server } = useServer();
  const navigation = useNavigation();

  const onPressDeleteServer = () => {
    serverConnection
      .invoke("SendDeleteServer", server.id)
      .then((r: Boolean) => {
        if (r == true) {
          setIsModalVisible(false);
          navigation.navigate("index");
        } else {
          alert("Error deleting the server");
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
        }}
      >
        <AddChannel />
        <CustomButton title={"Delete server"} onPress={onPressDeleteServer} />
      </View>
    </Modal>
  );
}
