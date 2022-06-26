<script>
export default {
  mounted() {
    // var screenW = window.innerWidth;

    var drainUpdateTime = 100; //ms
    var vloeistofLevel = 300;
    var drainSpeed = 7; //lager is sneller
    var x = 0; //drain variabele voor bijhouden hoe lang voorbij is
    var refillActive = true;

    var touches = 0;
    var clearTouchTrack = 0;

    var newPosition = ["85px", "83px"]; //width, height

    var potOpen = false;

    var i;
    var etenKleur = ["#585858", "#767676", "#101010", "#b7b7b7", "#dcdcdcx"];
    var divEten = document.querySelectorAll(".eten");
    var etenReset = 1;

    //Animate pickle on click
    function newPos() {
      newPosition[0] = Math.floor(Math.random() * 157) + "px";
      newPosition[1] = Math.floor(Math.random() * 101) + "px";
      return newPosition;
    }

    function pickleNew() {
      var prevNW = newPosition[0];
      var prevNH = newPosition[1];
      newPos();

      document.querySelector("img.pickle").animate(
        [
          //keyframes
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
          //timing ms
          duration: 1000,
          easing: "ease-in-out",
        }
      );
      document.querySelector("img.pickle").style =
        "top:" + newPosition[1] + ";left:" + newPosition[0];
    }

    document.querySelector("img.pickle").addEventListener("click", pickleNew);

    //vloeistof minder worden
    function vloeistof() {
      x++;
      if (x >= drainSpeed) {
        x = 0;
        if (vloeistofLevel > 1) {
          vloeistofLevel--;
          document.querySelector("div.pickleSaus").style =
            "height: " + vloeistofLevel + "px";
        } else {
          document.querySelector("div.pickleSaus").style = "height: 0px";
          document.querySelector("img.pickle").src =
            "/img/partyPickle/pickleVies.png";
        }
      }
    }

    this.interval = setInterval(vloeistof, drainUpdateTime);

    //Water Refill mechanic
    function waterTimout() {
      refillActive = true;
    }

    function addWater() {
      if (refillActive == true) {
        //max vloeistof 300
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
    }

    document.querySelector("div#drink").addEventListener("click", addWater);

    //Pot kapot maken
    function clearTouches() {
      touches = 0;
      clearTouchTrack = 0;
    }

    function potKapot() {
      touches++;
      if (touches > 25) {
        document.querySelector("img.jar").src = "/img/partyPickle/jarKapot.png";
        drainSpeed = 1;
      }

      if (clearTouchTrack == 0) {
        setTimeout(clearTouches, 2000);
        clearTouchTrack = 1;
      }
    }

    function potRepareren() {
      document.querySelector("img.jar").src = "/img/partyPickle/jar.png";
      drainSpeed = 7;
    }

    document.querySelector("img.jar").addEventListener("mouseenter", potKapot);
    document.querySelector("img.jar").addEventListener("mouseleave", potKapot);
    document
      .querySelector("img.jar")
      .addEventListener("dblclick", potRepareren);

    //pot openen
    function openPot() {
      if (potOpen == true) {
        document
          .querySelector("div.deksel")
          .classList.add("dekselAnimateClose");
        document.querySelector("div.deksel").classList.remove("dekselAnimate");
        potOpen = false;
      } else {
        document.querySelector("div.deksel").classList.add("dekselAnimate");
        document
          .querySelector("div.deksel")
          .classList.remove("dekselAnimateClose");
        potOpen = true;
      }
    }

    document.querySelector("div.deksel").addEventListener("click", openPot);

    //eten geven
    function removeEtenAni() {
      for (i = 0; i < divEten.length; i++) {
        divEten[i].classList.remove("etenAnimate");
      }
      etenReset = 1;
    }

    document
      .querySelector("div.eten")
      .addEventListener("animationend", removeEtenAni);

    function geefEten() {
      if (potOpen == true && etenReset == 1) {
        var eetNummer = Math.floor(Math.random() * 3) + 2;

        var positie;
        var grote;
        var offset;

        for (i = 0; i < eetNummer; i++) {
          positie = Math.floor(Math.random() * 15) - 7.5 + 50;
          offset = Math.floor(Math.random() * 50) + 25 + "px";
          grote = Math.floor(Math.random() * 10) + 10 + "px";

          var kleur = Math.floor(Math.random() * etenKleur.length);
          divEten[i].style =
            `width:${grote};height:${grote};` +
            `left:${positie}%;top:-${offset}` +
            `;background-color: ${etenKleur[kleur]}`;
          divEten[i].classList.add("etenAnimate");
        }
        etenReset = 0;

        if (vloeistofLevel >= 275) {
          document.querySelector("img.pickle").src =
            "/img/partyPickle/pickle.png";
        }
      }
    }

    document.querySelector("div#eten").addEventListener("click", geefEten);

    //animatie klass deksel openen we halen
    function removeOpenPot() {
      document.querySelector("div.deksel").classList.add("dekselOpen");
      document.querySelector("div.deksel").classList.remove("dekselAnimate");
    }

    document
      .querySelector("div.deksel")
      .addEventListener("animationend", removeOpenPot);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>

<template>
  <section class="partyPickle">
    <div class="positionMove">
      <div class="moveSpace">
        <img
          class="pickle grabNone selectNone"
          src="/img/partyPickle/pickle.png"
          alt="Augurk"
        />
      </div>
    </div>
    <div class="pickleSaus"></div>

    <div class="deksel"></div>
    <img
      class="jar grabNone selectNone"
      src="/img/partyPickle/jar.png"
      alt="Augurken pot"
    />

    <div class="eten"></div>
    <div class="eten"></div>
    <div class="eten"></div>
    <div class="eten"></div>
    <div class="eten"></div>

    <div class="knoppen">
      <div id="drink" class="button selectNone">Give Juice</div>
      <div id="eten" class="button selectNone">Give Food</div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.partyPickle {
  width: 100vw;
  margin-left: -1.5rem;

  padding-top: 44rem;
  padding-bottom: 6rem;
  background: linear-gradient(#ffcb57 70%, rgba(0, 0, 0, 0) 0 100%);

  @media screen and (min-width: 48rem) {
    width: auto;
    margin-left: 0;
  }

  @media screen and (min-width: 64rem) {
    background: linear-gradient(#ffcb57 65%, rgba(0, 0, 0, 0) 0 100%);
  }
}
</style>
