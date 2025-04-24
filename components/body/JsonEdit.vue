<script setup lang="ts">
import { watchDebounced } from "@vueuse/core";
import { codeToHtml } from "shiki";

const emits = defineEmits(["update:code"]);

const codeKey = ref(-1);
const props = defineProps({
  extCode: { type: String, default: "" },
  language: { type: String, default: "javascript" },
});
const codeEl = ref(null);
const message = ref(props.extCode || ``);
// const prevMessage = usePrevious(message);
const code = ref(message.value);

watchDebounced(
  message,
  (newCode) => {
    emits("update:code", newCode);
    highlight();
  },
  { debounce: 5, maxWait: 50 }
);

const highlight = async () => {
  if (codeEl.value) {
    const pos = saveCaretPosition(codeEl.value);
    const html = await codeToHtml(message.value, {
      lang: props.language,
      theme: "light-plus",
    });
    code.value = html;
    //
    setTimeout(() => {
      restoreCaretPosition(codeEl.value, pos);
    }, 10);
  }
};

const focusCodeSnippet = () => {
  if (!message.value.length) {
    message.value = ` `;
  }
  const input = document.getElementById("mjai-sender-input");
  if (input) input.focus();
};

const unfocusCodeSnippet = () => {
  message.value = message.value.trim();
  codeKey.value = -1;
};

onMounted(highlight);
</script>
<template>
  <div
    :class="{
      'pb-9': !message.length,
    }"
    class="rounded max-h-96 w-full rounded-bl-md overflow-auto border border-blue-100 p-5"
    @click="focusCodeSnippet"
  >
    <code
      id="mjai-sender-input"
      ref="codeEl"
      :key="codeKey"
      contenteditable="true"
      class="focus:outline-none z-10 text-sm w-full break-words font-semibold h-full"
      :class="[`language-${language}`]"
      @keypress.enter="message += '\n'"
      @input="message = $event.target.innerText.trim()"
      @blur="unfocusCodeSnippet"
      v-html="code"
    >
    </code>
    <p
      v-if="!message.length"
      class="absolute z-0 inline-block"
      @click="focusCodeSnippet"
    >
      <span class="text-xs font-semibold line-clamp-1 pr-12">
        {{ `// ${$t("generateThis5x")} [{"name": "John Doe"}]` }}
      </span>
    </p>
  </div>
</template>
<style scoped></style>
