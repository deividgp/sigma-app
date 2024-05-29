import { useSignal } from "@/context/signalContext";
import { useUserStore } from "@/stores/userStore";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MessageForm from "@/components/chat/MessageForm";
import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/context/authContext";
import axiosApiInstance from "@/helpers/axios";
import { useFocusEffect } from "@react-navigation/native";
import MessageItem from "@/components/chat/MessageItem";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ContactChat() {
  const { accessToken, refreshToken } = useAuth();
  const { user } = useUserStore();
  const { connection } = useSignal();
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const scrollViewRef = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axiosApiInstance
      .get(
        process.env.EXPO_PUBLIC_CONVERSATION_API_URL +
          "Get?conversationId=" +
          params.conversationId
      )
      .then(async (r) => {
        setMessages(r.data.messages);
        scrollViewRef.current?.scrollToEnd({ animated: false });
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  useEffect(() => {
    if (!connection) return;

    connection.send("JoinConversation", params.conversationId);

    connection.on("ReceiveConversationMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    return () => {
      connection.send("LeaveConversation", params.conversationId);
      connection.off("ReceiveConversationMessage");
    };
  }, [connection]);

  const onSubmitMesssage = (data) => {
    connection.send("SendMessage", {
      conversationId: params.conversationId,
      senderId: user?.id,
      content: data.message,
    });
  };

  return (
    <>
      {!accessToken && !refreshToken ? (
        <Redirect href="/login" />
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.titleContainer}>
            <ThemedText type="title">{params.contactUsername}</ThemedText>
          </View>
          <View style={styles.container}>
            <ScrollView
              ref={scrollViewRef}
              onContentSizeChange={() =>
                scrollViewRef.current?.scrollToEnd({ animated: false })
              }
              style={{ flex: 1 }}
            >
              {messages.length !== 0 &&
                messages.map((message) => {
                  return (
                    <MessageItem
                      username={
                        message.senderId == user?.id
                          ? user?.username
                          : params.contactUsername
                      }
                      message={message}
                      key={message.id}
                    ></MessageItem>
                  );
                })}
            </ScrollView>
            <MessageForm onSubmitMessage={onSubmitMesssage} />
          </View>
        </SafeAreaView>
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
  container: {
    flexDirection: "column",
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
});
