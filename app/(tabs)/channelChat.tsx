import { useSignal } from "@/context/signalContext";
import { useUserStore } from "@/stores/userStore";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import MessageForm from "@/components/chat/MessageForm";
import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/context/authContext";
import axiosApiInstance from "@/helpers/axios";
import MessageItem from "@/components/chat/MessageItem";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { Controller, useForm } from "react-hook-form";
import CustomTextInput from "@/components/CustomTextInput";
import { getChannel, getChannelMessages } from "@/services/ServerService";

export default function ChannelChat() {
  const { accessToken, refreshToken } = useAuth();
  const { user } = useUserStore();
  const { serverConnection } = useSignal();
  const params = useLocalSearchParams();
  const scrollViewRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [searchedMessages, setSearchedMessages] = useState([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    getChannel(params.channelId)
      .then(async (r) => {
        setMessages(r.data.messages);
        scrollViewRef.current?.scrollToEnd({ animated: false });
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  useEffect(() => {
    if (!serverConnection) return;

    serverConnection.send("JoinChannel", params.channelId);

    serverConnection.on("ReceiveChannelMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    return () => {
      serverConnection.send("LeaveChannel", params.channelId);
      serverConnection.off("ReceiveChannelMessage");
    };
  }, [serverConnection]);

  const onSubmitMesssage = (data) => {
    serverConnection.send("SendMessage", {
      channelId: params.channelId,
      sender: {
        id: user?.id,
        username: user?.username,
      },
      content: data.message,
    });
  };

  const onSubmitSearchMesssage = async (data) => {
    if (data.message === "") return;

    getChannelMessages(params.channelId, data.search)
      .then((r) => {
        setSearchedMessages(r.data);
      })
      .catch(() => {
        alert("Error finding messages");
      });
  };

  return (
    <>
      {!accessToken && !refreshToken ? (
        <Redirect href="/login" />
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.titleContainer}>
            <ThemedText type="title">{params.channelName}</ThemedText>
            <CustomButton
              onPress={() => setIsSearchModalVisible(true)}
              title="Search message"
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
                    placeholder="Message"
                    width={200}
                  />
                )}
                name="search"
                rules={{ required: "You must enter the contact's username" }}
              />
              <CustomButton
                title="Search"
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
    gap: 8,
    alignItems: "center",
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
