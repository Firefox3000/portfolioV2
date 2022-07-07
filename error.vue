<script setup>
defineProps({
  error: Object,
});
</script>

<template>
  <MoleculesHeader />
  <MoleculesErr :error="{ ...error }" />
  <MoleculesFooter />
</template>
