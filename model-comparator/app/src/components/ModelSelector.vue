<template>
  <section class="flex flex-col gap-2 mt-8">
    <h2>Choose the LLMs you want to compare</h2>

    <div class="relative">
      <div
        @click="toggleDropdown"
        class="w-full min-h-[42px] border border-gray-300 rounded-md bg-white hover:border-gray-400 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-colors cursor-text flex flex-wrap items-center gap-2 p-2"
      >
        <div
          v-for="model in selectedModels"
          :key="model"
          class="bg-blue-100 border border-blue-200 rounded-md px-2 py-1 flex items-center gap-1 group hover:bg-blue-200 transition-colors"
        >
          <div
            class="w-4 h-4 rounded-full flex items-center justify-center text-white text-xs font-semibold"
            :class="getModelColor(model)"
          >
            {{ model.charAt(0) }}
          </div>
          <span class="text-sm text-blue-800 font-medium">{{ model }}</span>
          <button
            @click.stop="removeModel(model)"
            class="text-blue-600 hover:text-blue-800 opacity-60 hover:opacity-100 transition-opacity ml-1"
          >
            <svg
              class="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <span v-if="selectedModels.length === 0" class="text-gray-500 text-sm">
          Select models to compare...
        </span>

        <span class="ml-auto">
          <svg
            class="w-4 h-4 text-gray-400 transition-transform"
            :class="{ 'rotate-180': isOpen }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </span>
      </div>

      <div
        v-if="isOpen"
        class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
      >
        <div class="p-2">
          <div class="text-xs font-medium text-gray-500 mb-2 px-2">
            Available Models
          </div>

          <input
            v-model="searchTerm"
            type="text"
            placeholder="Search models..."
            class="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
            @click.stop
          />

          <div class="space-y-1">
            <label
              v-for="model in filteredModels"
              :key="model.name"
              class="flex items-center px-2 py-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                :value="model.name"
                v-model="selectedModels"
                @change="onModelChange"
                class="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <div class="flex items-center">
                <div
                  class="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-semibold mr-2"
                  :class="getModelColor(model.name)"
                >
                  {{ model.name.charAt(0) }}
                </div>
                <span class="text-sm text-gray-900">{{ model.name }}</span>
                <span class="text-xs text-gray-500 ml-2"
                  >({{ model.type }})</span
                >
              </div>
            </label>
          </div>

          <div
            v-if="filteredModels.length === 0"
            class="px-2 py-3 text-sm text-gray-500 text-center"
          >
            No models found matching "{{ searchTerm }}"
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Constants from "../services/constants";

export default {
  name: "ModelSelector",
  props: {
    availableModels: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isOpen: false,
      searchTerm: "",
      selectedModels: [],
      MODEL_COLORS: Constants.MODEL_COLORS,
      DEFAULT_MODEL_COLOR: Constants.DEFAULT_MODEL_COLOR,
    };
  },
  computed: {
    filteredModels() {
      if (!this.searchTerm) return this.availableModels;
      return this.availableModels.filter((model) =>
        model.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.searchTerm = "";
      }
    },

    onModelChange() {
      this.$emit("models-updated", this.selectedModels);
    },

    removeModel(model) {
      const index = this.selectedModels.indexOf(model);
      if (index > -1) {
        this.selectedModels.splice(index, 1);
        this.$emit("models-updated", this.selectedModels);
      }
    },

    getModelColor(modelName) {
      return this.MODEL_COLORS[modelName] || this.DEFAULT_MODEL_COLOR;
    },
  },

  mounted() {
    document.addEventListener("click", (e) => {
      if (!this.$el.contains(e.target)) {
        this.isOpen = false;
      }
    });
  },

  watch: {
    availableModels: {
      handler(newModels) {
        if (newModels.length > 0 && this.selectedModels.length === 0) {
          this.selectedModels = newModels
            .slice(0, 3)
            .map((model) => model.name);
          this.$emit("models-updated", this.selectedModels);
        }
      },
      immediate: true,
    },
  },
};
</script>
