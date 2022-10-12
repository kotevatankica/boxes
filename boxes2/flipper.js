import "./style.css";
let $flipperGrid = document.getElementById("flipper");
let size;
let $form_selector = document.querySelector('[name="form"]');
let $tiles = document.querySelectorAll(".tile");



const makeGrid = (size,form = "") => {
    let local_tile_form = "";

    switch (form) {
      case "circle":
        local_tile_form = form;
        break;
      case "rounded":
        local_tile_form = form;
        break;
      default:
        local_tile_form = "";
        break;
    }
  let one_tile = `<div class="tile ${local_tile_form}"></div>`;
  let rendered_tile = ``;
  for (let index = 0; index < size; index++) {
    rendered_tile += one_tile;
  }
  let one_row_string = `<div class="row">${rendered_tile}</div>`;
  let final_string = ``;
  for (let index = 0; index < size; index++) {
    final_string += one_row_string;
  }
  console.log(final_string);
  $flipperGrid.innerHTML = final_string;
};
makeGrid(size);

const changeDifficulty = () => {
  let difficulty = document.querySelector('[name="difficulty"]');

  switch (difficulty.value) {
    case "easy":
      size = 4;
      break;
    case "hard":
      size = 5;
      break;
    case "nightmare":
      size = 6;
      break;
    default:
      size = 4;
      break;
  }
  makeGrid(size);
};
document
  .querySelector('[name="difficulty"]')
  .addEventListener("change", changeDifficulty);
changeDifficulty();


const changeTileForm = (form = "circle") => {
    // console.log(`%c u boja`, "background:black;color:red");
    if (form === "circle") {
      Array.from($tiles).forEach((tile) => {
        tile.classList.add("circle");
        tile.classList.remove("rounded");
      });
    } else if (form === "square") {
      Array.from($tiles).forEach((tile) => {
        tile.classList.remove("circle");
        tile.classList.remove("rounded");
      });
    } else if (form === "rounded") {
      Array.from($tiles).forEach((tile) => {
        tile.classList.add("rounded");
        tile.classList.remove("circle");
      });
    } else {
      Array.from($tiles).forEach((tile) => {
        tile.classList.remove("rounded");
      });
    }
  };
  changeTileForm($form_selector.value);

  $form_selector.addEventListener("change", (event) => {
    let form = event.target.value;
    changeTileForm(form);
  });
