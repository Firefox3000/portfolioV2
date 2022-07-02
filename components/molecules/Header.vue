<script setup>
const closeMenu = () => {
  document.querySelector('#toggleMenu').checked = false;
};
</script>

<template>
  <header>
    <nav class="menu">
      <input id="toggleMenu" type="checkbox" />
      <label for="toggleMenu">
        Menu
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <rect class="line" x="3" y="6" width="18" height="2" />
          <rect class="line" x="3" y="11" width="18" height="2" />
          <rect class="line" x="3" y="16" width="18" height="2" />
        </svg>
      </label>

      <ul class="menu__list">
        <li @click="closeMenu">
          <NuxtLink to="/">Home</NuxtLink>
        </li>
        <li @click="closeMenu">
          <NuxtLink to="/projects">Projects</NuxtLink>
        </li>
        <li @click="closeMenu">
          <NuxtLink to="/contact">Contact</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
header {
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  background: #161b22;
}

.menu {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  label {
    z-index: 10;

    display: flex;
    align-items: center;

    padding: 1rem 2rem;
    cursor: pointer;

    font-size: 1.125rem;
    color: var(--white);

    svg {
      fill: var(--white);
      margin-left: 1rem;
      transition: all 0.3s ease;

      .line {
        transition: all 0.3s ease;
      }
    }
  }

  input {
    width: 0;
    height: 0;
    display: none;

    &:checked {
      ~ .menu__list {
        transform: translateX(0);
      }

      ~ label svg {
        .line:nth-of-type(1) {
          transform-origin: 0 0;
          transform: rotate(45deg) translate(5px, -7px);
        }
        .line:nth-of-type(2) {
          opacity: 0;
          transform-origin: 50%;
        }
        .line:nth-of-type(3) {
          transform-origin: 0 0;
          transform: rotate(-45deg) translate(-12px, 0px);
        }
      }
    }
  }

  &__list {
    position: absolute;
    z-index: 5;

    top: 0;
    right: 0;
    height: 100vh;
    width: 80vw;
    max-width: 26rem;
    display: flex;
    flex-direction: column;

    transition: all 0.3s ease-out;
    transform: translateX(100%);

    background-color: #161b22;

    li {
      margin-bottom: 2.625rem;
      text-align: center;

      transition: all 0.2s ease;
      position: relative;

      overflow-x: hidden;

      padding-left: 0.6ch;
      padding-right: 0.6ch;

      width: min-content;
      margin-left: auto;
      margin-right: auto;

      a {
        color: var(--white);
      }

      &:first-child {
        margin-top: 6.25rem;
      }

      &::before {
        content: '';
        position: absolute;

        top: calc(50% - 2px);

        height: 2px;
        width: 100%;

        // background-color: #ff3c31;
        background-color: var(--col-primary);

        animation-duration: 0.65s;
        transform: translateX(-110%);

        pointer-events: none;
      }

      &:hover {
        &::before {
          animation-name: hoverBar;
          animation-timing-function: ease;
        }
      }
    }
  }

  @media screen and (min-width: 48rem) {
    label {
      display: none;
    }

    &__list {
      flex-direction: row;
      position: initial;
      height: initial;
      width: initial;
      transform: translateX(0);

      padding: 1rem 2rem;

      li {
        margin: 0 0 0 2.5rem;

        &:first-child {
          margin-top: 0;
        }
      }
    }
  }
}

@keyframes hoverBar {
  0% {
    transform: translateX(-110%);
  }

  100% {
    transform: translateX(110%);
  }
}
</style>
