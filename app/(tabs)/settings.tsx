import { StyleSheet, View } from "react-native";
import { useAuth } from "@/context/authContext";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "@/components/CustomButton";

export default function SettingsScreen() {
  const { logOut } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const { i18n, t } = useTranslation();

  useEffect(() => {
    setSelectedLanguage(i18n.language);
  }, []);

  const onLanguageChange = async (itemValue) => {
    i18n.changeLanguage(itemValue);
    setSelectedLanguage(itemValue);
    await AsyncStorage.setItem("languageCode", itemValue);
  };

  return (
    <>
      <View style={styles.stepContainer}>
        <CustomButton title={t("logout")} onPress={logOut} />
      </View>
      <Picker selectedValue={selectedLanguage} onValueChange={onLanguageChange}>
        <Picker.Item label="English" value="en"></Picker.Item>
        <Picker.Item label="Español" value="es"></Picker.Item>
        <Picker.Item label="Català" value="ca"></Picker.Item>
      </Picker>
    </>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    width: 200,
  },
});
