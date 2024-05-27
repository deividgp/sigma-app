import React from "react";
import { AuthProvider, useAuth } from "@/context/authContext";
import { SignalProvider, useSignal } from "@/context/signalContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Providers({ children }) {
  return (
    <GestureHandlerRootView>
      <AuthProvider>
        <SignalProvider>{children}</SignalProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
