<script setup lang="ts"></script>
<template>
  <header class="jmai-app-header py-5">
    <div class="jmai-header-logo flex items-center justify-between w-full">
      <NuxtLink to="/" class="jmai-app--header-logo-link">
        <span class="font-semibold text-xl">JSON mock AI</span>
      </NuxtLink>
      <span class="text-xs italic">{{ $t("jsonSupportOnlyForNow") }}</span>
    </div>
  </header>
</template>
<style scoped></style>
