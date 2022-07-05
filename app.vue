<script setup>
// default head elements
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
    <!-- TODO this probably should be inside a layout -->
    <MoleculesHeader />
    <NuxtPage />
    <MoleculesFooter />
  </div>
</template>

<style>
pre {
  background: #eee;
  padding: 0.75rem;
  border-radius: 0.25rem;
}
</style>
