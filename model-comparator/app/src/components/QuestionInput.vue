<template>
  <section class="flex flex-col gap-2 mt-8">
    <textarea
      ref="questionTextarea"
      v-model="questionText"
      placeholder="Ask anything... e.g. 'What goes up but never comes down?'"
      class="block min-h-[100px] w-full border border-gray-300 rounded-md p-2"
    ></textarea>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="suggestion in suggestions"
        :key="suggestion"
        @click="addSuggestion(suggestion)"
        class="bg-blue-100 border border-blue-200 rounded-md px-2 py-1 flex items-center gap-1 group hover:bg-blue-200 hover:border-blue-300 active:bg-blue-300 transition-all duration-200 cursor-pointer text-sm font-medium"
      >
        {{ suggestion }}
      </button>
    </div>
    <button
      @click="submitQuestion"
      :disabled="!questionText.trim()"
      class="bg-blue-500 text-white rounded-md p-2 self-end w-fit px-8 mt-4 disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
    >
      Send
    </button>
  </section>
</template>

<script>
export default {
  name: "QuestionInput",
  data() {
    return {
      questionText: "",
      suggestions: [
        "Who is the most listened to musical artist of all time?",
        "Who is the most streamed artist in the digital era?",
        "Explain quantum computing in simple terms",
        "What are the best practices for writing clean code?",
        "How does machine learning work?",
        "What's the difference between AI and AGI?",
        "Explain the concept of blockchain technology",
      ],
    };
  },
  methods: {
    addSuggestion(suggestion) {
      if (this.questionText.trim()) {
        this.questionText += " " + suggestion;
      } else {
        this.questionText = suggestion;
      }
      this.$nextTick(() => {
        this.$refs.questionTextarea.focus();
      });
    },
    submitQuestion() {
      if (this.questionText.trim()) {
        this.$emit("question-submitted", this.questionText.trim());
        this.questionText = "";
      }
    },
  },
};
</script>
