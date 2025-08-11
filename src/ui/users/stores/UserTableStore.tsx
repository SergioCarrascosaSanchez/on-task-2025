import { create } from "zustand";

interface UserTableState {
  update: (data: Partial<UserTableState>) => void;
  search: string;
  page: number;
}

export const useUserTableStore = create<UserTableState>((set) => ({
  update: set,
  search: "",
  page: 1,
}));
