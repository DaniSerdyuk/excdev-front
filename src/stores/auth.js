import { defineStore } from 'pinia';
import {
  login,
  logout,
  setTokenToLocalStorage,
  removeTokenFromLocalStorage,
} from '@/services/auth';

export const useAuth = defineStore('auth', {
  actions: {
    login(params) {
      return login(params).then((response) => setTokenToLocalStorage(response.data));
    },
    logout() {
      return logout()
        .then(() => removeTokenFromLocalStorage())
        .catch((e) => e);
    },
  },
});
