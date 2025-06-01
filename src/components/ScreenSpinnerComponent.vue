<script>
import SpinnerComponent from '@/components/SpinnerComponent.vue';

export default {
  name: 'ScreenSpinnerComponent',
  components: {
    SpinnerComponent,
  },
  props: {
    isLoading: {
      required: true,
      type: Boolean,
    },
  },
};
</script>

<template>
  <div
    v-if="isLoading"
    class="fixed top-0 z-[102] flex h-screen min-w-full mx-auto backdrop-blur justify-center"
  >
    <spinner-component classes="self-center h-12 w-12" :is-loaded="!isLoading" />
  </div>
</template>
