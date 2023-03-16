<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
const route = useRoute();
// TODO set dynamic titles
const { t } = useI18n();
const title = t('metas.title');
const keywords = t('metas.keywords');
const description = t('metas.description');

console.log(title);
// This will be reactive even you change title/description above
useHead({
  title,
  meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'keywords', name: 'keywords', content: keywords }
    ],
    bodyAttrs: {
        class: 'tm-bg-dark'
      }
})
</script>
