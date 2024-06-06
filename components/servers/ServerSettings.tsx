import { Modal, View } from "react-native";
import AddChannel from "./AddChannel";

export default function ServerSettings({ isModalVisible, setIsModalVisible }) {
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
      </View>
    </Modal>
  );
}
