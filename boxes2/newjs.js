import Flipper from "./flip.js";

let difficulty = document.querySelector('[name="difficulty"]');

let flipper = new Flipper(document.querySelector("#flipper"), {
  difficulty: "easy",
  tile_form: "circle",
});

difficulty.addEventListener("change", (event) => {
  flipper.changeDifficulty(event.target.value);
  flipper.restartGame();
});

let restart = document.querySelector('[name="restart"]');

restart.onclick = function () {
  restart.dispatchEvent(
    new CustomEvent("custom-event-alert", {
      bubbles: true,
      detail: { text: "Game will be restarted :)" },
    })
  );
};

document.addEventListener("custom-event-alert", (e) => {
  alert(e.detail.text);
});

let select = document.querySelector('[name="form"]');

select.addEventListener("change", (e) => {
  alert(`Tile form will be changed to ` + select.value);
});

function triggerChange(element) {
  let changeEvent = new Event("change");
  element.dispatchEvent(changeEvent);
}
