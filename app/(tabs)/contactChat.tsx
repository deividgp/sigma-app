import { useSignal } from "@/context/signalContext";
import { useUserStore } from "@/stores/userStore";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MessageForm from "@/components/chat/MessageForm";
import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/context/authContext";
import axiosApiInstance from "@/helpers/axios";
import MessageItem from "@/components/chat/MessageItem";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import CustomTextInput from "@/components/CustomTextInput";
import { Controller, useForm } from "react-hook-form";
import { getConversationMessages } from "@/services/UserService";
import { useTranslation } from "react-i18next";

export default function ContactChat() {
  const { accessToken, refreshToken } = useAuth();
  const { user } = useUserStore();
  const { connection } = useSignal();
  const params = useLocalSearchParams();
  const scrollViewRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [searchedMessages, setSearchedMessages] = useState([]);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { t } = useTranslation();
  
  useEffect(() => {
    axiosApiInstance
      .get(
        process.env.EXPO_PUBLIC_CONVERSATION_API_URL +
          "Get/" +
          params.conversationId
      )
      .then(async (r) => {
        setMessages(r.data.messages);
        scrollViewRef.current?.scrollToEnd({ animated: false });
      })
      .catch((e) => {
        console.error(e);
      });
  }, [params.conversationId]);

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
  }, [connection, params.conversationId]);

  const onSubmitMesssage = (data) => {
    if (data.message === "") return;

    connection.send("SendMessage", {
      conversationId: params.conversationId,
      sender: {
        id: user?.id,
        username: user?.username,
      },
      content: data.message,
    });
  };

  const onSubmitSearchMesssage = async (data) => {
    if (data.message === "") return;

    getConversationMessages(params.conversationId, data.search)
      .then((r) => {
        setSearchedMessages(r.data);
      })
      .catch(() => {
        alert(t("searchMessagesError"));
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
            <CustomButton
              onPress={() => setIsSearchModalVisible(true)}
              title={t("searchMessages")}
            />
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
                      username={message.sender.username}
                      message={message}
                      key={message.id}
                    ></MessageItem>
                  );
                })}
            </ScrollView>
            <MessageForm onSubmitMessage={onSubmitMesssage} />
          </View>
          <Modal
            visible={isSearchModalVisible}
            onRequestClose={() => setIsSearchModalVisible(false)}
            transparent={false}
            animationType="slide"
          >
            <View style={styles.messageSearchForm}>
              <Controller
                control={control}
                defaultValue={""}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder={t("message")}
                    width={200}
                  />
                )}
                name="search"
                rules={{ required: "You must enter the contact's username" }}
              />
              <CustomButton
                title={t("search")}
                onPress={handleSubmit(onSubmitSearchMesssage)}
              />
            </View>
            <ScrollView>
              {searchedMessages.length !== 0 &&
                searchedMessages.map((message) => {
                  return (
                    <MessageItem
                      username={message.sender.username}
                      message={message}
                      key={message.id}
                    ></MessageItem>
                  );
                })}
            </ScrollView>
          </Modal>
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
    justifyContent: "space-between",
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
  messageSearchForm: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
