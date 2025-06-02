<script>
import { mapActions, mapState } from 'pinia';
import { useDashboard } from '@/stores/dashboard.js';
import { formatAmount } from '@/helpers/formats.js';
import TableComponent from '@/components/TableComponent.vue';

export default {
  name: 'DashboardScreen',
  components: { TableComponent },
  data() {
    return {
      intervalId: null,
    };
  },
  inject: ['blockGlobalScreen'],
  computed: {
    ...mapState(useDashboard, ['balance', 'user', 'transactions']),
  },
  methods: {
    formatAmount,
    ...mapActions(useDashboard, ['getUserWithBalance']),
    get() {
      this.blockGlobalScreen(true);

      // timeout just for visual
      this.getUserWithBalance().finally(() => setTimeout(() => this.blockGlobalScreen(false), 300));
    },
  },
  created() {
    this.get();

    this.intervalId = setInterval(this.get, 10000);
  },
  unmounted() {
    clearInterval(this.intervalId);
  },
};
</script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          {{ user.full_name }}
        </h2>
        <p class="mb-5 font-light text-gray-500 sm:text-xl">
          {{ user.email }}
        </p>
        <p class="mb-5 font-light text-gray-500 sm:text-xl">
          Balance: {{ formatAmount(balance.amount) }}
        </p>
      </div>
      <table-component :transactions="transactions" />
    </div>
  </section>
</template>
