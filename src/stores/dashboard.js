import { defineStore } from 'pinia';
import { getUserWithBalance } from '@/services/dashboard.js';

export const useDashboard = defineStore('dashboard', {
  state: () => ({
    balance: {},
    transactions: [],
    user: {},
  }),
  actions: {
    getUserWithBalance() {
      return getUserWithBalance().then((response) => {
        this.balance = response.balance;
        this.transactions = response.transactions;
        this.user = { email: response.email, full_name: response.full_name, id: response.id };
      });
    },
  },
});
