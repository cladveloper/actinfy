export default defineNuxtConfig({
  compatibilityDate: '2025-01-05',
  ssr: false, // SPA Mode para Firebase Hosting
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/fonts', '@nuxt/icon'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Actinfy | Análisis de Dramaturgia',
      link: [
        {rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png'},
        {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png'},
        {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png'},
        {rel: 'manifest', href: '/site.webmanifest'}
      ]
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