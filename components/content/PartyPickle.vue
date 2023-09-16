<script setup>
const drainUpdateTime = 100; //ms
let vloeistofLevel = 300;
let drainSpeed = 7; //lager is sneller
let x = 0; // drain variabele voor bijhouden hoe lang voorbij is
let refillActive = true;

let touches = 0;
let clearTouchTrack = 0;

let newPosition = ['85px', '83px']; //width, height

let potOpen = false;

const etenKleur = ['#585858', '#767676', '#101010', '#b7b7b7', '#dcdcdcx'];
let etenReset = 1;

let intervalId;

// Animate pickle on click
function newPos() {
  newPosition[0] = Math.floor(Math.random() * 157) + 'px';
  newPosition[1] = Math.floor(Math.random() * 101) + 'px';
  return newPosition;
}

const pickleNew = () => {
  var prevNW = newPosition[0];
  var prevNH = newPosition[1];
  newPos();

  document.querySelector('img.pickle').animate(
    [
      // keyframes
      {
        top: prevNH,
        left: prevNW,
      },
      {
        top: newPosition[1],
        left: newPosition[0],
      },
    ],
    {
      // timing ms
      duration: 1000,
      easing: 'ease-in-out',
    }
  );
  document.querySelector('img.pickle').style =
    'top:' + newPosition[1] + ';left:' + newPosition[0];
};

// Pot kapot maken
const clearTouches = () => {
  touches = 0;
  clearTouchTrack = 0;
};

const potKapot = () => {
  touches++;
  if (touches > 25) {
    document.querySelector('img.jar').src = '/img/partyPickle/jarKapot.png';
    drainSpeed = 1;
  }

  if (clearTouchTrack == 0) {
    setTimeout(clearTouches, 2000);
    clearTouchTrack = 1;
  }
};

const potRepareren = () => {
  document.querySelector('img.jar').src = '/img/partyPickle/jar.png';
  drainSpeed = 7;
};

// Water Refill mechanic
const waterTimout = () => {
  refillActive = true;
};

const addWater = () => {
  if (refillActive == true) {
    // max vloeistof 300
    if (vloeistofLevel < 275) {
      vloeistofLevel += 25;
      refillActive = false;
      setTimeout(waterTimout, 1000);
    } else if (vloeistofLevel <= 300) {
      vloeistofLevel = 300;
      refillActive = false;
      setTimeout(waterTimout, 1000);
    }
  }
};

// pot openen
const openPot = () => {
  if (potOpen == true) {
    document.querySelector('div.deksel').classList.add('dekselAnimateClose');
    document.querySelector('div.deksel').classList.remove('dekselAnimate');
    potOpen = false;
  } else {
    document.querySelector('div.deksel').classList.add('dekselAnimate');
    document.querySelector('div.deksel').classList.remove('dekselAnimateClose');
    potOpen = true;
  }
};

// eten geven
const removeEtenAni = () => {
  var divEten = document.querySelectorAll('.eten');

  for (let i = 0; i < divEten.length; i++) {
    divEten[i].classList.remove('etenAnimate');
  }
  etenReset = 1;
};

const geefEten = () => {
  if (potOpen == true && etenReset == 1) {
    var divEten = document.querySelectorAll('.eten');

    var eetNummer = Math.floor(Math.random() * 3) + 2;

    var positie;
    var grote;
    var offset;

    for (let i = 0; i < eetNummer; i++) {
      positie = Math.floor(Math.random() * 15) - 7.5 + 50;
      offset = Math.floor(Math.random() * 50) + 25 + 'px';
      grote = Math.floor(Math.random() * 10) + 10 + 'px';

      var kleur = Math.floor(Math.random() * etenKleur.length);
      divEten[i].style =
        `width:${grote};height:${grote};` +
        `left:${positie}%;top:-${offset}` +
        `;background-color: ${etenKleur[kleur]}`;
      divEten[i].classList.add('etenAnimate');
    }
    etenReset = 0;

    if (vloeistofLevel >= 275) {
      document.querySelector('img.pickle').src = '/img/partyPickle/pickle.png';
    }
  }
};

// animatie klass deksel openen we halen
const removeOpenPot = () => {
  document.querySelector('div.deksel').classList.add('dekselOpen');
  document.querySelector('div.deksel').classList.remove('dekselAnimate');
};

