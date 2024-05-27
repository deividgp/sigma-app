import React from "react";
import { router } from "expo-router";
import { Button, Text, View, TextInput, StyleSheet } from "react-native";
import { useAuth } from "../context/authContext";
import { useNavigation, Redirect } from "expo-router";
import { Controller, useForm } from "react-hook-form";

export default function Signup() {
  const {
    signUp,
    accessToken,
    refreshToken,
    isLoadingAccess,
    isLoadingRefresh,
  } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigation = useNavigation();

  if (isLoadingAccess || isLoadingRefresh) {
    return <Text>Loading</Text>;
  }

  const onSubmit = (data) => {
    signUp(data)
      .then(() => {
        navigation.navigate("(tabs)");
      })
      .catch(() => {
        console.log("Invalid credentials");
      });
  };

  return (
    <>
      {accessToken && refreshToken ? (
        <Redirect href="/" />
      ) : (
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
                placeholder="Username"
              />
            )}
            name="username"
            rules={{ required: "You must enter your username" }}
          />
          <Controller
            control={control}
            defaultValue={""}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Email"
              />
            )}
            name="email"
            rules={{ required: "You must enter your email" }}
          />
          <Controller
            control={control}
            defaultValue={""}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Password"
              />
            )}
            name="password"
            rules={{ required: "You must enter your password" }}
          />
          <Button title="Sign up" onPress={handleSubmit(onSubmit)} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
