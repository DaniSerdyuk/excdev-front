<script>
import { mapActions } from 'pinia';
import { useAuth } from '@/stores/auth.js';

export default {
  name: 'LoginScreen',
  data() {
    return {
      email: null,
      password: null,
    };
  },
  inject: ['blockGlobalScreen'],
  methods: {
    ...mapActions(useAuth, ['login']),
    loginHandler() {
      this.blockGlobalScreen(true);

      this.login({ email: this.email, password: this.password })
        .then(() => this.$router.push({ name: 'home' }))
        .finally(() => this.blockGlobalScreen(false));
    },
  },
};
</script>

<template>
  <section class="select-none bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Sign in
          </h1>
          <div class="space-y-4 md:space-y-6">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                v-model="email"
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@company.com"
                required=""
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                v-model="password"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required=""
              />
            </div>
            <button
              type="submit"
              @click="loginHandler"
              class="w-full cursor-pointer text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
