import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useUserStore } from "@/stores/userStore";
import { useSignal } from "@/context/signalContext";
import { useServer } from "@/context/serverContext";
import CustomButton from "../CustomButton";
import CustomTextInput from "../CustomTextInput";
import { useTranslation } from "react-i18next";

export default function AddChannel() {
  const { server } = useServer();
  const { serverConnection } = useSignal();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { t } = useTranslation();
  const onSubmitAddChannel = (data) => {
    serverConnection.send("SendCreateChannel", {
      serverId: server?.id,
      channelName: data.channel,
    });
  };

  const onSubmit = (data) => {
    if (data.channel == "") return;

    onSubmitAddChannel(data);
    reset();
  };

  return (
    <>
      <Controller
        control={control}
        defaultValue={""}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomTextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={t("channel")}
            width={200}
          />
        )}
        name="channel"
        rules={{ required: "You must enter the contact's username" }}
      />
      <CustomButton title={t("create")} onPress={handleSubmit(onSubmit)} />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 8,
    width: 100,
  },
});
