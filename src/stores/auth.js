import { defineStore } from 'pinia';
import {
  login,
  logout,
  setTokenToLocalStorage,
  removeTokenFromLocalStorage,
  getTokenFromLocalStorage,
} from '@/services/auth';

export const useAuth = defineStore('auth', {
  state: () => ({
    isAuth: false,
  }),
  actions: {
    checkAuthToken() {
      this.isAuth = !!getTokenFromLocalStorage();
    },
    login(params) {
      return login(params).then((response) => {
        setTokenToLocalStorage(response.token);
        this.isAuth = !!getTokenFromLocalStorage();

        return response;
      });
    },
    logout() {
      return logout()
        .catch((e) => e)
        .finally(() => {
          removeTokenFromLocalStorage();

          this.isAuth = !!getTokenFromLocalStorage();
        });
    },
  },
});
