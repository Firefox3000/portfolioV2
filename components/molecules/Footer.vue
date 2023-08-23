<script setup>
const year = new Date().getFullYear();
</script>

<template>
  <footer class="grid">
    <div class="width-3/10">
      <p class="body2">
        <a class="lineHover" target="social" href="https://github.com/vuurvos1"
          >GitHub</a
        >
        /
        <a class="lineHover" target="social" href="https://codepen.io/Vuurvos"
          >Codepen</a
        >
        /
        <a
          class="lineHover"
          target="social"
          href="https://www.linkedin.com/in/samdekanter"
          >LinkedIn</a
        >
        /
        <a
          class="lineHover"
          target="social"
          href="https://cssbattle.dev/player/vuurvos"
          >CSS Battle</a
        >
      </p>
      <p class="body2">&copy; {{ year }} - Sam de Kanter</p>
    </div>
  </footer>
</template>

<style lang="postcss" scoped>
footer {
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding: 1.125rem 0;
    border-top: 1px solid #d9d9d9;

    text-align: center;

    p {
      margin: 0;

      &:first-child {
        margin-bottom: 0.75rem;
      }

      a {
        display: inline-flex;
      }
    }

    @screen md {
      flex-direction: row;
      padding: 2rem 0;
    }
  }
}
</style>
