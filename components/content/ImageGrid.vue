<template>
  <div class="nodegrid">
    <Markdown unwrap="p" />
  </div>
</template>

<style lang="scss" scoped>
.nodegrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));

  margin-top: 2.4rem;
  margin-bottom: 2.4rem;

  :deep(img) {
    margin: 0;
    width: 100%;
    aspect-ratio: 1 / 1;
  }
}
</style>
