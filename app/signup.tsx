import React, { useTransition } from "react";
import { router } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { useAuth } from "../context/authContext";
import { useNavigation, Redirect } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import CustomButton from "@/components/CustomButton";
import CustomTextInput from "@/components/CustomTextInput";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  if (isLoadingAccess || isLoadingRefresh) {
    return <Text>{t("loading")}</Text>;
  }

  const onSubmit = (data) => {
    if (data.username == "" || data.email == "" || data.password == "") return;

    signUp(data)
      .then(() => {
        navigation.navigate("(tabs)");
      })
      .catch(() => {
        alert("Error");
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
                placeholder={t("username")}
                width={200}
              />
            )}
            name="username"
            rules={{ required: "You must enter your username" }}
          />
          <Controller
            control={control}
            defaultValue={""}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Email"
                width={200}
              />
            )}
            name="email"
            rules={{ required: "You must enter your email" }}
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
          <CustomButton title="Sign up" onPress={handleSubmit(onSubmit)} />
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
