<script setup></script>

<template>
  <div class="nodegrid my-10">
    <ContentSlot :use="$slots.default"></ContentSlot>
  </div>
</template>

<style lang="scss" scoped>
.nodegrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));

  :deep(img) {
    margin: 0;
    aspect-ratio: 1 / 1;
  }
}
</style>
