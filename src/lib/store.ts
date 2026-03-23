import { create } from "zustand";

// For the demo, we use the seeded user. In production this comes from auth.
const DEMO_USER_ID = "usr_demo001";

type UserStore = {
  userId: string;
  setUserId: (id: string) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  userId: DEMO_USER_ID,
  setUserId: (id) => set({ userId: id }),
}));
