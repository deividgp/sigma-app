import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useUserStore } from "@/stores/userStore";
import { useSignal } from "@/context/signalContext";

export default function AddServer() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { user } = useUserStore();
  const { serverConnection } = useSignal();

  const onSubmitCreate = (data) => {
    if (data.servername == '') return;

    serverConnection
      .invoke("SendCreateServer", {
        OwnerId: user?.id,
        OwnerUsername: user?.username,
        ServerName: data.servername,
      })
      .then((r: boolean) => {
        if (r) {
          console.log("Success");
        }
        reset();
      });
  };

  const onSubmitJoin = (data) => {
    if (data.servername == '') return;
    
    serverConnection
      .invoke("SendAddMember", {
        UserId: user?.id,
        Username: user?.username,
        ServerName: data.servername,
      })
      .then((r: boolean) => {
        if (r) {
          console.log("Success");
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
            placeholder="Server"
          />
        )}
        name="servername"
      />
      <Button title="Create" onPress={handleSubmit(onSubmitCreate)} />
      <Button title="Join" onPress={handleSubmit(onSubmitJoin)} />
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
