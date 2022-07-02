<script setup>
// Do something with this component or yeet it
onMounted(() => {
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');

  ctx.beginPath();
  ctx.arc(100, 75, 50, 0, 2 * Math.PI);
  ctx.stroke();
});
</script>

<template>
  <div>
    <canvas id="canvas" width="400" height="300"></canvas>
  </div>
</template>

<style lang="scss" scoped>
#canvas {
  // background: var(--white);
}
</style>
