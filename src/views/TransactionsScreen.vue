<script>
import TableComponent from '@/components/TableComponent.vue';
import { mapActions, mapState } from 'pinia';
import { useTransaction } from '@/stores/transaction.js';
import { useDashboard } from '@/stores/dashboard.js';
import { formatAmount } from '../helpers/formats.js';
import PaginationComponent from '@/components/PaginationComponent.vue';
import debounce from "lodash/debounce";

export default {
  name: 'TransactionsScreen',
  components: { PaginationComponent, TableComponent },
  data() {
    return {
      sortDirection: 'asc',
      search: '',
      page: 1,
      perPage: 5,
    };
  },
  computed: {
    ...mapState(useTransaction, ['transactions', 'pagination']),
    ...mapState(useDashboard, ['user', 'balance']),
    isPagination() {
      return this.pagination.page && this.pagination.lastPage;
    }
  },
  watch: {
    search(nv) {
      if (nv.length === 0 || nv.length > 2) {
        this.page = 1;
        this.get();
      }
    }
  },
  methods: {
    formatAmount,
    ...mapActions(useTransaction, ['getTransactions']),
    ...mapActions(useDashboard, ['getUserWithBalance']),
    toggleSort() {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

      this.$route.params.sort = this.sortDirection;

      this.get();
    },
    changePage(page) {
      this.page = page;

      this.get();
    },
    get: debounce(function () {
      const params = {
        perPage: this.perPage,
        page: this.page,
        sort: this.sortDirection,
        // search: this.search,
      };

      if (this.search) {
        params.search = this.search;
      }

      this.$router.replace({
        query: {
          ...params,
        },
      });

      this.getTransactions(this.user.id, params);
    }, 100),
    init() {
      const query = this.$route.query;

      this.perPage = Number(query.perPage) || 5;
      this.page = Number(query.page) || 1;
      this.search = query.search || '';
      this.sort = query.sort || 'asc';

      if (!this.user.id) {
        this.getUserWithBalance().then(() => this.get());

        return;
      }

      this.get();
    }
  },
  created() {
    this.init();
  },
};
</script>

<template>
  <section class="bg-white">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="flex flex-row justify-between my-4">
        <div class="relative inline-block">
          <input
              type="text"
              v-model="search"
              placeholder="Search"
              class="px-4 py-2 pr-8 rounded border border-gray-300"
          />
          <button
              v-if="search"
              @click="search = ''"
              class="absolute cursor-pointer right-3 top-[40%] -translate-y-1/2 text-gray-400 hover:text-gray-600"
              type="button"
          >
            &times;
          </button>
        </div>
        <div class="flex select-none flex-col justify-between">
          <p class="text-gray-600">{{ user.full_name }}</p>
          <p class="text-gray-600">{{ formatAmount(balance.amount) }}</p>
        </div>
      </div>
      <table-component :transactions="transactions">
        <template #head-date>
          <span
            class="inline-flex items-center gap-1 cursor-pointer select-none"
            @click="toggleSort"
          >
            Date
            <svg
              class="w-3 h-3 transition-all duration-150 rotate-0"
              :class="{ 'rotate-180': sortDirection === 'asc' }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 15l7-7 7 7"
              />
            </svg>
          </span>
        </template>
      </table-component>
      <pagination-component
        v-if="isPagination"
        :page="pagination.page"
        :lastPage="pagination.lastPage"
        @change="changePage"
      />
    </div>
  </section>
</template>
