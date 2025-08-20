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
            >{{ formatResponseTime(response.responseTime) }}s</span
          >
        </div>
        <ModelResponseContent :response="response.response" />
        <div class="text-xs text-gray-500 flex flex-wrap gap-2">
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
          <span
            v-if="isFrontierModel"
            class="bg-yellow-50 text-yellow-700 px-2 py-1 rounded"
          >
            Frontier
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Constants from "../services/constants";
import ModelResponseContent from "./ModelResponseContent.vue";

export default {
  name: "ModelResponse",
  components: {
    ModelResponseContent,
  },
  data() {
    return {
      MODEL_COLORS: Constants.MODEL_COLORS,
      DEFAULT_MODEL_COLOR: Constants.DEFAULT_MODEL_COLOR,
    };
  },
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
      return (
        this.MODEL_COLORS[this.response.modelName] || this.DEFAULT_MODEL_COLOR
      );
    },
    provider() {
      if (this.response.metadata && this.response.metadata.provider) {
        const providerMap = {
          ollama: "Ollama",
          openai_compatible: "OpenAI Compatible",
          anthropic: "Anthropic Claude",
          openai_official: "OpenAI Official",
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
    isFrontierModel() {
      return (
        this.response.metadata && this.response.metadata.frontier_model === true
      );
    },
  },
  methods: {
    formatResponseTime(time) {
      return Number(time).toFixed(2);
    },

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
