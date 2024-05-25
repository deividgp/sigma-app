import axiosApiInstance from "@/helpers/axios";

export async function getUser()
{
    return await axiosApiInstance.get(process.env.EXPO_PUBLIC_USER_URL + "Get");
}