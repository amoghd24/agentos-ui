import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserState } from '@/types/auth';

interface UserActions {
  setUser: (user: { id: string; username: string; email: string; first_name: string; last_name: string }) => void;
  clearUser: () => void;
}

const initialState: UserState = {
  id: null,
  username: null,
  email: null,
  firstName: null,
  lastName: null,
};

export const useUserStore = create<UserState & UserActions>()(
  persist(
    (set) => ({
      ...initialState,
      
      setUser: (user) => {
        set({
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
        });
      },
      
      clearUser: () => {
        set(initialState);
      },
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        id: state.id,
        username: state.username,
        email: state.email,
        firstName: state.firstName,
        lastName: state.lastName,
      }),
    }
  )
); 