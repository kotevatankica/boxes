class Flipper {
  constructor(flipper_grid, options = {}) {
    this.flipperGrid = flipper_grid;
    this.difficulty = options.difficulty ?? "easy";
    this.tile_form = options.tile_form ?? "circle";
    this.size = options.size ?? 4;
    this.tileform = document.querySelector('[name="form"]');
    this.count = 0;
    this.movesSelector = document.getElementById("moves");
    this.winner = document.getElementById("fliper-results");
    this.disableClick = false;
    this.restart = document.querySelector('[name="restart"]');
    this.position = "";
    this.selectedTiles = [];
    this.playerNameBtn = document.getElementById("set-player-name");
    this.player = document.getElementById("player-name");
    this.confirmBtn = document.getElementById("confirmBtn");
    this.dialog = document.getElementById("name-dialog");
    this.cancelBtn = document.getElementById("cancelBtn");
    this.outputBox = document.querySelector("output");
    this.makeGrid();
    this.restartBtn();
    this.changeTile();
    this.changeDifficulty(this.difficulty);
    this.activateTileClick();
    this.modelButton();
    this.playerNameButton();
    this.cancelButton();
    this.dialogButton();
  }

  changeTileForm = () => {
    if (this.tile_form === "circle") {
      Array.from(document.querySelectorAll(".tile2")).forEach((e) => {
        e.classList.add("circle");
        e.classList.remove("rounded");
      });
    } else if (this.tile_form === "square") {
      Array.from(document.querySelectorAll(".tile2")).forEach((e) => {
        e.classList.remove("circle");
        e.classList.remove("rounded");
      });
    } else if (this.tile_form === "rounded") {
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
  flip = (el) => {
    if (el.classList.contains("selected")) el.classList.remove("selected");
    else el.classList.add("selected");
  };
  randomTiles = () => {
    let randomNum = Math.floor(Math.random() * 10 + 8);
    for (let i = 0; i < randomNum; i++) {
      let randomCol = Math.floor(Math.random() * this.size);
      let randomRow = Math.floor(Math.random() * this.size);
      let el = document.querySelector(
        '[data-position="' + randomRow + "," + randomCol + '"]'
      );

      this.findNeighbours(`${randomRow},${randomCol}`);
      this.flip(el);
    }
  };
  makeGrid = (size) => {
    let self = this;
    if (size) {
      this.size = size;
    }
    this.flipperGrid.innerHTML = "";

    let local_tile_form = "";
    switch (this.tile_form) {
      case "circle":
        local_tile_form = this.tile_form;
        break;
      case "square":
        local_tile_form = this.tile_form;
        break;
      case "rounded":
        local_tile_form = this.tile_form;
        break;
      default:
        local_tile_form = "";
        break;
    }
    for (let index = 0; index < this.size; index++) {
      let one_row_string = document.createElement("div");
      one_row_string.classList.add("row");
      one_row_string.setAttribute("data-position", index);
      for (let index2 = 0; index2 < this.size; index2++) {
        let one_tile = document.createElement("div");
        one_tile.classList.add("tile2");
        one_tile.setAttribute("data-position", index + "," + index2);
        one_row_string.append(one_tile);
      }
      this.flipperGrid.append(one_row_string);
    }

    this.changeTileForm();
    this.count = 0;
    this.movesSelector.innerHTML = this.count;
    setTimeout(function () {
      self.randomTiles();
    }, 1);
  };
  activateTileClick = () => {
    this.flipperGrid.addEventListener("click", (event) => {
      if (this.disableClick) return;
      if (event.target.classList.contains("tile2")) {
        this.position = event.target.getAttribute("data-position");
        this.selectedTiles.push(event.target);
        this.count = this.count + 1;
        this.movesSelector.innerHTML = this.count;
        this.flip(event.target);
        this.findNeighbours(this.position);
      } else console.log("it's not a tile");

      if (this.flipperGrid.querySelectorAll(".tile2.selected").length === 0) {
        this.winner.classList.add("shown");
        this.disableClick = true;
      }
    });
  };

  findNeighbours = (position) => {
    this.position = position.split(",");
    let all_candidates = [];
    let up_down = parseInt(this.position[0]);
    let left_right = parseInt(this.position[1]);
    var prethodernRed = up_down - 1;
    var sledenRed = up_down + 1;

    if (prethodernRed >= 0 && prethodernRed <= this.size - 1) {
      all_candidates.push([prethodernRed, left_right]);
    }
    if (sledenRed >= 0 && sledenRed <= this.size - 1) {
      all_candidates.push([sledenRed, left_right]);
    }
    var prethodnaCol = left_right - 1;
    var slednaCol = left_right + 1;

    if (prethodnaCol >= 0 && prethodnaCol <= this.size - 1) {
      all_candidates.push([up_down, prethodnaCol]);
    }
    if (slednaCol >= 0 && slednaCol <= this.size - 1) {
      all_candidates.push([up_down, slednaCol]);
    }
    for (let i = 0; i < all_candidates.length; i++) {
      let arr = all_candidates[i];
      var dataPos = all_candidates[i].join(",");
      let el = document.querySelector('[data-position="' + dataPos + '"]');

      this.flip(el);
    }
    return all_candidates;
  };

  changeDifficulty = (difficulty) => {
    this.difficulty = difficulty;
    switch (this.difficulty) {
      case "easy":
        this.size = 4;
        break;
      case "hard":
        this.size = 5;
        break;
      case "nightmare":
        this.size = 6;
        break;
      default:
        this.size = 4;
        break;
    }

    this.makeGrid();
  };

  restartGame = (event) => {
    this.winner.classList.remove("shown");
    this.disableClick = false;
    this.count = 0;
    this.movesSelector.innerHTML = this.count;
    this.randomTiles(event);
  };

  restartBtn = () => {
    this.restart.addEventListener("click", (event) => {
      this.restartGame(event);
    });
  };

  changeTile = () => {
    this.tileform.addEventListener("change", (event) => {
      this.tile_form = event.target.value;
      this.changeTileForm(this.tile_form);
    });
  };

  modelButton = () => {
    this.playerNameBtn.addEventListener("click", () => {
      if (typeof this.dialog.showModal === "function") {
        this.dialog.showModal();
      } else {
        outputBox.value =
          "Sorry, the <dialog> API is not supported by this browser.";
      }
    });
  };

  playerNameButton = () => {
    this.player.addEventListener("change", (e) => {
      this.confirmBtn.value = e.target.value;
    });
  };

  cancelButton = () => {
    this.cancelBtn.addEventListener("click", (e) => {
      this.player.value = "";
      e.target.value = `${this.dialog.returnValue}`;
    });
  };

  dialogButton = () => {
    this.dialog.addEventListener("close", (e) => {
      if (this.cancelBtn.value == `${this.dialog.returnValue}`) {
        this.outputBox.value = `cancelled. Player name is still ${this.dialog.returnValue}`;
      } else {
        this.outputBox.value = `${this.dialog.returnValue} was set as a player`;
      }
    });
  };
}

export default Flipper;
