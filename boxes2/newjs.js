import Flipper from "./flip.js";

let $difficulty = document.querySelector('[name="difficulty"]');
let $tile_form = document.querySelector('[name="form"]');
let difficulty = $difficulty.value;
let tile_form = $tile_form.value;
let notify = document.getElementById("notification");

let flipper = new Flipper(document.querySelector("#flipper"), {
  // difficulty: "hard",
  // tile_form: "rounded",
  difficulty: difficulty,
  tile_form: tile_form,
});

$difficulty.addEventListener("change", (event) => {
  flipper.changeDifficulty(event.target.value);
  flipper.restartGame();
});

const showNotify = (text, type = "success", delay = 2000) => {
  notify.innerHTML = `<div class= "msg ${type}">${text}</div>`;
  notify.classList.add("show");
  setTimeout(() => {
    hideNotify("");
  }, delay);
};
const hideNotify = (text) => {
  console.log(notify);
  notify.innerHTML = `<div class= "msg">${text}</div>`;
  notify.classList.remove("show");
};

document.addEventListener("custom-restart-alert", (e) => {
  showNotify(e.detail.text, "success", 2000);
});

document.addEventListener("custom-tile-alert", (e) => {
  showNotify(e.detail.text, "success", 2000);
});

document.addEventListener("custom-grid-alert", (e) => {
  showNotify(e.detail.text, "success", 2000);
});
