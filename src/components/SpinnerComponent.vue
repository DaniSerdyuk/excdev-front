<script>
export default {
  name: 'SpinnerComponent',
  props: {
    isLoaded: {
      required: true,
      type: Boolean,
    },
    classes: {
      default: 'h-8 w-8',
      type: String,
    },
  },
};
</script>

<template>
  <div
    v-if="!isLoaded"
    class="inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
    role="status"
    :class="classes"
  >
    <span
      class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
    >
    </span>
  </div>
</template>
