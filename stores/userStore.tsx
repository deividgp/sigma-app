import { create } from "zustand";
import { getUser } from "@/services/UserService";

type UserStore = {
  user: User | null;
  updateUser: (data) => void;
  addContact: (contact: ContactUser) => void;
  removeContact: (id: string) => void;
  addPending: (pending: PartialUser) => void;
  removePending: (id: string) => void;
};

type User = {
  id: string;
  username: string;
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
  user: {
    id: "",
    username: "",
    email: "",
    avatar: null,
    pending: [],
    contacts: [],
    blockedUsers: [],
    servers: [],
    settings: null,
  },
  updateUser: (data) => {
    set({ user: data });
  },
  addContact: (contact: ContactUser) => {
    set((state) => ({
      user: {
        ...state.user!,
        contacts: [...state.user!.contacts, contact],
      },
    }));
  },
  removeContact: (id: string) => {
    set((state) => ({
      user: {
        ...state.user!,
        contacts: state.user!.contacts.filter((c) => c.id !== id),
      },
    }));
  },
  addPending: (pending: PartialUser) => {
    set((state) => ({
      user: {
        ...state.user!,
        pending: [...state.user!.pending, pending],
      },
    }));
  },
  removePending: (id: string) => {
    set((state) => ({
      user: {
        ...state.user!,
        pending: state.user!.pending.filter((c) => c.id !== id),
      },
    }));
  },
}));
