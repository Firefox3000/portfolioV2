<script setup>
defineProps({
  href: {
    type: String,
    default: '/',
  },
  icon: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <a class="iconLink" :href="href">
    <img v-if="icon" :src="`./icons/${icon}.svg?inline`" />
    <slot>Link</slot>
  </a>
</template>

<style lang="scss" scoped>
a.iconLink {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  padding: 0.25rem 1rem 0.25rem 0.75rem;
  font-size: 0.875rem;
  background: #6200ee;
  border-radius: 0.25rem;
  color: #fff;

  img {
    margin: 0 0.5rem 0 0;
    height: 1.125rem;
    width: auto;
    filter: invert(1);
  }
}
</style>
