<script setup>
// default head settings
useHead({
  title: 'Portfolio | Sam de Kanter',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content:
        'Sam is a Front end Developer creating digital experiences currently studying Communication and multimedia design in Amsterdam.',
    },
    {
      hid: 'ogdescription ',
      property: 'og:description ',
      content:
        'Sam is a Front end Developer creating digital experiences currently studying Communication and multimedia design in Amsterdam.',
    },
    {
      hid: 'ogtitle',
      property: 'og:title',
      content: 'Portfolio | Sam de Kanter',
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: `http://schelpkikker.nl/logo.png`,
    },
  ],
  htmlAttrs: {
    lang: 'en',
  },
});
</script>

<template>
  <div>
    <MoleculesHeader />
    <NuxtPage />
    <MoleculesFooter />
  </div>
</template>

<style scoped></style>
