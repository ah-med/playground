<template>
  <div class="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
    <div class="flex items-start gap-3">
      <div
        class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold"
      >
        Q
      </div>
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-2">
          <span class="font-semibold text-gray-900">Your Question</span>
          <span class="text-sm text-gray-500">• {{ timestamp }}</span>
        </div>
        <p class="text-gray-800">
          {{ question || "Ask a question to get started..." }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionDisplay",
  props: {
    question: {
      type: String,
      default: "",
    },
  },
  computed: {
    timestamp() {
      return this.question ? "Just now" : "";
    },
  },
};
</script>
