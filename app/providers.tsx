import React, { useEffect, useState } from "react";
import { AuthProvider } from "@/context/authContext";
import { SignalProvider } from "@/context/signalContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ServerProvider } from "@/context/serverContext";
import { I18nextProvider } from "react-i18next";
import i18n from "@/services/LocalizationService";

export default function Providers({ children }) {
  return (
    <GestureHandlerRootView>
      <I18nextProvider i18n={i18n}>
        <ServerProvider>
          <AuthProvider>
            <SignalProvider>{children}</SignalProvider>
          </AuthProvider>
        </ServerProvider>
      </I18nextProvider>
    </GestureHandlerRootView>
  );
}
