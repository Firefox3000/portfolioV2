<script setup>
const articles = await queryContent('/projects/')
  .only(['title', 'description', 'img', 'slug', 'createdAt', 'alt'])
  .where({ status: 'public' })
  .sort({ createdAt: -1 })
  .limit(3)
  .find();

useHead({
  title: 'Portfolio | Sam de Kanter',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content:
        'Sam is a Front end Developer creating digital experiences currently studying Communication and multimedia design in Amsterdam.',
    },
    {
      hid: 'ogdescription ',
      property: 'og:description ',
      content:
        'Sam is a Front end Developer creating digital experiences currently studying Communication and multimedia design in Amsterdam.',
    },
    {
      hid: 'ogtitle',
      property: 'og:title',
      content: 'Portfolio | Sam de Kanter',
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: `http://schelpkikker.nl/logo.png`,
    },
    {
      hid: 'keywords',
      property: 'keywords',
      content: 'Portfolio, Sam, Frontend, JavaScript, Developer',
    },
    {
      hid: 'ogurl',
      property: 'og:url',
      content: 'http://schelpkikker.nl/',
    },
    {
      hid: 'robots',
      name: 'robots',
      content: 'index, follow',
    },
    {
      hid: 'googlebot',
      name: 'googlebot',
      content: 'index, follow',
    },
  ],
});
</script>

<template>
  <main class="homePage max-w-full overflow-x-hidden">
    <section class="grid homePage__about mt-48 mb-24 relative">
      <div
        class="glow glow-purple w-[24rem] h-[24rem] top-56 -right-20 opacity-20"
      ></div>
      <div
        class="glow glow-green w-[24rem] h-[24rem] top-96 left-36 opacity-20"
        style="animation-delay: 2s"
      ></div>
      <div
        class="glow glow-green2 w-[34rem] h-[34rem] -top-20 -left-44 opacity-20"
        style="animation-delay: 4s"
      ></div>

      <div class="relative width-3/10">
        <h1 class="h2">
          <span class="mask"><span>Hey, I’m Sam.</span></span>
          <span class="mask" style="--order: 1"><span>I’m</span></span>
          <span class="mask" style="--order: 2"><span>a</span></span>
          <span class="mask" style="--order: 3"><span>front</span></span>
          <span class="mask" style="--order: 4"><span>end</span></span>
          <span class="mask" style="--order: 5"><span>developer</span></span>
          <span class="mask" style="--order: 6"><span>creating</span></span>
          <span class="mask" style="--order: 7"><span>digital</span></span>
          <span class="mask" style="--order: 8"><span>experiences</span></span>
        </h1>

        <a class="scroll" href="#whatIdo">scroll</a>
      </div>
    </section>

    <section id="whatIdo" class="grid homePage__about2 relative">
      <div class="width-4/9">
        <h2 class="h3">What do I do</h2>
        <p>
          Apart from Front end development, I am also intrested things like game
          development, programming, and 3D modeling
        </p>
      </div>
    </section>

    <section class="grid homePage__projects relative mb-16">
      <div
        class="glow glow-green w-[24rem] h-[24rem] top-32 right-24 opacity-10"
      ></div>

      <div class="relative width-3/10">
        <h2 class="h5 titleSide">Recent projects</h2>

        <ul class="highlighted">
          <li
            v-for="article of articles"
            :key="article.slug"
            class="projects__item aspect-1"
          >
            <AtomsPostItem :article="article" />
          </li>
        </ul>

        <a
          class="h6 moreProjects lineHover flex flex-row items-center ml-auto w-max px-1"
          href="/projects"
        >
          Explore projects
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
        </a>
      </div>
    </section>

    <section class="grid pb-72 relative">
      <div
        class="glow glow-purple w-[24rem] h-[24rem] top-0 left-24 opacity-20"
      ></div>

      <div class="width-7/12">
        <h2>Like what you see?</h2>

        <a href="/contact" class="button button--purple w-fit">
          Lets get in contact
        </a>
      </div>
    </section>
  </main>
</template>

<style lang="postcss" scoped>
.homePage {
  &__projects {
    .titleSide {
      @media screen and (min-width: 48rem) {
        position: absolute;
        top: 0;
        left: -3.5rem;

        writing-mode: vertical-rl;
        text-orientation: mixed;
      }

      /* @media screen and (min-width: 64rem) {
      } */
    }

    .moreProjects {
      svg {
        height: 0.75em;
        width: auto;
        margin-left: 1rem;
        fill: currentColor;
      }
    }
  }

  &__about {
    h1 {
      max-width: 32ch;
      line-height: 0.75;

      span {
        display: inline-block;
        overflow: hidden;
        margin-right: calc(1em / 8);
        height: 1.25em;
        font-size: clamp(2.5rem, 1.5625rem + 4.1667vw, 3.75rem);
      }
    }

    .mask {
      &:nth-child(n + 2) span {
        transform: translateY(3em);

        animation: dropIn 1s ease forwards;
        animation-delay: calc(var(--order) * 100ms);

        @media (prefers-reduced-motion) {
          animation-delay: 0s;
        }
      }
    }

    .scroll {
      display: block;
      width: max-content;

      position: relative;
      margin: 0 auto;
      color: var(--text);

      &::before {
        content: '';
        position: absolute;
        background-color: currentColor;

        width: 150%;
        height: 1px;

        border-radius: 1rem;
        transition: all 0.2s ease-out;

        left: -22.5%;
        bottom: -0.3rem;
      }

      &:hover,
      &:focus {
        outline: none;

        &::before {
          transform: translateX(-12.5%);
          width: 200%;
        }
      }
    }

    @media screen and (min-width: 48rem) {
      /* margin-top: 14rem; */
      /* margin-bottom: 6rem; */
    }
  }

  &__about2 {
    margin: 4rem auto;

    @media screen and (min-width: 48rem) {
      margin-bottom: 5rem;
    }
  }
}

.highlighted {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  row-gap: 1.5rem;

  margin-bottom: 1.6rem;

  @media screen and (min-width: 48rem) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.projects__item {
  overflow: hidden;
}

@keyframes dropIn {
  from {
    transform: translateY(3em);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes glowMotion {
  0% {
    transform: translateZ(0) scale(1);
  }

  33% {
    transform: translate3d(20px, -10px, 0) scale(1.01);
  }

  66% {
    transform: translate3d(-20px, 20px, 0) scale(0.95);
  }

  100% {
    transform: tranlate3d(0, 0, 0) scale(1);
  }
}
</style>
