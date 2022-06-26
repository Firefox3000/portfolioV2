<script setup>
definePageMeta({
  layout: defualt,
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
