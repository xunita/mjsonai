// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  runtimeConfig: {
    public: {
      ASSISTANT_ENDPOINT_DEV: process.env.ASSISTANT_ENDPOINT_DEV,
      ASSISTANT_ENDPOINT_PROD: process.env.ASSISTANT_ENDPOINT_PROD,
    },
  },
  devtools: { enabled: false },
  ssr: false,
  app: {
    head: {
      title: "Json Mock AI", //
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "@vueuse/motion/nuxt",
    "@vueuse/nuxt",
  ],
  css: ["~/assets/css/mjai.css"],
  ui: {
    colorMode: false,
  },
  image: {
    quality: 60,
    format: ["avif", "webp", "jpeg", "jpg", "png", "svg"],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      "2xl": 1536,
    },
  },
  i18n: {
    locales: [
      {
        code: "en",
        file: "en.json",
      },
      {
        code: "fr",
        file: "fr.json",
      },
    ],
    lazy: true,
    defaultLocale: "en",
  },
});
