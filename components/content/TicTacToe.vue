<script setup>
  useHead({
    script: [
      {
        src: "/js/ticTacToe.js",
        body: true,
        defer: true,
      },
    ],
  })
</script>

<template>
  <section class="ticTacToe">
    <p class="winner heading4">Winner:</p>
    <div class="ticTacToe__grid">
      <div class="row">
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
      </div>
      <div class="row">
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
      </div>
      <div class="row">
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
      </div>
    </div>

    <div class="sliderContainer">
      <p>Easy</p>
      <input
        id="slider"
        class="slider"
        type="range"
        min="0"
        max="1"
        value="0.5"
        step="0.01"
      />
      <p>Hard</p>
    </div>

    <AtomsTextButton class="restart">Restart game</AtomsTextButton>
  </section>
</template>

<style lang="scss" scoped>
.ticTacToe {
  width: 100vw;

  margin-top: 3rem;
  margin-bottom: 2.4rem;
  margin-left: -1.5rem;

  padding: 2.4rem 1.5rem;
  background-color: var(--col-secondary);

  &__grid {
    margin: 0 auto 2rem auto;

    display: grid;
    grid-template-rows: repeat(3, 1fr);

    width: 85vw;
    max-width: 25rem;
    height: 85vw;
    max-height: 25rem;

    div {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }

    .row {
      div {
        display: flex;

        justify-content: center;
        align-items: center;

        border-color: rgba(0, 0, 0, 0.4);
        border-width: 4px;
        border-style: solid;

        font-size: 3rem;
        font-weight: 400;

        // remove unnecessary grid lines
        &:first-child {
          border-left: 0;
        }

        &:last-child {
          border-right: 0;
        }
      }

      // remove unnecessary grid lines
      &:nth-child(1) div {
        border-top: 0;
      }

      &:nth-child(3) div {
        border-bottom: 0;
      }
    }

    .col:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  button {
    margin: 0 auto 1rem auto;
  }

  .heading4 {
    text-align: center;
  }

  .sliderContainer {
    margin: 0 auto 1.5rem auto;
    max-width: fit-content;

    display: flex;
    flex-direction: row;
    align-items: center;

    #slider {
      margin: 0 1rem;
    }

    p {
      margin-bottom: 0;
    }
  }

  @media screen and (min-width: 48rem) {
    width: auto;
    margin-left: 0;
  }
}
</style>
