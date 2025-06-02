<script>
import { mapState } from 'pinia';
import { useDashboard } from '@/stores/dashboard.js';
import TableBodyComponent from '@/components/TableBodyComponent.vue';

export default {
  name: 'TableComponent',
  components: { TableBodyComponent },
  props: {
    transactions: {
      type: Array,
      required: true,
    },
  },
};
</script>

<template>
  <div class="overflow-x-auto bg-white shadow-md rounded-lg">
    <table class="min-w-full text-sm text-left text-gray-600">
      <thead class="bg-gray-50 text-xs uppercase text-gray-500">
        <tr>
          <th scope="col" class="px-6 py-4 font-medium">ID</th>
          <th scope="col" class="px-6 py-4 font-medium">Type</th>
          <th scope="col" class="px-6 py-4 font-medium">Amount</th>
          <th scope="col" class="px-6 py-4 font-medium">
            <slot name="head-date"> Date </slot>
          </th>
          <th scope="col" class="px-6 py-4 font-medium"></th>
        </tr>
      </thead>
      <table-body-component
        v-for="transaction in transactions"
        :key="transaction.id"
        :transaction="transaction"
      />
    </table>
  </div>
</template>
