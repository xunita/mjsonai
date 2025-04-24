<script setup lang="ts">
import * as locales from "@nuxt/ui/locale";
const { locale } = useI18n();
</script>
<template>
  <UApp :locale="locales[locale]">
    <div class="jmai-app h-full flex flex-col justify-center items-center">
      <main class="h-full w-full">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </main>
    </div>
  </UApp>
</template>
