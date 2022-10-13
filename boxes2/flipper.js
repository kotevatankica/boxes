import "./style.css";
let $flipperGrid = document.getElementById("flipper");
let $form_selector = document.querySelector('[name="form"]');
let size;

const makeGrid = (size) =>
{
    let form_type = document.querySelector('[name="form"]').value;
    let local_tile_form = '' ;
    switch(form_type)
    {
      case "circle":
        local_tile_form=form_type;
      break;
      case "square":
        local_tile_form=form_type;
      break;
      case "rounded":
        local_tile_form=form_type;
      break;
      default:
        local_tile_form= "";
      break;
    }
    let one_tile = `<div class="tile2 ${local_tile_form}"></div>`;
    let rendered_tile = ``;
    for (let index = 0; index < size; index++)
    {
      rendered_tile += one_tile;
    }
    let one_row_string = `<div class="row">${rendered_tile}</div>`;
    let final_string = ``;
    for (let index = 0; index < size; index++)
    {
      final_string += one_row_string;
    }
    $flipperGrid.innerHTML = final_string;
  };
  makeGrid(size, document.querySelector('[name="form"]').value);
  
const changeDifficulty = () =>
{
let difficulty = document.querySelector('[name="difficulty"]');

  switch (difficulty.value)
  {
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
  makeGrid(size)
  
};
document.querySelector('[name="difficulty"]').addEventListener('change', changeDifficulty)
changeDifficulty()

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
  changeTileForm($form_selector.value);
  $form_selector.addEventListener("change", (event) => {
    let form_type = event.target.value;
    changeTileForm(form_type.value);
  });

const selectedTiles = [];
$flipperGrid.addEventListener("click", (event) => {

  if (event.target.classList.contains("tile2"))
  {
    selectedTiles.push(event.target);
    if(event.target.classList.contains("selected"))
    {
      event.target.classList.remove("selected");
    }
    else
    {
      event.target.classList.add("selected");
    }
  }
  else console.log("it's not a tile");
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
