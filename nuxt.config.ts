// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: [
    '~/assets/css/main.css'
  ],
  modules: ['nuxt-icon', '@sidebase/nuxt-auth', '@nuxt/image', 'nuxt-swiper'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

})
