import "./style.css";
let $grid = document.getElementById("wrapper");
let row = +document.querySelector('[name="rows"]').value;
let tile = +document.querySelector('[name="columns"]').value;
let $tiles = document.querySelectorAll(".tile");
let $form_selector = document.querySelector('[name="tile-form"]');
let interval;
let disableClick = false;



const drawGrid = ($grid, row, tile, tile_form = "") => {
  let local_tile_form = "";

  switch (tile_form) {
    case "circle":
      local_tile_form = tile_form;
      break;
    case "rounded":
      local_tile_form = tile_form;
      break;
    default:
      local_tile_form = "";
      break;
  }

  let one_tile = `<div class="tile ${local_tile_form}"></div>`;
  let rendered_tile = ``;
  for (let index = 0; index < tile; index++) {
    rendered_tile += one_tile;
  }
  let one_row_string = `<div class="row">${rendered_tile}</div>`;
  let final_string = ``;
  for (let index = 0; index < row; index++) {
    final_string += one_row_string;
  }
  $grid.innerHTML = final_string;

  $tiles = document.querySelectorAll(".tile");
};
drawGrid($grid, row, tile, document.querySelector('[name="tile-form"]').value);

const selectedTiles = [];

$grid.addEventListener("click", (event) => {
  if (disableClick) return;
  if (event.target.classList.contains("tile"))
    event.target.classList.add("selected");
  else console.log("it's not a tile");

  if (event.target.classList.contains("selected"))
    selectedTiles.push(event.target);

  let form_direction = document.querySelector('[name="direction"]').value;

  let delay = 500;

  let new_array = Array.from(selectedTiles);

  if (selectedTiles.length === $tiles.length) {
    disableClick = true;
    if (form_direction === "filo") {
      new_array.reverse();
    }

    for (let index = 0; index < new_array.length; index++) {
      const tile = new_array[index];
      delay = delay + 500;
      setTimeout(() => {
        if (form_direction == "filo") selectedTiles.shift();
        else selectedTiles.pop();

        if (selectedTiles.length === 0) {
          disableClick = false;
        }
        tile.classList.remove("selected");
      }, delay);
    }
  }
});

$form_selector.addEventListener("change", (event) => {
  let form_type = event.target.value;
  changeTileForm(form_type);
});

document.querySelector("#rows").addEventListener("keyup", (event) => {
  if (event.keyCode === 13) happensOnDimesionChange();
});

document.querySelector("#columns").addEventListener("keyup", (event) => {
  if (event.keyCode === 13) happensOnDimesionChange();
});

const happensOnDimesionChange = () => {
  let rows = +document.querySelector("#rows").value;
  let columns = +document.querySelector("#columns").value;
  rows = rows > 0 ? rows : 1;
  columns = columns > 0 ? columns : 1;
  rows = Math.min(rows, 20);
  columns = Math.min(columns, 8);
  document.querySelector("#rows").value = rows;
  document.querySelector("#columns").value = columns;
  drawGrid(
    $grid,
    rows,
    columns,
    document.querySelector('[name="tile-form"]').value
  );

  //TODO: message from lazayvlad -> after you draw the grid you need to clean the selectedTiles
};
const unload = (selectedTiles, direction, delay) => {
  if (direction === "fifo") {
    if (interval && selectedTiles.length === 0) {
      clearInterval(interval);
    }
    interval = setInterval(() => {
      const element = selectedTiles.shift();

      if (element) {
        element.classList.remove("selected");
      } else {
        disableClick = false;
        return;
      }

      showNotify(
        `We still have ${selectedTiles.length} items left...`,
        "success",
        2000
      );

      if (selectedTiles.length === 0) {
        clearInterval(interval);
        disableClick = false;
      }
    }, delay);
  }

  if (direction === "filo") {
    if (interval && selectedTiles.length === 0) {
      clearInterval(interval);
    }

    interval = setInterval(() => {
      const element = selectedTiles.pop();
      if (element) {
        element.classList.remove("selected");
      } else {
        disableClick = false;
        return;
      }
      showNotify(
        `We still have ${selectedTiles.length} items left...`,
        "success",
        2000
      );

      if (selectedTiles.length === 0) {
        clearInterval(interval);
        disableClick = false;
      }
    }, delay);
  }
};

const unloadWrap = () => {
  disableClick = true;
  let direction = document.querySelector('[name="direction"]').value;
  let delay = document.querySelector('[name="delay"]').value;
  unload(selectedTiles, direction, delay);
};

document.getElementById("unload").addEventListener("click", (event) => {
  if (interval && selectedTiles.length > 0) {
    console.log("proba");
    showNotify(`Stil bussy unloading ... `, "failed", 2000);
    if (selectedTiles.length === 0) {
      clearInterval(interval);
    }
    if (!disableClick) {
      clearInterval(interval);
      unloadWrap();
    }
    return;
  }
  if (!disableClick) {
    unloadWrap();
  }
});

let draw = document.getElementById("draw");
draw.addEventListener("click", (event) => {
  happensOnDimesionChange();
  console.log(rows);
  showNotify(
    `Just drew a ${rows.value} x ${columns.value} grid of tiles`,
    "success",
    2000
  );
});

const changeTileForm = (form_type = "circle") => {
  if (form_type === "circle") {
    Array.from($tiles).forEach((tile) => {
      tile.classList.add("circle");
      tile.classList.remove("rounded");
    });
  } else if (form_type === "square") {
    Array.from($tiles).forEach((tile) => {
      tile.classList.remove("circle");
      tile.classList.remove("rounded");
    });
  } else if (form_type === "rounded") {
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

let notify = document.getElementById("notification");

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
