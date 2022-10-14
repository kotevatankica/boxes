import "./style.css";
let $flipperGrid = document.getElementById("flipper");
let $form_selector = document.querySelector('[name="form"]');
let size;
var positiontile = "";

const changeTileForm = () => {
  let form_type = document.querySelector('[name="form"]').value;
  if (form_type === "circle") {
    Array.from(document.querySelectorAll(".tile2")).forEach((e) => {
      e.classList.add("circle");
      e.classList.remove("rounded");
    });
  } else if (form_type === "square") {
    Array.from(document.querySelectorAll(".tile2")).forEach((e) => {
      e.classList.remove("circle");
      e.classList.remove("rounded");
    });
  } else if (form_type === "rounded") {
    Array.from(document.querySelectorAll(".tile2")).forEach((e) => {
      e.classList.add("rounded");
      e.classList.remove("circle");
    });
  } else {
    Array.from(document.querySelectorAll(".tile2")).forEach((e) => {
      e.classList.remove("rounded");
    });
  }
};
const makeGrid = (size) => {
  $flipperGrid.innerHTML = "";

  let form_type = document.querySelector('[name="form"]').value;
  let local_tile_form = "";
  switch (form_type) {
    case "circle":
      local_tile_form = form_type;
      break;
    case "square":
      local_tile_form = form_type;
      break;
    case "rounded":
      local_tile_form = form_type;
      break;
    default:
      local_tile_form = "";
      break;
  }
  for (let index = 0; index < size; index++) {
    let one_row_string = document.createElement("div");
    one_row_string.classList.add("row");
    one_row_string.setAttribute("data-position", index);
    for (let index2 = 0; index2 < size; index2++) {
      let one_tile = document.createElement("div");
      one_tile.classList.add("tile2");
      one_tile.setAttribute("data-position", index + "," + index2);
      one_row_string.append(one_tile);
    }
    $flipperGrid.append(one_row_string);
  }

  changeTileForm($form_selector.value);
};
makeGrid(size, document.querySelector('[name="form"]').value);

// const find = (tile2, position) => {
//   if (position[0] === tile2[0] && position[1] === tile2[1])
//   return position;

//   console.log(position);
// };

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

changeTileForm($form_selector.value);
$form_selector.addEventListener("change", (event) => {
  let form_type = event.target.value;
  changeTileForm(form_type.value);
});

const selectedTiles = [];
$flipperGrid.addEventListener("click", (event) => {
  if (event.target.classList.contains("tile2")) {
    positiontile = event.target.getAttribute("data-position");
    console.log(positiontile);
    selectedTiles.push(event.target);
    if (event.target.classList.contains("selected")) {
      event.target.classList.remove("selected");
    } else {
      event.target.classList.add("selected");
    }
  } else console.log("it's not a tile");
});

// x-closey-tile

// data-
// var sdasdselectedTiles = [
//   [0,1,0,1,0],
//   [0,1,0,1,0],
//   [0,1,0,1,0],
//   [0,1,0,1,0],
//   [0,1,0,1,0],
// ];
