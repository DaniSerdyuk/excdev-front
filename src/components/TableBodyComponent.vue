<script>
import { mapState } from 'pinia';
import { useDashboard } from '@/stores/dashboard.js';
import { formatAmount } from '../helpers/formats.js';

export default {
  name: 'TableBodyComponent',
  data() {
    return {
      isOpen: false,
    };
  },
  props: {
    transaction: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatAmount,
    toggleOpen() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<template>
  <tbody class="divide-y divide-gray-200">
    <tr class="hover:bg-gray-50">
      <td class="px-6 py-4">{{ transaction.id }}</td>
      <td class="px-6 py-4">{{ transaction.type }}</td>
      <td class="px-6 py-4">{{ formatAmount(transaction.amount) }}</td>
      <td class="px-6 py-4">{{ transaction.created_at }}</td>
      <td class="px-6 py-4 cursor-pointer select-none" @click="toggleOpen">
        <span class="inline-flex items-center gap-1">
          <svg
            :class="[
              'w-4 h-4 transition-transform duration-200',
              isOpen ? 'rotate-180' : 'rotate-0',
            ]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </span>
      </td>
    </tr>
    <tr v-if="isOpen">
      <td colspan="5" class="px-6 py-4">
        {{ transaction.description ? transaction.description : 'Empty description' }}
      </td>
    </tr>
  </tbody>
</template>
