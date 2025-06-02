<template>
  <div class="flex justify-center mt-6 space-x-1">
    <button
      :disabled="page === 1"
      @click="emitPageChange(page - 1)"
      class="px-3 py-1 text-sm border rounded-l disabled:opacity-50 cursor-pointer"
    >
      Prev
    </button>

    <button
      v-for="p in visiblePages"
      :key="p"
      @click="emitPageChange(p)"
      :class="[
        'px-3 py-1 text-sm border cursor-pointer',
        p === page ? 'bg-blue-600 text-white font-semibold' : 'hover:bg-gray-100',
      ]"
    >
      {{ p }}
    </button>

    <button
      :disabled="page === lastPage"
      @click="emitPageChange(page + 1)"
      class="px-3 py-1 text-sm border rounded-r disabled:opacity-50 cursor-pointer"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  name: 'PaginationComponent',
  props: {
    page: {
      type: Number,
      required: true,
    },
    lastPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    visiblePages() {
      const range = 2;
      const start = Math.max(1, this.page - range);
      const end = Math.min(this.lastPage, this.page + range);

      const pages = [];

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      return pages;
    },
  },
  methods: {
    emitPageChange(newPage) {
      if (newPage >= 1 && newPage <= this.lastPage && newPage !== this.page) {
        this.$emit('change', newPage);
      }
    },
  },
};
</script>
