import { defineStore } from 'pinia';
import { getTransactions } from '@/services/transaction.js';

export const useTransaction = defineStore('transaction', {
  state: () => ({
    transactions: [],
    pagination: {},
  }),
  actions: {
    getTransactions(id, params) {
      return getTransactions(id, params).then((response) => {
        this.transactions = response.data;

        this.pagination = {
          page: response.current_page,
          perPage: response.per_page,
          total: response.total,
          lastPage: response.last_page,
        };
      });
    },
  },
});
