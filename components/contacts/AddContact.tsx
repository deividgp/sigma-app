import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { Controller, useForm } from "react-hook-form";
import useSignalR from "@/hooks/useSignalR";
import { useAuth } from "@/context/authContext";
import { useUserStore } from "@/stores/userStore";
import { useSignal } from "@/context/signalContext";

export default function AddContact() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { user } = useUserStore();
  const { connection } = useSignal();

  const onSubmit = (data) => {
    connection
      .invoke("SendContactRequest", {
        userId: user?.id,
        username: user?.username,
        targetUsername: data.username,
      })
      .then((r: boolean) => {
        if (!r) {
          console.error("User does not exist");
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
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Username"
          />
        )}
        name="username"
        rules={{ required: "You must enter the contact's username" }}
      />
      <Button title="Send request" onPress={handleSubmit(onSubmit)} />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    width: 100,
  },
});
