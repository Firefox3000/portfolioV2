const blob1 = document.querySelector(".svg1");
const blob1Trans = getTranslateValues(blob1);
const blob2 = document.querySelector(".svg2");
const blob2Trans = getTranslateValues(blob2);
const blob3 = document.querySelector(".svg3");
const blob3Trans = getTranslateValues(blob3);
const blob4 = document.querySelector(".svg4");
const blob4Trans = getTranslateValues(blob4);
const blob5 = document.querySelector(".svg5");
const blob5Trans = getTranslateValues(blob5);

let scrollPos = 0;

// Grab the prefers reduced media query.
const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

// Check if the media query matches or is not available.
if (!mediaQuery || mediaQuery.matches) {
  // doSomethingWithoutAnimation();
} else {
  // doSomethingWithAnimation();
  window.addEventListener("scroll", paralaxBlobs);
}

// Ads an event listener to check for changes in the media query's value.
mediaQuery.addEventListener("change", () => {
  if (mediaQuery.matches) {
    // doSomethingWithoutAnimation();
    window.removeEventListener("scroll", paralaxBlobs);
  } else {
    // doSomethingWithAnimation();
    window.addEventListener("scroll", paralaxBlobs);
  }
});

function paralaxBlobs() {
  scrollPos = window.scrollY;

  blob1.style.transform = `translate(${blob1Trans.x}px, ${scrollPos * 0.45}px)`;

  blob2.style.transform = `translate( ${blob2Trans.x}px,${scrollPos * 0.4}px)`;

  blob3.style.transform = `translate(${blob3Trans.x}px, ${Math.min(
    (scrollPos - 200) * 0.1 - 25,
    120
  )}px)`;

  blob4.style.transform = `translate(${blob4Trans.x}px, ${Math.min(
    (scrollPos - 700) * 0.15 - 100,
    125
  )}px)`;

  blob5.style.transform = `translate(${blob5Trans.x}px, ${Math.max(
    Math.min((scrollPos - 2400) * 0.3, 120),
    -25
  )}px)`;
}

/**
 * Gets computed translate values
 * @param {HTMLElement} element
 * @returns {Object}
 */
function getTranslateValues(element) {
  const style = window.getComputedStyle(element);
  const matrix = style.transform || style.webkitTransform || style.mozTransform;

  // No transform property. Simply return 0 values.
  if (matrix === "none") {
    return {
      x: 0,
      y: 0,
      z: 0,
    };
  }

  // Can either be 2d or 3d transform
  const matrixType = matrix.includes("3d") ? "3d" : "2d";
  const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(", ");

  // 2d matrices have 6 values
  // Last 2 values are X and Y.
  // 2d matrices does not have Z value.
  if (matrixType === "2d") {
    return {
      x: matrixValues[4],
      y: matrixValues[5],
      z: 0,
    };
  }

  // 3d matrices have 16 values
  // The 13th, 14th, and 15th values are X, Y, and Z
  if (matrixType === "3d") {
    return {
      x: matrixValues[12],
      y: matrixValues[13],
      z: matrixValues[14],
    };
  }
}
