import { Image, StyleSheet, Platform, Text } from "react-native";
import ServerItem from "./ServerItem";
import { useUser } from "@/context/userContext";

export default function ServersList() {
  const { user } = useUser();

  if (!user) {
    return <Text>Loading</Text>;
  }

  return (
    <>
      {user.servers.map((server) => {
        <ServerItem server={server} />;
      })}
    </>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    borderRadius: 40,
  },
});
