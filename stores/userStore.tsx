import { create } from "zustand";
import { getUser } from "@/services/UserService";

type UserStore = {
  user: User | null;
  fetchUser: () => Promise<boolean>;
  addContact: (contact: ContactUser) => void;
  removeContact: () => void;
  addPending: (pending: PartialUser) => void;
  removePending: () => void;
};

type User = {
  id: string;
  email: string;
  avatar: string | null;
  pending: PartialUser[];
  contacts: ContactUser[];
  blockedUsers: PartialUser[];
  servers: PartialServer[];
  settings: Settings | null;
};

type PartialUser = {
  id: string;
  username: string;
};

type ContactUser = {
  id: string;
  username: string;
  conversationId: string;
};

type PartialServer = {
  id: string;
  name: string;
  icon: string | null;
};

type Settings = {
  id: string;
  theme: number;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  fetchUser: async () => {
    return new Promise((resolve, reject) => {
      getUser()
        .then((r) => {
          resolve(true);
          set({ user: r.data });
        })
        .catch(() => {
          reject();
        });
    });
  },
  addContact: (contact: ContactUser) => {
    set((state) => ({
      user: {
        ...state.user!,
        contacts: [...state.user!.contacts, contact],
      },
    }));
  },
  removeContact: () => {},
  addPending: (pending: PartialUser) => {
    set((state) => ({
      user: {
        ...state.user!,
        pending: [...state.user!.pending, pending],
      },
    }));
  },
  removePending: () => {},
}));
