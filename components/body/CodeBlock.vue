<script setup lang="ts">
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; // You can change the theme
const toast = useToast();
const props = defineProps({
  code: { type: String, default: "" },
  language: { type: String, default: "javascript" },
});
const codeEl = ref(null);
const highlight = () => {
  if (codeEl.value) {
    hljs.highlightElement(codeEl.value);
  }
};
const copy = () => {
  navigator.clipboard.writeText(codeEl.value.innerText).then(() => {
    // Optionally, you can show a success message or toast here
    toast.clear();
    toast.add({
      title: "Code copied!",
      description: "The code has been copied to your clipboard.",
      color: "success",
    });
  });
};

const download = () => {
  const json = textToJson(props.code);
  downloadJson(json);
};
onMounted(highlight);
</script>
<template>
  <div
    class="rounded flex flex-col gap-2 max-h-96 w-full rounded-bl-md overflow-hidden border border-blue-100 px-5 py-4"
  >
    <div class="self-end flex items-center gap-1">
      <UButton
        class="cursor-pointer rounded"
        size="md"
        color="neutral"
        variant="ghost"
        icon="material-symbols:content-copy-outline-rounded"
        @click="copy"
      />
      <UButton
        class="cursor-pointer rounded"
        size="md"
        color="neutral"
        variant="ghost"
        icon="solar:download-minimalistic-bold"
        @click="download"
      />
    </div>
    <code
      ref="codeEl"
      class="focus:outline-none z-10 text-sm w-full break-words font-semibold h-full overflow-auto"
      :class="[`language-${language}`]"
      >{{ code }}</code
    >
  </div>
</template>
<style scoped></style>
