<template>
  <div class="text-gray-800 mb-3 max-w-none">
    <div v-html="formattedResponse"></div>
  </div>
</template>

<script>
import { marked } from "marked";

export default {
  name: "ModelResponseContent",
  props: {
    response: {
      type: String,
      required: true,
    },
  },
  computed: {
    formattedResponse() {
      return this.formatLLMResponse(this.response);
    },
  },
  methods: {
    formatLLMResponse(text) {
      if (!text) return "";

      // Configure marked options
      marked.setOptions({
        breaks: true, // Convert line breaks to <br>
        gfm: true, // GitHub Flavored Markdown
      });

      // Convert markdown to HTML
      let html = marked(text);

      // Add custom styling classes to the generated HTML
      html = html
        // Add classes to paragraphs
        .replace(/<p>/g, '<p class="mb-3 leading-relaxed">')
        // Add classes to headers
        .replace(
          /<h1>/g,
          '<h1 class="text-2xl font-bold text-gray-900 mb-3 mt-6 border-b-2 border-gray-300 pb-2">'
        )
        .replace(
          /<h2>/g,
          '<h2 class="text-xl font-semibold text-gray-900 mb-2 mt-5 border-b border-gray-300 pb-1">'
        )
        .replace(
          /<h3>/g,
          '<h3 class="text-lg font-semibold text-gray-800 mb-2 mt-4">'
        )
        .replace(
          /<h4>/g,
          '<h4 class="text-base font-semibold text-gray-700 mb-2 mt-3">'
        )
        .replace(
          /<h5>/g,
          '<h5 class="text-sm font-semibold text-gray-600 mb-1 mt-2">'
        )
        .replace(
          /<h6>/g,
          '<h6 class="text-xs font-semibold text-gray-600 mb-1 mt-2">'
        )
        // Add classes to lists
        .replace(/<ul>/g, '<ul class="my-2 pl-6">')
        .replace(/<ol>/g, '<ol class="my-2 pl-6">')
        .replace(/<li>/g, '<li class="mb-1">')
        // Add classes to code blocks
        .replace(
          /<pre>/g,
          '<pre class="bg-gray-100 p-3 rounded-md overflow-x-auto text-sm font-mono my-3">'
        )
        .replace(
          /<code>/g,
          '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">'
        )
        // Add classes to blockquotes
        .replace(
          /<blockquote>/g,
          '<blockquote class="border-l-4 border-gray-300 pl-4 my-3 italic text-gray-700">'
        )
        // Add classes to horizontal rules
        .replace(/<hr>/g, '<hr class="my-6 border-gray-300">')
        // Add classes to links
        .replace(
          /<a /g,
          '<a class="text-blue-600 hover:text-blue-800 underline" target="_blank" '
        )
        // Add classes to strong and em
        .replace(/<strong>/g, '<strong class="font-semibold">')
        .replace(/<em>/g, '<em class="italic">')
        // Wrap tables for responsive behavior
        .replace(/<table>/g, '<div class="table-wrapper"><table>')
        .replace(/<\/table>/g, "</table></div>");

      return html;
    },
  },
};
</script>

<style scoped>
:deep(p) {
  margin-bottom: 1rem;
  line-height: 1.6;
}

:deep(h1) {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.5rem;
}

:deep(h2) {
  margin-top: 1.75rem;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.25rem;
}

:deep(h3) {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

:deep(h4) {
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
}

:deep(h5) {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #4b5563;
}

:deep(h6) {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
}

:deep(hr) {
  border: none;
  height: 1px;
  background-color: #d1d5db;
  margin: 2rem 0;
}

:deep(ul) {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

:deep(ol) {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

:deep(li) {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

:deep(code) {
  background-color: #f3f4f6;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas,
    "Liberation Mono", Menlo, monospace;
  font-size: 0.875rem;
}

:deep(pre) {
  background-color: #f3f4f6;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1rem 0;
}

:deep(pre code) {
  background: none;
  padding: 0;
}

:deep(a) {
  color: #2563eb;
  text-decoration: underline;
}

:deep(a:hover) {
  color: #1d4ed8;
}

:deep(strong) {
  font-weight: 600;
}

:deep(em) {
  font-style: italic;
}

:deep(blockquote) {
  border-left: 4px solid #d1d5db;
  padding-left: 1rem;
  margin: 1rem 0;
  font-style: italic;
  color: #374151;
}

/* Table styles */
:deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin: 1rem 0;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  overflow: hidden;
}

:deep(th) {
  background-color: #f9fafb;
  font-weight: 600;
  text-align: left;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #d1d5db;
  color: #111827;
}

:deep(td) {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  color: #374151;
}

:deep(tr:nth-child(even)) {
  background-color: #f9fafb;
}

:deep(tr:hover) {
  background-color: #f3f4f6;
}

:deep(tr:last-child td) {
  border-bottom: none;
}

/* Responsive table wrapper */
:deep(.table-wrapper) {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin: 1rem 0;
}
</style>
