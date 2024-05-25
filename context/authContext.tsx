import React from "react";
import { useStorageState } from "../hooks/useStorageState";
import axios from "axios";

const AuthContext = React.createContext<{
  logIn: (data: LoginCredentials) => void;
  signUp: (data: SignupCredentials) => void;
  logOut: () => void;
  accessToken?: string | null;
  refreshToken?: string | null;
  setAccessToken: (value: string | null) => void;
  setRefreshToken: (value: string | null) => void;
  isLoadingAccess: boolean;
  isLoadingRefresh: boolean;
}>({
  logIn: () => null,
  signUp: () => null,
  logOut: () => null,
  accessToken: null,
  refreshToken: null,
  setAccessToken: () => null,
  setRefreshToken: () => null,
  isLoadingAccess: false,
  isLoadingRefresh: false,
});

type LoginCredentials = {
  UsernameEmail: string;
  Password: string;
};

type SignupCredentials = {
  Username: string;
  Email: string;
  Password: string;
};

// This hook can be used to access the user info.
export function useAuth() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useAuth must be wrapped in a <AuthProvider />");
    }
  }

  return value;
}

export function AuthProvider(props: React.PropsWithChildren) {
  const [[isLoadingAccess, accessToken], setAccessToken] =
    useStorageState("AccessToken");
  const [[isLoadingRefresh, refreshToken], setRefreshToken] =
    useStorageState("RefreshToken");

  const postCredentials = async (
    data: LoginCredentials | SignupCredentials,
    type: string
  ) => {
    try {
      const response = await axios.post(
        process.env.EXPO_PUBLIC_SECURITY_URL + type,
        data
      );

      setAccessToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        logIn: async (data) => {
          await postCredentials(data, "LogIn");
        },
        signUp: async (data) => {
          await postCredentials(data, "SignUp");
        },
        logOut: () => {
          setAccessToken(null);
          setRefreshToken(null);
        },
        accessToken,
        refreshToken,
        setAccessToken,
        setRefreshToken,
        isLoadingAccess,
        isLoadingRefresh,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
