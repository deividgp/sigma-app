import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useUserStore } from "@/stores/userStore";
import { useSignal } from "@/context/signalContext";
import CustomButton from "../CustomButton";
import CustomTextInput from "../CustomTextInput";
import { useTranslation } from "react-i18next";

export default function AddServer() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { user } = useUserStore();
  const { serverConnection } = useSignal();
  const { t } = useTranslation();

  const onSubmitCreate = (data) => {
    if (data.servername == "") return;

    serverConnection
      .invoke("SendCreateServer", {
        OwnerId: user?.id,
        OwnerUsername: user?.username,
        ServerName: data.servername,
        ServerPassword: data.serverpassword == "" ? null : data.serverpassword,
      })
      .then((r: boolean) => {
        if (!r) {
          alert(t("createServerError"));
          return;
        }
        
        reset();
      });
  };

  const onSubmitJoin = (data) => {
    if (data.servername == "") return;

    serverConnection
      .invoke("SendAddMember", {
        UserId: user?.id,
        Username: user?.username,
        ServerName: data.servername,
        ServerPassword: data.serverpassword == "" ? null : data.serverpassword,
      })
      .then((r: boolean) => {
        if (!r) {
          alert(t("joinServerError"));
          return;
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
            placeholder={t("server")}
            width={200}
          />
        )}
        name="servername"
      />
      <Controller
        control={control}
        defaultValue={""}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomTextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={t("optionalPassword")}
            secureTextEntry={true}
            width={200}
          />
        )}
        name="serverpassword"
      />
      <CustomButton
        title={t("create")}
        onPress={handleSubmit(onSubmitCreate)}
      />
      <CustomButton title={t("join")} onPress={handleSubmit(onSubmitJoin)} />
    </>
  );
}
