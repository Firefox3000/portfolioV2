<script>
export default {
  props: {
    article: {
      type: Object,
      default: () => {},
    },
    loadlazy: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<template>
  <NuxtLink :to="{ name: 'projects-slug', params: { slug: article.slug } }">
    <!-- <nuxt-picture -->
    <img
      width="512"
      height="512"
      :loading="loadlazy ? 'lazy' : null"
      :src="article.img"
      :alt="article.alt"
    />
    <!-- sizes="sm:100vw md:50vw lg:512px" -->
    <div class="projects__text">
      <h2 class="heading3">{{ article.title }}</h2>
      <svg
        width="49"
        height="32"
        viewBox="0 0 49 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M32.3182 0L48.1385 15.5691L32.3182 31.1382L30.2139 29L42.3373 17.0691H0V14.0691H42.3373L30.2139 2.13823L32.3182 0Z"
        />
      </svg>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
h2,
a:deep(img)  {
  transition: transform 0.2s ease-out;
}

h2 {
  text-shadow: rgba(30, 30, 30, 0.5) 0px 0px 0.5rem;
}

a:deep(img) {
  width: 100%;
  height: auto;
}

h2 {
  color: var(--white);
  position: absolute;
  bottom: 0;
  margin-bottom: 0;
  transform: translateY(0);
}

svg {
  position: absolute;
  bottom: 0;

  height: 1.6em;

  opacity: 0;
  transform: translateY(1.6rem);

  transition: all 0.2s ease-out;

  path {
    fill: var(--white);
  }
}

.projects__text {
  position: absolute;

  bottom: 2rem;
  left: 2rem;
  right: 2rem;
}

a {
  // outline: none;
  overflow: hidden;

  &:hover, &:focus {
    h2 {
      transform: translateY(-0.8em);
    }

    :deep(img) {
      transform: scale(1.1);
    }

    svg {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion) {
    &:hover, &:focus {
      img {
        // don't scale image with reduced motion
        transform: scale(1);
      }
    }
  }
}
</style>
