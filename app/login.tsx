import React from "react";
import { router, useNavigation } from "expo-router";
import { Button, Text, View, TextInput, StyleSheet } from "react-native";
import { useAuth } from "../context/authContext";
import { Controller, useForm } from "react-hook-form";
import { Redirect, Stack } from "expo-router";

export default function Login() {
  const {
    logIn,
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

  const onSubmit = async (data) => {
    if (data.usernameEmail == "" || data.password == "") return;

    logIn(data)
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
                placeholder="Username or email"
              />
            )}
            name="usernameEmail"
            rules={{ required: "You must enter your username or email" }}
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
          <Button title="Log in" onPress={handleSubmit(onSubmit)} />
          <Button
            title="Sign up"
            onPress={() => navigation.navigate("signup")}
          />
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
