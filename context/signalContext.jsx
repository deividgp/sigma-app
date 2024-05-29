import React, { createContext, useState } from "react";

const SignalContext = createContext();

export function useSignal() {
  const value = React.useContext(SignalContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSignal must be wrapped in a <SignalProvider />");
    }
  }

  return value;
}

const SignalProvider = ({ children }) => {
  const [connection, setConnection] = useState(null);
  const [serverConnection, setServerConnection] = useState(null);
  const [connected, setConnected] = useState(false);

  return (
    <SignalContext.Provider value={{ connection, setConnection, serverConnection, setServerConnection, connected, setConnected }}>
      {children}
    </SignalContext.Provider>
  );
};

export { SignalContext, SignalProvider };
