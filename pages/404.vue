<script setup>
useHead({
  title: '404 - Sam de Kanter',
});

const route = useRoute();

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

function goBack() {
  history.back();
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

    // set size of the emoji and the font
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
  <main class="grid pt-32">
    <div class="width-4/9 mb-8">
      <h1>Not found: {{ route.path }}</h1>
      <p>An error occured, or the page you're looking for doesn't exist.</p>
    </div>

    <canvas ref="canvas" class="width-4/9 w-full h-full rounded"></canvas>

    <div class="links width-4/9">
      <div class="flex gap-4">
        <button @click="goBack" class="flex items-center rounded px-4 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="mr-2"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>go back</span>
        </button>
        <a :href="route.path" class="flex items-center rounded px-4 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="mr-2"
          >
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path
              d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"
            ></path>
          </svg>
          refresh the page
        </a>
        <NuxtLink to="/" class="flex items-center rounded px-4 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="mr-2"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          go home
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
h1 {
  font-size: clamp(2rem, 0.875rem + 5vw, 3.5rem);
  margin-bottom: 0.25ch;
}

.grid {
  grid-template-rows: min-content;
}

.links {
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  color: var(--text-col);

  button,
  &:deep(a) {
    color: var(--text);
    border: solid 1px gray;
  }
}

canvas {
  max-width: 50rem;
  min-height: 20rem;
  border: solid 1px gray;
}
</style>
