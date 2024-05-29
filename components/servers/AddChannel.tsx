import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useUserStore } from "@/stores/userStore";
import { useSignal } from "@/context/signalContext";

export default function AddChannel({onSubmitAddChannel}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    if (data.channel == '') return;

    onSubmitAddChannel(data);
    reset();
  };

  return (
    <>
      <Controller
        control={control}
        defaultValue={""}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Channel"
          />
        )}
        name="channel"
        rules={{ required: "You must enter the contact's username" }}
      />
      <Button title="Create" onPress={handleSubmit(onSubmit)} />
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
