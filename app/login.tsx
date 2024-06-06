import React from "react";
import { router, useNavigation } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { useAuth } from "../context/authContext";
import { Controller, useForm } from "react-hook-form";
import { Redirect, Stack } from "expo-router";
import CustomButton from "@/components/CustomButton";
import CustomTextInput from "@/components/CustomTextInput";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  if (isLoadingAccess || isLoadingRefresh) {
    return <Text>{t("loading")}</Text>;
  }

  const onSubmit = async (data) => {
    if (data.usernameEmail == "" || data.password == "") return;

    logIn(data)
      .then(() => {
        navigation.navigate("(tabs)");
      })
      .catch(() => {
        alert("Invalid credentials");
        console.error("Invalid credentials");
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
              <CustomTextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Username / Email"
                width={200}
              />
            )}
            name="usernameEmail"
            rules={{ required: "You must enter your username or email" }}
          />
          <Controller
            control={control}
            defaultValue={""}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Password"
                secureTextEntry={true}
                width={200}
              />
            )}
            name="password"
            rules={{ required: "You must enter your password" }}
          />
          <CustomButton title={t("login")} onPress={handleSubmit(onSubmit)} />
          <CustomButton
            title={t("signup")}
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
