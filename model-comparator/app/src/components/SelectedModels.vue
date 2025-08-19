<template>
  <div class="flex flex-wrap gap-2">
    <div
      v-for="model in selectedModels"
      :key="model"
      class="bg-gray-200 rounded-md p-2 flex items-center gap-2"
    >
      <span class="text-sm">{{ model }}</span>
      <button
        @click="removeModel(model)"
        class="text-sm hover:text-red-600 transition-colors"
      >
        ×
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectedModels",
  props: {
    selectedModels: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    removeModel(model) {
      this.$emit("model-removed", model);
    },
  },
};
</script>
