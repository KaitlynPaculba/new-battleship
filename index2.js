var rs = require("readline-sync");

const legend = [
  { id: "blank", marks: "|_" },
  { id: "ship", marks: "|#" },
  { id: "hit", marks: "|X" },
  { id: "miss", marks: "|O" },
];
enShipCount = 5;
let enLives = 5;
const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const propGrid = [];
let size = 10;
let max = 10;
let ENRandNum;
let ENRandLett;
let randLett;
let randNumb;
let playing = true;
let i;
let shipId;
const ships = [
  { id: "ship-1", units: 2 },
  { id: "ship-2", units: 3 },
  { id: "ship-3", units: 3 },
  { id: "ship-4", units: 4 },
  { id: "ship-5", units: 5 },
];

// 1. Decide vertical or horizontal
// 2. add length to the ship start;

function gameLoop() {
  function plGameSet() {
    for (let i = 1; i < size + 1; i++) {
      for (let j = 0; j < size; j++) {
        let newRow = {
          id: letters[i - 1] + nums[j],
          mark: legend[0].marks,
          placed: Boolean(false),
          shipId: "",
        };
        propGrid.push(newRow);
      }
    }
  }
  plGameSet();
  console.log(propGrid);
  let start = rs.question("Press any key to start game");
  function randNum(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  function vertOrNot() {
    for (let i = 0; i < ships.length; i++) {
      let flop = randNum(max);
      if (flop > 5) {
        console.log("vertical");
        randNumb = nums[randNum(max)];
        for (let j = 0; j < ships[i].units; j++) {
          randLett = letters[randNum(max - ships[i].units) + 1];
          selectId = `${randLett}${randNumb}`;
          console.log(selectId);
          ChangeENBoard(i);
        }
      } else console.log("horizontal");
      randLett = letters[randNum(max)];
      for (let j = 0; j < ships[i].units; j++) {
        randNumb = nums[randNum(max - ships[i].units) + 1];
        selectId = `${randLett}${randNumb}`;
        console.log(selectId);
        ChangeENBoard(i);
      }
      enShipCount--;
    }
  }
  
  while (enShipCount > 0) {
    vertOrNot();
    ChangeENBoard();
    selectId = "";
  }
  function ChangeENBoard(i) {
    propGrid.map((obj) => {
      if (obj.id === selectId.toString() && obj.placed === Boolean(false)) {
        obj.placed = Boolean(true);
        obj.mark === legend[1].marks;
        obj.shipId === ships[i].id;
      }
    });
  }

  while (enLives > 0) {
    function playerFunc() {
      let attackPrompt = rs.question("Enter a location to strike. ie A2 ");
      propGrid.map((obj) => {
        if (obj.id === attackPrompt.toUpperCase()) {
          if (obj.mark === legend[2].marks) {
            console.log(`Miss! You have already hit ${attackPrompt}`);
          } else if (obj.mark === legend[3].marks) {
            console.log(`Miss! You have already hit ${attackPrompt}`);
          }
        }
        if (
          obj.id === attackPrompt.toUpperCase() &&
          obj.mark !== legend[2].marks &&
          obj.placed === Boolean(true)
        ) {
          obj.mark = legend[2].marks;
          if (enLives === 2) {
            console.log("Hit! You have sunk a battleship. 1 Ship remaining");
          } else {
            console.log("Hit!");
          }
          enLives--;
        }
        if (
          obj.id === attackPrompt.toUpperCase() &&
          obj.mark === legend[0].marks &&
          obj.placed === Boolean(false)
        ) {
          obj.mark = legend[3].marks;
          console.log("Miss!");
        }
      });
    }
    playerFunc();
  }
}
  for (let i = 0; i < 1; i++) {
    gameLoop();
  }
  while (playing) {
    let playAgain = rs.keyInYN(
      "You have destroyed all battleships. Would you like to play again? "
    );
    if (!playAgain) {
      playing = false;
      console.log("game ended");
    } else {
      playing = true;
      enLives = 2;
      enShipCount = 2;
      propGrid.length = 0;
      gameLoop();
    }
  }
