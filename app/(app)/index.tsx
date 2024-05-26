import {
  Image,
  StyleSheet,
  Platform,
  View,
  Button,
  TextInput,
  Text,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ContactsList } from "@/components/contacts/ContactsList";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import PendingList from "@/components/contacts/PendingList";
import AddContact from "@/components/contacts/AddContact";
import { useAuth } from "@/context/authContext";
import { useUserStore } from "@/stores/userStore";

export default function HomeScreen() {
  const [isPending, setIsPending] = useState(false);

  const {
    accessToken,
    refreshToken,
    setAccessToken,
    setRefreshToken,
    isLoadingAccess,
    isLoadingRefresh,
  } = useAuth();

  const onPress = () => {
    setIsPending(!isPending);
  };

  if (isLoadingAccess || isLoadingRefresh) {
    return <Text>Loading</Text>;
  }

  return (
    <>
      {isLoadingAccess || isLoadingRefresh ? (
        <Text>Loading</Text>
      ) : (
        <>
          <View style={styles.titleContainer}>
            <ThemedText type="title">Contacts</ThemedText>
            <Button
              onPress={onPress}
              title={isPending ? "Contacts list" : "Pending list"}
            />
            <AddContact />
          </View>
          <ScrollView style={styles.stepContainer}>
            {isPending ? (
              <PendingList></PendingList>
            ) : (
              <ContactsList></ContactsList>
            )}
          </ScrollView>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
