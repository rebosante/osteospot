import { defineNuxtPlugin } from "#app";
import { Vue3Mq } from "vue3-mq";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Mq, {
    preset: 'bootstrap5'
  });
});