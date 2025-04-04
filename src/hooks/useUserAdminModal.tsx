
import { create } from "zustand";

interface UserAdminModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useUserAdminModal = create<UserAdminModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
