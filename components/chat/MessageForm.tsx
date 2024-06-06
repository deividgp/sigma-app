import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Controller, useForm } from "react-hook-form";
import CustomButton from "../CustomButton";
import CustomTextInput from "../CustomTextInput";
import { TextInput } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";

export default function MessageForm({ onSubmitMessage }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const { t } = useTranslation();

  const onSubmit = (data) => {
    if (data.message == '') return;
    onSubmitMessage(data);
    reset();
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        defaultValue={""}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Message"
          />
        )}
        name="message"
      />
      <CustomButton title={t("send")} onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    width: 260,
    marginLeft: "5%"
  },
  container: {
    flexDirection: "row",
    gap: 20,
    height: 40,
    borderTopColor: "black",
    borderTopWidth: 1
  }
});
