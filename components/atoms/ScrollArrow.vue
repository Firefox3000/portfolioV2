<template>
  <div class="arrow">
    <span class="arrow__head"></span>
    <span class="arrow__title"> Scroll down</span>
  </div>
</template>

<style lang="scss" scoped>
.arrow {
  display: block;
  position: relative;
  text-align: center;
  padding-top: 5rem;
  color: var(--white);

  &::before {
    content: '';
    // animation: elasticus 1.5s cubic-bezier(1, 0, 0, 1) infinite;
    animation: scroll 4s cubic-bezier(0.77, 0, 0.175, 1) infinite both;
    position: absolute;
    background-color: currentColor;
    top: 0;
    left: 50%;
    margin-left: -1px;

    width: 2px;
    height: 90px;
  }

  &__head {
    display: block;
    margin: 0 auto;
    width: 10px;
    height: 38px;

    &::after {
      content: '';
      position: absolute;
      width: 8px;
      height: 8px;
      margin-left: -5px;
      border-top: 2px solid var(--white);
      border-right: 2px solid var(--white);
      transform: rotate(135deg);
    }
  }

  &__title {
    color: var(--white);
  }
}

@keyframes elasticus {
  0% {
    -webkit-transform-origin: 0% 0%;
    -ms-transform-origin: 0% 0%;
    -moz-transform-origin: 0% 0%;
    -o-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
    -webkit-transform: scale(1, 0);
    -ms-transform: scale(1, 0);
    -moz-transform: scale(1, 0);
    -o-transform: scale(1, 0);
    transform: scale(1, 0);
  }
  50% {
    -webkit-transform-origin: 0% 0%;
    -ms-transform-origin: 0% 0%;
    -moz-transform-origin: 0% 0%;
    -o-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
    -webkit-transform: scale(1, 1);
    -ms-transform: scale(1, 1);
    -moz-transform: scale(1, 1);
    -o-transform: scale(1, 1);
    transform: scale(1, 1);
  }
  50.1% {
    -webkit-transform-origin: 0% 100%;
    -ms-transform-origin: 0% 100%;
    -moz-transform-origin: 0% 100%;
    -o-transform-origin: 0% 100%;
    transform-origin: 0% 100%;
    -webkit-transform: scale(1, 1);
    -ms-transform: scale(1, 1);
    -moz-transform: scale(1, 1);
    -o-transform: scale(1, 1);
    transform: scale(1, 1);
  }
  100% {
    -webkit-transform-origin: 0% 100%;
    -ms-transform-origin: 0% 100%;
    -moz-transform-origin: 0% 100%;
    -o-transform-origin: 0% 100%;
    transform-origin: 0% 100%;
    -webkit-transform: scale(1, 0);
    -ms-transform: scale(1, 0);
    -moz-transform: scale(1, 0);
    -o-transform: scale(1, 0);
    transform: scale(1, 0);
  }
}
</style>
