import "./style.css";
let flipperGrid = document.getElementById("flipper-grid");
let row = +document.querySelector('[name="rows"]').value;
let tile = +document.querySelector('[name="columns"]').value;
let $tiles = document.querySelectorAll(".tile");

const grid = ($flipperGrid, row, tile) => {
   
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
    $flipperGrid.innerHTML = final_string;
  
    $tiles = document.querySelectorAll(".tile");
  };
  grid($grid, row, tile);