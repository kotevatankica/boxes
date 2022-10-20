import Flipper from "./flip.js";

let difficulty = document.querySelector('[name="difficulty"]');

let flipper = new Flipper(document.querySelector("#flipper"), {
  difficulty: "easy",
  tile_form: "circle",
});


difficulty.addEventListener("change", () => {
  flipper.changeDifficulty();
  flipper.restartGame();
});





















let text = document.getElementById("flipper-text");

// document.addEventListener("colorChange", function (e) {
//   text.textContent = e.detail.text;
//   text.style.color = e.detail.textColor;
// });

// function changeText(t, c) {
//   const event = new CustomEvent("colorChange", {
//     detail: {
//       text: t,
//       textColor: c,
//     },
//   });
//   text.dispatchEvent(event);
// }

const form = document.querySelector('form');
const textarea = document.querySelector('textarea');

// Create a new event, allow bubbling, and provide any data you want to pass to the "detail" property
const eventAwesome = new CustomEvent('awesome', {
  bubbles: true,
  detail: { text: () => textarea.value }
});

// The form element listens for the custom "awesome" event and then consoles the output of the passed text() method
form.addEventListener('awesome', (e) => console.log(e.detail.text()));

// As the user types, the textarea inside the form dispatches/triggers the event to fire, and uses itself as the starting point
textarea.addEventListener('input', (e) => e.target.dispatchEvent(eventAwesome));