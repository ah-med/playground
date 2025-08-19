<template>
  <section class="flex flex-col gap-2 mt-8">
    <textarea
      v-model="questionText"
      placeholder="Ask anything... e.g. 'What goes up but never comes down ?'"
      class="block min-h-[100px] w-full border border-gray-300 rounded-md p-2"
    ></textarea>
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
    };
  },
  methods: {
    submitQuestion() {
      if (this.questionText.trim()) {
        this.$emit("question-submitted", this.questionText.trim());
        this.questionText = "";
      }
    },
  },
};
</script>
