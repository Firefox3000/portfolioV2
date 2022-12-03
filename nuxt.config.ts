// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxt/content'],

  content: {
    highlight: {
      theme: 'light-plus',
    },
  },

  // baseUrl: "/"

  routeRules: {
    '/': { static: true },
    '/contact': { static: true },
    '/api/tile': { cors: true },
  },

  /* global CSS */
  css: ['~/assets/scss/main.scss', '~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  /* build modules */
  // buildModules: ['@nuxtjs/pwa'],

  // pwa: {
  //   workbox: {
  //     /* workbox options */
  //   },
  // },

  // nitro: {
  //   prerender: {
  //     routes: ['/', '/projects/', '/projects/*', '/contact'],
  //   },
  // },

  /* default head */
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [{ name: 'theme-color', content: '#141414' }],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },
});
