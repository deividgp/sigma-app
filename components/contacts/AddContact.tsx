import React from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { Controller, useForm } from "react-hook-form";

export default function AddContact() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {};

  return (
    <>
      <Controller
        control={control}
        defaultValue={""}
        render={({ field }) => (
          <TextInput {...field} style={styles.input} placeholder="Username" />
        )}
        name="username"
        rules={{ required: "You must enter the contact's username" }}
      />
      <Button title="Send contact request" onPress={handleSubmit(onSubmit)} />
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
  },
});