onMounted(() => {
  // vloeistof minder worden
  function vloeistof() {
    x++;
    if (x >= drainSpeed) {
      x = 0;
      if (vloeistofLevel > 1) {
        vloeistofLevel--;
        document.querySelector('div.pickleSaus').style =
          'height: ' + vloeistofLevel + 'px';
      } else {
        document.querySelector('div.pickleSaus').style = 'height: 0px';
        document.querySelector('img.pickle').src =
          '/img/partyPickle/pickleVies.png';
      }
    }
  }

  intervalId = setInterval(vloeistof, drainUpdateTime);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <section class="partyPickle">
    <div class="positionMove">
      <div class="moveSpace">
        <img
          class="pickle grabNone selectNone"
          src="/img/partyPickle/pickle.png"
          alt="Augurk"
          @click="pickleNew"
        />
      </div>
    </div>
    <div class="pickleSaus"></div>

    <div class="deksel" @click="openPot" @animationend="removeOpenPot"></div>
    <img
      class="jar grabNone selectNone"
      src="/img/partyPickle/jar.png"
      alt="Augurken pot"
      @mouseenter="potKapot"
      @mouseleave="potKapot"
      @dblclick="potRepareren"
    />

    <div
      v-for="index in 5"
      :key="index"
      class="eten"
      @animationend="removeEtenAni"
    ></div>

    <div class="knoppen">
      <div id="drink" class="button selectNone" @click="addWater">
        Give Juice
      </div>
      <div id="eten" class="button selectNone" @click="geefEten">Give Food</div>
    </div>
  </section>
</template>

<style lang="postcss" scoped>
.partyPickle {
  width: 100vw;
  margin-left: -1.5rem;

  padding-top: 44rem;
  padding-bottom: 6rem;
  background: linear-gradient(#ffcb57 70%, rgba(0, 0, 0, 0) 0 100%);

  @screen md {
    width: auto;
    margin-left: 0;
  }

  @screen lg {
    background: linear-gradient(#ffcb57 65%, rgba(0, 0, 0, 0) 0 100%);
  }
}

.grabNone {
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  /* user-drag: none; */
}

.selectNone {
  /* No text select */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.partyPickle {
  position: relative;
  z-index: 1;
  min-height: 42rem;
  overflow-x: hidden;

  margin-top: 2rem;

  .pickle {
    position: absolute;
    top: 83px;
    left: 85px;

    width: auto;

    cursor: pointer;

    z-index: 2;
  }

  .moveSpace {
    width: 274px;
    height: 320px;
    position: relative;
    margin: 0 auto;
  }

  .positionMove {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 24vh;
  }

  .pickleSaus {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    height: 300px;
    width: 276px;
    bottom: 24vh;
    background-color: #919b54;
    z-index: -1;

    border-radius: 0 0 22px 22px;
  }

  .knoppen {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    cursor: pointer;

    z-index: 2;

    .button {
      margin: 0 1rem;
    }
  }

  .jar {
    display: block;
    margin: 0 auto;
    position: absolute;
    width: auto;
    left: 0;
    right: 0;
    bottom: 24vh;
  }
}

.deksel {
  width: 210px;
  height: 40px;
  margin: 0 auto;
  background-color: #a5a5a5;
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(24vh + 360px);
  z-index: 1;

  transform-origin: 0% 100%;

  transition: all 0.5s ease-in-out;
  animation-fill-mode: forwards;
}

.dekselAnimate {
  animation-name: dekselAn;
  animation-duration: 2s;
}

.dekselAnimateClose {
  animation-name: dekselAnClose;
  animation-duration: 3s;
}

.dekselOpen {
  transform: rotate(-90deg);
}

.eten {
  border-radius: 50%;
  position: absolute;

  top: -50px;
  left: 50%;

  transition: all 0.3s ease-out;
}

.etenAnimate {
  animation-name: etenDrop;
  animation-duration: 3.2s;
}

@keyframes dekselAn {
  0% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(0, -100px);
  }

  100% {
    transform: rotate(-90deg);
  }
}

@keyframes dekselAnClose {
  0% {
    transform: rotate(-90deg);
  }

  60% {
    transform: translate(0, -100px);
  }

  100% {
    transform: translate(0, 0);
  }
}

@keyframes etenDrop {
  0% {
    transform: translate(0, 0);
  }

  60% {
    opacity: 1;
  }

  100% {
    transform: translateY(70vh);
    opacity: 0;
  }
}
</style>
