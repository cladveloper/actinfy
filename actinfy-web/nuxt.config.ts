export default defineNuxtConfig({
  compatibilityDate: '2025-01-05',
  ssr: false, // SPA Mode para Firebase Hosting
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/fonts', '@nuxt/icon'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Actinfy | Análisis de Dramaturgia',
    },
  },
  runtimeConfig: {
    public: {
      apiBase: ''
    }
  },

  fonts: {
    defaults: {
      weights: ['400', '700', '900'],
    }
  }
})