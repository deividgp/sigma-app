// components/CustomButton.js
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function CustomTextInput({
  onBlur,
  onChangeText,
  value,
  placeholder,
  secureTextEntry = false,
  width
}) {
  return (
    <View style={[styles.inputContainer, { width }]}>
      <TextInput
        style={styles.input}
        onBlur={onBlur}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  inputContainer: {
    backgroundColor: "#E0E0E0",
    borderRadius: 100,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  input: {
    height: 50,
    fontSize: 18,
    color: "#000",
  },
});
