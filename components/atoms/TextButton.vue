<script setup></script>

<template>
  <button>
    <slot>Button</slot>
  </button>
</template>

<style lang="scss" scoped>
button {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.25rem 1rem;
  font-size: 0.875rem;
  background: #6200ee;
  border-radius: 0.25rem;
  color: #fff;
}
</style>
