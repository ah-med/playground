<template>
  <div
    class="bg-white rounded-lg border border-gray-200 p-4 shadow-sm animate-pulse"
  >
    <div class="flex items-start gap-3">
      <div class="w-10 h-10 rounded-full bg-gray-100"></div>

      <div class="flex-1">
        <div class="flex items-center gap-2 mb-2">
          <span class="font-semibold text-gray-900">{{ modelName }}</span>
          <div class="h-3 bg-gray-100 rounded w-20"></div>
        </div>

        <div class="space-y-2">
          <div class="h-4 bg-gray-100 rounded w-full"></div>
          <div class="h-4 bg-gray-100 rounded w-3/4"></div>
        </div>

        <div class="flex flex-wrap gap-2 mt-3">
          <div class="h-5 bg-gray-100 rounded w-16"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShimmerLoader",
  props: {
    modelName: {
      type: String,
      default: "Loading...",
    },
  },
};
</script>

<style scoped>
@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.animate-pulse {
  animation: shimmer 1.5s infinite linear;
}

.animate-pulse > * {
  background: linear-gradient(90deg, #f9fafb 25%, #f3f4f6 50%, #f9fafb 75%);
  background-size: 200px 100%;
  animation: shimmer 1.5s infinite linear;
}
</style>
