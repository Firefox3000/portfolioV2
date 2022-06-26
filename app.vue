<script setup>
  definePageMeta({
    layout: defualt
  })
</script>


<template>
  <div>
    <!-- <ContentNavigation v-slot="{navigation}">
      <pre>{{navigation}}</pre>
      <ul>
        <li v-for="link of navigation" :key="link._path">
          <NuxtLink :to="link._path">{{ link.title }}</NuxtLink>
        </li>
      </ul>
    </ContentNavigation> -->

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
