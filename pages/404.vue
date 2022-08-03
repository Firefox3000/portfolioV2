<script setup>
const canvas = ref();

let ctx;
let frame;

function random(a, b) {
  if (b === undefined) return Math.random() * a;
  return a + Math.random() * (b - a);
}

function setCanvasSize() {
  if (ctx) {
    ctx.canvas.width = canvas.value.offsetWidth;
    ctx.canvas.height = canvas.value.offsetHeight;
  }
}

onMounted(() => {
  window.addEventListener('resize', setCanvasSize);

  ctx = canvas.value.getContext('2d');

  ctx.canvas.width = canvas.value.offsetWidth;
  ctx.canvas.height = canvas.value.offsetHeight;

  const speed = { x: 2, y: 2 };
  const pos = {
    x: random(64, canvas.value.width - 64),
    y: random(64, canvas.value.height - 64),
  };

  frame = requestAnimationFrame(loop);

  function loop() {
    frame = requestAnimationFrame(loop);

    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

    pos.x += speed.x;
    pos.y += speed.y;

    // collisions
    if (pos.x <= 32 || pos.x + 32 >= canvas.value.width) {
      speed.x *= -1;
    }

    if (pos.y <= 32 || pos.y + 28 >= canvas.value.height) {
      speed.y *= -1;
    }

    // oob
    if (
      pos.x < 0 ||
      pos.x > canvas.value.width ||
      pos.y < 0 ||
      pos.y > canvas.value.height
    ) {
      pos.x = canvas.value.width / 2;
      pos.y = canvas.value.height / 2;
    }

    //Set size of the emoji and the font
    ctx.font = '64px Arial';
    // use these alignment properties for "better" positioning
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // draw the emoji
    ctx.fillText('🦝', pos.x, pos.y);
  }
});

onUnmounted(() => {
  window.removeEventListener(setCanvasSize);
  cancelAnimationFrame(frame);
});
</script>

<template>
  <main class="grid">
    <h1 class="width-4/9">Page not found</h1>

    <canvas ref="canvas" class="width-4/9"></canvas>

    <div class="link width-4/9">
      <NuxtLink to="/"> Go back to a page that actually exsist </NuxtLink>
    </div>
  </main>
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
  margin-bottom: 1.5rem;
  text-decoration: underline;
}

canvas {
  width: 100%;
  height: 100%;

  max-width: 50rem;
  min-height: 20rem;

  border: solid 1px gray;
}
</style>
