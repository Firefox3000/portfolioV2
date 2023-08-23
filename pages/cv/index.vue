<script setup>
const article = await queryContent('/cv/').findOne();

useHead({
  title: article.title,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'CV',
    },
    {
      hid: 'ogtitle',
      property: 'og:title',
      content: article.title,
    },
    {
      hid: 'ogdescription ',
      property: 'og:description ',
      content: article.title,
    },
    {
      hid: 'ogurl',
      property: 'og:url',
      content: `http://schelpkikker.nl/cv`,
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: `http://schelpkikker.nl/logo.png`,
    },
    {
      hid: 'keywords',
      property: 'keywords',
      content: article.keywords ? article.keywords : '',
    },
    {
      hid: 'robots',
      name: 'robots',
      content: 'index, follow',
    },
    {
      hid: 'googlebot',
      name: 'googlebot',
      content: 'index, follow',
    },
  ],
});
</script>

<template>
  <main class="projectDesc grid">
    <article class="width-4/9 article">
      <ContentRenderer :value="article" />
    </article>
  </main>
</template>

<style lang="postcss" scoped>
article {
  margin-top: 6ch;
}

p {
  font-size: 1rem;
}

a {
  text-decoration: underline;
}

li {
  font-size: 1rem;
  margin-bottom: 2ch;
}
</style>
