<script>
import { mapActions, mapState } from 'pinia';
import { useAuth } from '@/stores/auth.js';

export default {
  name: 'NavBarComponent',
  inject: ['blockGlobalScreen'],
  computed: {
    ...mapState(useAuth, ['isAuth']),
  },
  methods: {
    ...mapActions(useAuth, ['logout']),
    logoutCallback() {
      this.blockGlobalScreen(true);

      this.logout()
        .then(() => this.$router.push({ name: 'login' }))
        .finally(() => setTimeout(() => this.blockGlobalScreen(false), 500));
    },
  },
};
</script>

<template>
  <nav v-if="isAuth" class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="flex items-stretch justify-start">
          <router-link
            :to="{ name: 'home' }"
            class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Dashboard
          </router-link>
          <router-link
            :to="{ name: 'transactions' }"
            class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Transactions
          </router-link>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <div class="relative ml-3">
            <a
              href="#"
              @click="logoutCallback"
              class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
