import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@/context/authContext";
import { useUserStore } from "@/stores/userStore";
import { useSignal } from "@/context/signalContext";
import CustomButton from "../CustomButton";
import CustomTextInput from "../CustomTextInput";
import { useTranslation } from "react-i18next";

export default function AddContact() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { user } = useUserStore();
  const { connection } = useSignal();
  const { t } = useTranslation();
  
  const onSubmit = (data) => {
    if (data.username == '') return;

    connection
      .invoke("SendContactRequest", {
        userId: user?.id,
        username: user?.username,
        targetUsername: data.username,
      })
      .then((r: boolean) => {
        if (!r) {
          alert(t("userNotExistsError"));
          console.error(t("userNotExistsError"));
        }
        reset();
      });
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
            placeholder={t("username")}
            width={200}
          />
        )}
        name="username"
        rules={{ required: "You must enter the contact's username" }}
      />
      <CustomButton title={t("sendRequest")} onPress={handleSubmit(onSubmit)} />
    </>
  );
}
