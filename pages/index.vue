<script setup>
const data = await queryContent('/projects/')
  .only(['title', 'description', 'img', 'slug', 'createdAt', 'alt'])
  .find();
const articles = data
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .slice(0, 3);

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
  script: [
    {
      src: '/js/parallaxBlobs.js',
      body: true,
      defer: true,
    },
  ],
});
</script>

<template>
  <main class="homePage">
    <section class="grid homePage__about">
      <h1 class="heading2 width-2/10">
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

      <a class="scroll width-3/10" href="#whatIdo">scroll</a>

      <svg
        width="449"
        height="372"
        viewBox="0 0 449 372"
        xmlns="http://www.w3.org/2000/svg"
        class="svg1"
      >
        <path
          d="M380.916 70.5304C423.974 109.906 458.919 170.219 446.439 216.783C433.646 263.346 373.116 296.471 311.025 326.472C248.934 356.472 185.283 383.347 129.12 367.097C72.6458 350.534 23.9716 290.846 6.81082 222.095C-10.038 153.344 4.62671 75.843 47.9967 36.1549C91.6787 -3.22063 164.066 -4.15815 225.533 4.27948C287.312 13.0296 337.858 31.4674 380.916 70.5304Z"
        />
      </svg>

      <svg
        width="372"
        height="399"
        viewBox="0 0 372 399"
        xmlns="http://www.w3.org/2000/svg"
        class="svg2"
      >
        <path
          d="M295.257 95.0565C337.065 145.506 375.467 200.908 371.751 258.476C368.344 316.044 322.82 376.089 268.005 393.421C213.19 410.754 149.394 385.065 98.2947 352.566C47.5057 320.378 9.72353 281.38 1.6716 237.739C-6.38033 194.408 15.6076 146.744 47.196 98.4611C79.094 50.178 120.902 1.58541 164.568 0.0378709C207.925 -1.50966 253.449 44.6069 295.257 95.0565Z"
        />
      </svg>
    </section>

    <section id="whatIdo" class="grid homePage__about2">
      <h2 class="heading3 width-4/9">What do I do</h2>
      <p class="width-4/9">
        Apart from Front end development, I am also intrested things like game
        development, programming, and 3D modeling
      </p>

      <svg
        width="260"
        height="324"
        viewBox="0 0 260 324"
        xmlns="http://www.w3.org/2000/svg"
        class="svg3"
      >
        <path
          d="M200.628 80.3524C234.601 122.648 265.01 167.796 259.308 209.379C253.606 250.962 211.319 288.743 164.28 308.703C117.004 328.426 64.7388 330.326 37.4183 307.04C10.0979 283.516 7.72217 235.042 3.92107 193.934C0.35753 152.588 -4.86899 118.846 9.62273 81.0652C24.1144 43.284 58.3244 1.22559 93.9598 0.0375047C129.595 -1.3882 166.893 38.0564 200.628 80.3524Z"
        />
      </svg>

      <svg
        width="382"
        height="366"
        viewBox="0 0 382 366"
        xmlns="http://www.w3.org/2000/svg"
        class="svg4"
      >
        <path
          d="M320.699 76.24C359.424 123.255 396.42 191.012 376.366 251.509C356.312 311.661 278.863 364.207 197.956 365.936C117.049 368.01 32.6846 319.612 8.13595 256.695C-16.4127 193.778 18.5086 116.687 60.6909 67.9432C102.873 18.854 152.316 -2.23367 196.919 0.186222C241.867 2.95181 281.975 28.8792 320.699 76.24Z"
        />
      </svg>
    </section>

    <section class="grid homePage__projects">
      <h2 class="heading5 titleSide">Recent projects</h2>

      <ul class="width-3/10 highlighted">
        <li
          v-for="article of articles"
          :key="article.slug"
          class="projects__item aspect-1"
        >
          <AtomsPostItem :article="article" />
        </li>
      </ul>

      <a class="width-3/10 heading6 moreProjects lineHover" href="/projects"
        >Explore projects
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
          /></svg
      ></a>
    </section>

    <section class="grid homePage__contact">
      <h2 class="width-7/12">Like what you see?</h2>

      <a href="/contact" class="width-7/12 button button--purple"
        >Lets get in contact</a
      >

      <svg
        viewBox="0 0 669 580"
        xmlns="http://www.w3.org/2000/svg"
        class="svg5"
      >
        <path
          d="M515.839 238.613C558.573 310.907 608.572 394.964 586.283 445.678C563.632 496.292 468.228 513.823 386.848 514.593C305.73 515.825 238.636 500.296 175.482 459.357C112.328 418.418 53.4761 352.169 49.4203 279.711C45.4651 206.891 96.406 127.5 164.579 87.1988C232.751 46.8981 317.794 45.587 378.129 75.6083C438.102 105.529 473.106 166.319 515.839 238.613Z"
        />
      </svg>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.homePage {
  &__projects {
    .titleSide {
      grid-column: span 2;

      @media screen and (min-width: 48rem) {
        grid-column: 1;
        writing-mode: vertical-rl;
        text-orientation: mixed;
      }

      @media screen and (min-width: 64rem) {
        grid-column: 2;
      }
    }

    .moreProjects {
      display: flex;
      flex-direction: row;
      align-items: center;

      margin-left: auto;
    }
  }

  &__about {
    h1 {
      max-width: 32ch;

      span {
        font-size: unquote('clamp(2.5rem, 1.5625rem + 4.1667vw, 3.75rem)');
      }
    }
  }

  &__about2 {
    margin-bottom: 4.375rem;

    @media screen and (min-width: 48rem) {
      margin-bottom: 5.2rem;
    }
  }
}

.homePage__about {
  span {
    display: inline-block;
    margin-right: calc(1em / 8);
  }

  .mask {
    overflow: hidden;

    &:nth-child(n + 2) span {
      transform: translateY(3em);

      animation: dropIn 1s ease forwards;
      animation-delay: calc(var(--order) * 100ms);

      @media (prefers-reduced-motion) {
        animation-delay: 0s;
      }
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
</style>
