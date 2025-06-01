<script>
import { computed } from 'vue';
import ScreenSpinnerComponent from "@/components/ScreenSpinnerComponent.vue";

export default {
  components: {
    ScreenSpinnerComponent,
  },
  data() {
    return {
      isRequested: false,
    }
  },
  provide() {
    return {
      isGlobalBlockScreen: computed(() => this.isRequested),
      blockGlobalScreen: this.blockGlobalScreen,
    };
  },
  methods: {
    blockGlobalScreen(flag) {
      this.isRequested = flag;
    },
  },
};

</script>

<template>
  <div class="min-w-[900px] flex relative flex-col justify-center">
    <transition name="fade">
      <screen-spinner-component :isLoading="isRequested" />
    </transition>
    <router-view />
  </div>
</template>