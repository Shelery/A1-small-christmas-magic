/*
 * Assignment 1: Paired Modelling
 * ------------------------------
 * Programming 2022, Interaction Design Bacherlor, Malmö University
 *
 * This assignment is written by:
 * Anastasiia Kniazkina
 * Eszter Kovács
 *
 *
 * The template contains some sample code exemplifying the template code structure.
 * You can build on top of it, or remove the example values etc.
 *
 * For instructions, see the Canvas assignment: https://mau.instructure.com/courses/11936/assignments/84965
 * For guidence on how to use the template, see the demo video:
 *
 */

// The state should contain all the "moving" parts of your program, values that change.
let state = Object.freeze({
  pointerEvent: { x: 0, y: 0 },
});

// The settings should contain all of the "fixed" parts of your programs, like static HTMLElements and paramaters.
const settings = Object.freeze({
  /*     sample: {
        height: 100,
        width: 100,
        element: document.querySelector("#sample-output"),
    }, */
});

/**
 * Update the state object with the properties included in `newState`.
 * @param {Object} newState An object with the properties to update in the state object.
 */
function updateState(newState) {
  state = Object.freeze({ ...state, ...newState });
}

/**
 * Return `num` normalized to 0..1 in range min..max.
 * @param {number} num
 * @param {number} min
 * @param {number} max
 * @returns number
 */

/**
 * Return `num` transformed from the normalised 0..1 form back to the min..max form.
 * @param {number} num
 * @param {number} min
 * @param {number} max
 * @returns number
 */

/**
 * This is where we put the code that transforms and outputs our data.
 * loop() is run every frame, assuming that we keep calling it with `window.requestAnimationFrame`.
 */
function loop() {
  // Make the light "breathe"
  // slow the animation down
  setTimeout(() => {
    let lights = document.querySelectorAll(".light");
    for (let light of lights) {
      light.style.background = `radial-gradient(gold, transparent 50%)`;
      light.style.opacity = `${Math.random()}`;
    }
    window.requestAnimationFrame(loop);
  }, 80);
}

/**
 * Setup is run once, at the start of the program. It sets everything up for us!
 */
function setup() {
  // Create a div for flame light when screen touched
  // Get size and position
  document.addEventListener("pointerdown", (e) => {
    // create flame
    createElement("flame", e);
    /* const flameDiv = document.createElement("div");
    flameDiv.classList.add("flame");
    flameDiv.id = `flame${e.pointerId}`;
    updateSizeAndPos(e, flameDiv, 2.5);
    document.body.append(flameDiv); */

    // create light
    createElement("light", e);
  });

  // Make the candle follow the pointer when it moves
  document.addEventListener("pointermove", (e) => {
    // Make the flame follow the pointer
    // find the HTML element that is the "object" of the current event
    const flameDiv = document.getElementById(`flame${e.pointerId}`);
    if (flameDiv == null) return;
    updateSizeAndPos(e, flameDiv, 2.5);

    // Make the light follow the pointer
    const lightDiv = document.getElementById(`light${e.pointerId}`);
    updateSizeAndPos(e, lightDiv, 4);
  });
  // remove the candle when finger lifted
  document.addEventListener("pointerup", (e) => {
    // Remove flame
    removeElement("flame", e.pointerId);

    // Remove light
    removeElement("light", e.pointerId);
  });

  // Create size and position of flame
  function updateSizeAndPos(event, flame, ratio) {
    // set width of flame light
    flame.style.width = `${event.width * ratio}px`;
    flame.style.height = `${event.height * ratio}px`;
    // set postion of flame
    flame.style.left = `${event.pageX}px`;
    flame.style.top = `${event.pageY}px`;
  }

  function createElement(type, event) {
    const element = document.createElement("div");
    element.classList.add(`${type}`);
    element.id = `${type}${event.pointerId}`;
    updateSizeAndPos(event, element, 2.5);
    document.body.append(element);
  }

  function removeElement(type, pointerId) {
    if (type === "flame" || type === "light") {
      // find the HTML element that is the "object" of the current event:
      const element = document.getElementById(`${type}${pointerId}`);
      if (element == null) return;
      element.remove();
    }
  }
  loop();
}

setup(); // Always remember to call setup()!

// Possible improvements : make ratio randomized
