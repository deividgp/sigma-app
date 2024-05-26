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
    signUp(data);
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
                placeholder="Username"
              />
            )}
            name="username"
            rules={{ required: "You must enter your name or email" }}
          />
          <Controller
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <TextInput {...field} style={styles.input} placeholder="Email" />
            )}
            name="email"
            rules={{ required: "You must enter your email" }}
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
          <Button title="Sign up" onPress={handleSubmit(onSubmit)} />
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
