<script setup>
const data = await queryContent('/projects/')
  .only(['title', 'description', 'img', 'slug', 'createdAt', 'alt'])
  .find();
const articles = data.sort(
  (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
);

useHead({
  title: 'Projects',
  meta: [
    {
      hid: 'ogtitle',
      property: 'og:title',
      content: 'Projects',
    },
    {
      hid: 'description',
      name: 'description',
      content: 'See all my recent projects',
    },
    {
      hid: 'ogdescription ',
      property: 'og:description ',
      content: 'See all my recent projects',
    },

    {
      hid: 'ogurl',
      property: 'og:url',
      content: 'http://schelpkikker.nl/projects',
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: 'http://schelpkikker.nl/logo.png',
    },
    {
      hid: 'keywords',
      property: 'keywords',
      content: 'Projects',
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
  <main class="grid projects">
    <h1 class="width-3/10 heading3 titleSide">Projects</h1>

    <ul class="width-3/10 projects__grid">
      <li
        v-for="(article, index) of articles"
        :key="article.slug"
        class="projects__item aspect-1"
      >
        <AtomsPostItem :article="article" :loadlazy="index >= 6" />
      </li>
    </ul>
  </main>
</template>

<style lang="scss">
.projects {
  margin-top: 3rem;
  margin-bottom: 3rem;

  .titleSide {
    grid-column: span 2;

    @media screen and (min-width: 48rem) {
      grid-column: 1;
      writing-mode: vertical-rl;
      text-orientation: mixed;
    }

    @media screen and (min-width: 64rem) {
      grid-column: 2;
    }
  }

  &__grid {
    display: grid;
    column-gap: 1.5rem;
    row-gap: 1.5rem;
    grid-template-columns: 1fr;

    @media screen and (min-width: 48rem) {
      grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
      grid-auto-rows: min-content;
    }
  }

  &__item {
    // move this css to PostItem?
    overflow: hidden;
  }
}
</style>
