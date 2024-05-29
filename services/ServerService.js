import axiosApiInstance from "@/helpers/axios";

export async function getServer(serverId)
{
    return await axiosApiInstance.get(process.env.EXPO_PUBLIC_SERVER_API_URL +
        "Get?serverId=" +
        serverId);
}