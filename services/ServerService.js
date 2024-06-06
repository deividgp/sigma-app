import axiosApiInstance from "@/helpers/axios";

export async function getServer(serverId) {
  return await axiosApiInstance.get(
    process.env.EXPO_PUBLIC_SERVER_API_URL + "Get/" + serverId
  );
}

export async function getChannelMessages(channelId, search) {
  return await axiosApiInstance.get(
    process.env.EXPO_PUBLIC_CHANNEL_API_URL +
      "GetMessages/" +
      channelId +
      "/" +
      search
  );
}

export async function getChannel(channelId) {
  return axiosApiInstance.get(
    process.env.EXPO_PUBLIC_CHANNEL_API_URL + "Get/" + channelId
  );
}
