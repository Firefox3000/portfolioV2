<script setup>
defineProps({
  error: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <MoleculesHeader />

  <main class="grid">
    <h1 v-if="error.statusCode === 404" class="width-4/9">Page not found</h1>
    <h1 v-else class="width-4/9">An error ocurred</h1>

    <marquee direction="down" behavior="alternate" class="marquee width-4/9">
      <marquee behavior="alternate"> 🦝 </marquee>
    </marquee>

    <div class="link width-4/9">
      <NuxtLink to="/" />
    </div>
  </main>

  <MoleculesFooter />
</template>

<style lang="scss" scoped>
main {
  padding-top: 8rem;
}

h1 {
  font-size: unquote('clamp(2rem, 0.875rem + 5vw, 3.5rem)');
}

.grid {
  grid-template-rows: min-content;
}

.link {
  margin-top: 2rem;
  text-decoration: underline;
}

.marquee {
  width: 100%;
  height: 100%;

  max-width: 50rem;
  min-height: 20rem;

  border: solid 1px gray;

  marquee {
    font-size: 2rem;

    @media screen and (min-width: 48rem) {
      font-size: 5rem;
    }
  }
}
</style>
