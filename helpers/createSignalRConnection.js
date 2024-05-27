// signalRService.js
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const createSignalRConnection = (hubUrl, accessToken) => {
  const connection = new HubConnectionBuilder()
    .withUrl(hubUrl, {
      accessTokenFactory: () => accessToken,
    })
    .withAutomaticReconnect()
    .configureLogging(LogLevel.Information)
    .build();

  return connection;
};

export default createSignalRConnection;
