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

  const onSubmit = (data) => {
    logIn(data);
    navigation.navigate("(app)");
  };

  return (
    <>
      {accessToken && refreshToken ? (
        <Redirect href="/" />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Controller
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <TextInput
                {...field}
                style={styles.input}
                placeholder="Username or email"
              />
            )}
            name="usernameEmail"
            rules={{ required: "You must enter your username or email" }}
          />
          <Controller
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <TextInput
                {...field}
                style={styles.input}
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
    padding: 16,
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
