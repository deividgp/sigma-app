// useSignalR.ts
import { useState, useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";

const useSignalR = (accessToken: string | undefined | null) => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );

  useEffect(() => {
    const connect = new signalR.HubConnectionBuilder()
      .withUrl(process.env.EXPO_PUBLIC_USER_CONVERSATION_HUB_URL!, {
        accessTokenFactory: () => accessToken,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    setConnection(connect);
    
    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, [accessToken]);

  return [connection] as const;
};

export default useSignalR;
