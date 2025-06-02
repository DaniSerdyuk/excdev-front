<script>
import { computed } from 'vue';
import { useAuth } from '@/stores/auth.js';
import ScreenSpinnerComponent from '@/components/ScreenSpinnerComponent.vue';
import NavBarComponent from '@/components/NavBarComponent.vue';
import { mapActions } from 'pinia';
import { useDashboard } from '@/stores/dashboard.js';

export default {
  components: {
    ScreenSpinnerComponent,
    NavBarComponent,
  },
  data() {
    return {
      isRequested: false,
    };
  },
  provide() {
    return {
      isGlobalBlockScreen: computed(() => this.isRequested),
      blockGlobalScreen: this.blockGlobalScreen,
    };
  },
  methods: {
    ...mapActions(useAuth, ['checkAuthToken']),
    ...mapActions(useDashboard, ['getUserWithBalance']),
    blockGlobalScreen(flag) {
      this.isRequested = flag;
    },
  },
  created() {
    this.checkAuthToken();
  },
};
</script>

<template>
  <div class="min-w-[900px] flex relative flex-col justify-center">
    <nav-bar-component />
    <transition name="fade">
      <screen-spinner-component :isLoading="isRequested" />
    </transition>
    <router-view />
  </div>
</template>
