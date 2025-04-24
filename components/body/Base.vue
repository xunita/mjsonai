<script setup lang="ts">
import { getAssistantResponse } from "@/app/api/sender";
const toast = useToast();
const loading = ref(false);
const code = ref("");
const data = ref(null);
const handleCode = (c) => {
  // Handle the code update here
  code.value = c;
};

const generateData = () => {
  loading.value = true;
  data.value = null;
  // Simulate an API call
  getAssistantResponse(code.value)
    .then((response) => {
      loading.value = false;
      if (response.isUserDataValid) {
        data.value = response.data;
      } else {
        data.value = null;
        toast.clear();
        toast.add({
          title: "Uh oh! Something went wrong.",
          description: response.message,
          color: "error",
        });
      }
    })
    .catch((error) => {
      loading.value = false;
      toast.clear();
      toast.add({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request. Please try again.",
        color: "error",
      });
    });
};
</script>
<template>
  <div class="w-full flex flex-col items-center justify-center py-5">
    <UAlert
      :description="$t('jsonMockAssistantDescription')"
      color="neutral"
      class="text-center"
      icon="material-symbols:tips-and-updates-outline"
      variant="outline"
    />
    <div class="code-snippet w-full flex flex-col gap-4">
      <div class="flex flex-col w-full">
        <span class="block text-center w-full font-semibold p-4">{{
          $t("jsonSchema")
        }}</span>
        <BodyJsonEdit language="json" @update:code="handleCode" />
      </div>
      <UButton
        :disabled="loading"
        size="sm"
        color="neutral"
        variant="solid"
        :icon="loading ? 'line-md:loading-loop' : 'ri:ai-generate'"
        class="cursor-pointer w-fit p-2 self-center"
        @click="generateData"
        >{{ loading ? $t("generating") : $t("generateB") }}</UButton
      >
      <div v-if="data" v-motion-pop-visible>
        <BodyCodeBlock language="json" :code="data" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
