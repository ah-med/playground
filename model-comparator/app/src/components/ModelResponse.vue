<template>
  <div class="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
    <div class="flex items-start gap-3">
      <div
        class="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
        :class="avatarColor"
      >
        {{ modelInitial }}
      </div>
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-2">
          <span class="font-semibold text-gray-900">{{
            response.modelName
          }}</span>
          <span class="text-sm text-gray-500"
            >• {{ formatTime(response.timestamp) }}</span
          >
          <span class="text-xs bg-gray-100 px-2 py-1 rounded-full"
            >{{ response.responseTime }}s</span
          >
        </div>
        <p class="text-gray-800 mb-3">{{ response.response }}</p>
        <div class="text-xs text-gray-500 flex flex-wrap gap-2">
          <span
            v-if="modelType"
            class="bg-blue-50 text-blue-700 px-2 py-1 rounded"
          >
            {{ modelType }}
          </span>

          <span
            v-if="provider"
            class="bg-green-50 text-green-700 px-2 py-1 rounded"
          >
            {{ provider }}
          </span>

          <span
            v-if="isMockModel"
            class="bg-purple-50 text-purple-700 px-2 py-1 rounded"
          >
            Mock Model
          </span>

          <span
            v-if="isLocalModel"
            class="bg-orange-50 text-orange-700 px-2 py-1 rounded"
          >
            Local
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModelResponse",
  props: {
    response: {
      type: Object,
      required: true,
    },
  },
  computed: {
    modelInitial() {
      return this.response.modelName.charAt(0);
    },
    avatarColor() {
      const colors = {
        MockGPT: "bg-purple-500",
        "Llama3.2": "bg-green-500",
        "Llama 3.2": "bg-green-500",
        Llama2: "bg-blue-500",
        "Llama 2": "bg-blue-500",
        "GPT-4": "bg-indigo-500",
        Claude: "bg-orange-500",
        Gemini: "bg-yellow-500",
        Mistral: "bg-red-500",
        CodeLlama: "bg-teal-500",
      };
      return colors[this.response.modelName] || "bg-gray-500";
    },
    modelType() {
      if (this.response.metadata) {
        if (this.response.metadata.model) {
          return this.response.metadata.model;
        }
        if (this.response.metadata.provider) {
          return this.response.metadata.provider;
        }
      }
      return null;
    },
    provider() {
      if (this.response.metadata && this.response.metadata.provider) {
        const providerMap = {
          ollama: "Ollama",
          openai_compatible: "OpenAI Compatible",
          anthropic: "Anthropic Claude",
        };
        return (
          providerMap[this.response.metadata.provider] ||
          this.response.metadata.provider
        );
      }
      return null;
    },
    isMockModel() {
      return (
        this.response.metadata && this.response.metadata.mock_model === true
      );
    },
    isLocalModel() {
      return this.response.metadata && this.response.metadata.local === true;
    },
  },
  methods: {
    formatTime(timestamp) {
      const date = new Date(timestamp);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);

      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;

      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours}h ago`;

      return date.toLocaleDateString();
    },
  },
};
</script>
