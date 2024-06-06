import React, { createContext, useState } from "react";

const ServerContext = createContext();

export function useServer() {
  const value = React.useContext(ServerContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useServer must be wrapped in a <ServerProvider />");
    }
  }

  return value;
}

const ServerProvider = ({ children }) => {
  const [server, setServer] = useState(null);

  return (
    <ServerContext.Provider value={{ server, setServer }}>
      {children}
    </ServerContext.Provider>
  );
};

export { ServerContext, ServerProvider };
