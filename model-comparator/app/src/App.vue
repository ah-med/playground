<script setup>
import { ref, onMounted, computed } from "vue";
import HeaderSection from "./components/HeaderSection.vue";
import ModelSelector from "./components/ModelSelector.vue";
import QuestionInput from "./components/QuestionInput.vue";
import QuestionDisplay from "./components/QuestionDisplay.vue";
import ResponsesThread from "./components/ResponsesThread.vue";
import ResponsesSection from "./components/ResponsesSection.vue";
import ModelResponse from "./components/ModelResponse.vue";
import ShimmerLoader from "./components/ShimmerLoader.vue";
import apiService from "./services/api.js";

// State
const selectedModels = ref([]);
const currentQuestion = ref("");
const responses = ref([]);
const availableModels = ref([]);
const loading = ref(false);
const error = ref(null);
const apiStatus = ref("checking"); // 'checking', 'available', 'unavailable'
const healthUrl = `${apiService.baseURL}/health`;

const modelLoadingStates = ref({});
const shimmerResponses = ref([]);

const hasSelectedModels = computed(() => selectedModels.value.length > 0);

const handleModelsUpdated = (models) => {
  selectedModels.value = models;
};

const handleQuestionSubmitted = async (question) => {
  if (!hasSelectedModels.value) {
    error.value = "Please select at least one model to compare.";
    return;
  }

  if (!question.trim()) {
    error.value = "Please enter a question.";
    return;
  }

  try {
    loading.value = true;
    error.value = null;
    currentQuestion.value = question;

    responses.value = [];

    shimmerResponses.value = selectedModels.value.map((modelName) => ({
      id: `shimmer-${modelName}-${Date.now()}`,
      modelName: modelName,
      type: "shimmer",
    }));

    selectedModels.value.forEach((modelName) => {
      modelLoadingStates.value[modelName] = true;
    });

    const result = await apiService.compareModels(
      question,
      selectedModels.value
    );

    const transformedResponses = result.responses.map((response) => ({
      id: Date.now() + Math.random(),
      modelName: response.model_name,
      response: response.response,
      responseTime: response.response_time,
      metadata: response.metadata || {},
      timestamp: response.timestamp,
    }));

    responses.value = transformedResponses;
    shimmerResponses.value = [];

    selectedModels.value.forEach((modelName) => {
      modelLoadingStates.value[modelName] = false;
    });

    console.log("Comparison completed:", result);
  } catch (err) {
    error.value = err.message || "Failed to compare models. Please try again.";
    console.error("Error comparing models:", err);

    shimmerResponses.value = [];

    selectedModels.value.forEach((modelName) => {
      modelLoadingStates.value[modelName] = false;
    });
  } finally {
    loading.value = false;
  }
};

const clearError = () => {
  error.value = null;
};

const clearResponses = () => {
  responses.value = [];
  shimmerResponses.value = [];
  currentQuestion.value = "";

  Object.keys(modelLoadingStates.value).forEach((key) => {
    modelLoadingStates.value[key] = false;
  });
};

const loadAvailableModels = async () => {
  try {
    const models = await apiService.getModels();
    availableModels.value = models;

    if (models.length > 0) {
      selectedModels.value = models.slice(0, 3).map((model) => model.name);
    }
  } catch (err) {
    console.error("Error loading models:", err);
    error.value = "Failed to load available models.";
  }
};

const checkAPIHealth = async () => {
  try {
    const isAvailable = await apiService.isAvailable();
    apiStatus.value = isAvailable ? "available" : "unavailable";

    if (isAvailable) {
      await loadAvailableModels();
    }
  } catch (err) {
    apiStatus.value = "unavailable";
    error.value =
      "API is not available. Please check if the backend server is running.";
  }
};

onMounted(() => {
  checkAPIHealth();
});
</script>

<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <div class="hidden lg:flex h-screen">
      <section class="w-1/3 bg-white border-r border-gray-200 flex flex-col">
        <div class="p-6 border-b border-gray-200">
          <HeaderSection />
        </div>

        <div class="flex-1 p-6 space-y-6 overflow-y-auto">
          <div v-if="apiStatus === 'checking'" class="text-sm text-gray-500">
            Checking API connection...
          </div>

          <div
            v-else-if="apiStatus === 'unavailable'"
            class="text-sm text-red-500 bg-red-50 p-3 rounded-md"
          >
            API is not available. Please check if the backend server is running
            at
            <a :href="healthUrl" target="_blank" rel="noopener noreferrer">{{
              healthUrl
            }}</a
            >.
          </div>

          <ModelSelector
            v-if="apiStatus === 'available'"
            :available-models="availableModels"
            @models-updated="handleModelsUpdated"
          />

          <QuestionInput
            v-if="apiStatus === 'available'"
            @question-submitted="handleQuestionSubmitted"
          />
        </div>
      </section>

      <main class="flex-1 bg-gray-50 overflow-y-auto">
        <div class="max-w-4xl mx-auto p-6">
          <ResponsesSection>
            <QuestionDisplay :question="currentQuestion" />
            <ResponsesThread v-if="currentQuestion || responses.length > 0">
              <ShimmerLoader
                v-for="shimmer in shimmerResponses"
                :key="shimmer.id"
                :model-name="shimmer.modelName"
              />

              <ModelResponse
                v-for="response in responses"
                :key="response.id"
                :response="response"
              />
            </ResponsesThread>
          </ResponsesSection>

          <div v-if="responses.length > 0" class="mt-6 text-center">
            <button
              @click="clearResponses"
              class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
            >
              Clear Responses
            </button>
          </div>
        </div>
      </main>
    </div>

    <div class="lg:hidden">
      <header class="bg-white border-b border-gray-200 p-4">
        <HeaderSection />
      </header>

      <main class="p-4 space-y-6">
        <div
          v-if="apiStatus === 'checking'"
          class="text-sm text-gray-500 text-center py-4"
        >
          Checking API connection...
        </div>

        <div
          v-else-if="apiStatus === 'unavailable'"
          class="text-sm text-red-500 bg-red-50 p-3 rounded-md"
        >
          API is not available. Please check if the backend server is running at
          <a :href="healthUrl" target="_blank" rel="noopener noreferrer">{{
            healthUrl
          }}</a
          >.
        </div>

        <div v-if="apiStatus === 'available'" class="space-y-6">
          <ModelSelector
            :available-models="availableModels"
            @models-updated="handleModelsUpdated"
          />

          <QuestionInput @question-submitted="handleQuestionSubmitted" />
        </div>

        <div
          v-if="error"
          class="bg-red-50 border border-red-200 rounded-md p-4"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <svg
                class="w-5 h-5 text-red-400 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span class="text-red-800">{{ error }}</span>
            </div>
            <button @click="clearError" class="text-red-400 hover:text-red-600">
              <svg
                class="w-5 h-5"
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
        </div>

        <div
          v-if="loading && shimmerResponses.length === 0"
          class="text-center py-8"
        >
          <div
            class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-gray-600"
          >
            <svg
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Preparing models...
          </div>
        </div>

        <ResponsesSection v-if="currentQuestion || responses.length > 0">
          <QuestionDisplay :question="currentQuestion" />
          <ResponsesThread>
            <ShimmerLoader
              v-for="shimmer in shimmerResponses"
              :key="shimmer.id"
              :model-name="shimmer.modelName"
            />

            <ModelResponse
              v-for="response in responses"
              :key="response.id"
              :response="response"
            />
          </ResponsesThread>
        </ResponsesSection>

        <div v-if="responses.length > 0" class="text-center">
          <button
            @click="clearResponses"
            class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
          >
            Clear Responses
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped></style>
