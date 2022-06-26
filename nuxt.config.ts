import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxt/content"],
  content: {
    highlight: {
      theme: "light-plus",
    },
  },

  /* Global CSS */
  css: ["~/assets/scss/main.scss"],
});
