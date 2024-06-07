import axiosApiInstance from "@/helpers/axios";

export async function getUser() {
  return await axiosApiInstance.get(
    process.env.EXPO_PUBLIC_USER_API_URL + "Get"
  );
}

export async function getConversationMessages(conversationId, search) {
  return await axiosApiInstance.get(
    process.env.EXPO_PUBLIC_CONVERSATION_API_URL +
      "GetMessages/" +
      conversationId +
      "/" +
      search
  );
}

export async function updatePushToken(pushToken) {
  return await axiosApiInstance.patch(
    process.env.EXPO_PUBLIC_USER_API_URL + "UpdatePushToken",
    {
      PushToken: pushToken,
    }
  );
}
