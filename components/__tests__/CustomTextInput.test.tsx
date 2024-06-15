import React from "react";
import { render } from "@testing-library/react-native";
import CustomTextInput from "../CustomTextInput";

describe("CustomTextInput", () => {
  it("renders correctly", () => {
    const { getByPlaceholderText } = render(
      <CustomTextInput placeholder="Enter text" />
    );
    expect(getByPlaceholderText("Enter text")).toBeTruthy();
  });
});
