<script setup>
// TODO add url filters
const route = useRoute();
const art = await queryContent('projects')
  .where({ slug: route.params.slug, status: { $eq: 'public' } })
  .find();

if (!art[0]) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
}

const article = art[0]; // FIX get 0th index because nuxt content findOne() is broken

useHead({
  title: article.title,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: article.description,
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
      content: `http://schelpkikker.nl/projects/${article.slug}`,
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: `http://schelpkikker.nl${article.img}`,
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
    <!-- back button -->
    <a class="width-4/9 back lineHover" href="/projects">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enable-background="new 0 0 24 24"
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <rect fill="none" height="24" width="24" />
        <path d="M5,9l1.41,1.41L11,5.83V22H13V5.83l4.59,4.59L19,9l-7-7L5,9z" />
      </svg>
      Back</a
    >
    <article class="width-4/9 article">
      <ContentRenderer :value="article" />
    </article>
  </main>
</template>

<style lang="postcss" scoped>
.back {
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-top: 3rem;
  margin-right: auto;

  svg {
    fill: var(--text);
    transform: rotate(270deg);
    z-index: -1;

    margin-right: 1rem;
  }
}
</style>
