import "./style.css";
let $flipperGrid = document.getElementById("flipper");
let $form_selector = document.querySelector('[name="form"]');
let dialog = document.getElementById("name-dialog");
let outputBox = document.querySelector("output");
let playerNameBtn = document.getElementById("set-player-name");
let playerName = document.getElementById("player-name");
let confirmBtn = document.getElementById("confirmBtn");
let cancelBtn = document.getElementById("cancelBtn");
let winner = document.getElementById("fliper-results");
let size;
var position = "";
let count = 0;
const selectedTiles = [];
let disableClick = false;

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
const flip = (el) => {
  if (el.classList.contains("selected")) el.classList.remove("selected");
  else el.classList.add("selected");
};
const randomTiles = () => {
  let randomNum = Math.floor(Math.random() * 10 + 4);
  for (let i = 0; i < randomNum; i++) {
    let randomCol = Math.floor(Math.random() * size);
    let randomRow = Math.floor(Math.random() * size);
    let el = document.querySelector(
      '[data-position="' + randomRow + "," + randomCol + '"]'
    );

    findNeighbours(`${randomRow},${randomCol}`);
    flip(el);
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
  count = 0;
  document.getElementById("moves").innerHTML = count;
  setTimeout(function () {
    randomTiles();
  }, 1);
};
makeGrid(size, document.querySelector('[name="form"]').value);

document
  .querySelector('[name="restart"]')
  .addEventListener("click", (event) => {
    winner.classList.remove("shown");
    disableClick = false;
    count = 0;
    document.getElementById("moves").innerHTML = count;
    makeGrid(size, document.querySelector('[name="form"]').value);
    randomTiles(event);
  });

const findNeighbours = (position) => {
  position = position.split(",");
  let all_candidates = [];
  let up_down = parseInt(position[0]);
  let left_right = parseInt(position[1]);
  var prethodernRed = up_down - 1;
  var sledenRed = up_down + 1;

  if (prethodernRed >= 0 && prethodernRed <= size - 1) {
    all_candidates.push([prethodernRed, left_right]);
  }
  if (sledenRed >= 0 && sledenRed <= size - 1) {
    all_candidates.push([sledenRed, left_right]);
  }
  var prethodnaCol = left_right - 1;
  var slednaCol = left_right + 1;

  if (prethodnaCol >= 0 && prethodnaCol <= size - 1) {
    all_candidates.push([up_down, prethodnaCol]);
  }
  if (slednaCol >= 0 && slednaCol <= size - 1) {
    all_candidates.push([up_down, slednaCol]);
  }
  // console.log(all_candidates);
  for (let i = 0; i < all_candidates.length; i++) {
    let arr = all_candidates[i];

    // console.log(i,arr);
    var dataPos = all_candidates[i].join(",");
    let el = document.querySelector('[data-position="' + dataPos + '"]');
    // console.log(el);
    // console.log(i,all_candidates)

    flip(el);
  }
  return all_candidates;
};




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

$flipperGrid.addEventListener("click", (event) => {
  if (disableClick) return;
  if (event.target.classList.contains("tile2")) {
    position = event.target.getAttribute("data-position");
    selectedTiles.push(event.target);
    count = count + 1;
    // console.log(selectedTiles)
    document.getElementById("moves").innerHTML = count;
    flip(event.target);
    findNeighbours(position);
  } else console.log("it's not a tile");

  if ($flipperGrid.querySelectorAll(".tile2.selected").length === 0) {
    winner.classList.add("shown");
    disableClick = true;
  }
});

playerNameBtn.addEventListener("click", () => {
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    outputBox.value =
      "Sorry, the <dialog> API is not supported by this browser.";
  }
});

playerName.addEventListener("change", (e) => {
  confirmBtn.value = e.target.value;
});

cancelBtn.addEventListener("click", (e) => {
  playerName.value = "";
  e.target.value = `${dialog.returnValue}`;
});

dialog.addEventListener("close", (e) => {
  if (cancelBtn.value == `${dialog.returnValue}`) {
    outputBox.value = `cancelled. Player name is still ${dialog.returnValue}`;
  } else {
    outputBox.value = `${dialog.returnValue} was set as a player`;
  }
});
