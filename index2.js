var rs = require("readline-sync");


let blank = `|_`; let ship = `|#`; let hit = `|X`; let miss = `|O`;
enShipCount = 5;
let enLives = 5;
const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const propGrid = [];
let size = 10;
let max = 10;
let randLett;
let randNumb;
let playing = true;
const ships = [
  { coords: [], id: "Patrol Boat", units: 2,  },
  { coords: [], id: "Submarine", units: 3,  },
  { coords: [], id: "Destroyer", units: 3, },
  { coords: [], id: "Battleship", units: 4, },
  { coords: [], id: "Carrier", units: 5, },
];
const sunkShips = [];
function gameLoop() {
  function plGameSet() {
    for (let i = 1; i < size + 1; i++) {
      for (let j = 0; j < size; j++) {
        let newRow = {
          id: letters[i - 1] + nums[j],
          mark: blank
        };
        propGrid.push(newRow);
      }
    }
  }
  plGameSet();
  console.log(propGrid);
  let start = rs.question("Press any key to start game");
  
  while (enShipCount > 0) {
    vertOrNot();
    selectId = '';
  }
  
  function randNum(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  function vertOrNot() {
    for (let i = 0; i < ships.length; i++) {
      let flop = randNum(max);
      if (flop > 5) {
        console.log("vertical");
        vertical(i);
     } else {
        console.log("horizontal");
        horizontal(i);
      }
      enShipCount--;
    }
  }

  function horizontal(i) {
    randLett = letters[randNum(max)];
    randNumb = nums[randNum(max - ships[i].units)];
    selectId = `${randLett}${randNumb}`;
    console.log(selectId);
    for (let k = 0; k < propGrid.length; k++) {
      if (propGrid[k].id === selectId && propGrid[k].mark === blank) {
        for (let j = 0; j < ships[i].units; j++) {
          selectId = propGrid[k + j];
          propGrid.map((obj) => {
            if (obj.id === selectId.id && obj.mark === blank) {
              obj.mark === ship;
              console.log(obj);
            }
          })
          ships[i].coords.push(selectId.id);
          selectId = '';
        }
      }
    }
  }
  
  function vertical(i) {
    randNumb = nums[randNum(max)];
    randLett = letters[randNum(max - ships[i].units)];
    selectId = `${randLett}${randNumb}`;
    console.log(selectId);
    
    for (let k = 0; k < propGrid.length; k++) {
      if (propGrid[k].id === selectId && propGrid[k].mark === blank) {
        for (let j = 0; j < ships[i].units; j++) {
          if (j === 0) {
            x = j;
          } else { x = j * 10 };
          selectId = propGrid[x + k];
          propGrid.map((obj) => {
            if (obj.id === selectId.id && obj.mark === blank) {
              obj.mark === ship;
              console.log(obj);
            }
          })
          ships[i].coords.push(selectId.id);
          selectId = '';
        }
      }
    }
  }
  
  
  let slip = 0;
  while (enLives > 0) {
    console.log(ships);
    function playerFunc() {
      let attackPrompt = rs.question("Enter a location to strike. ie A2 ");
      //for (let a = 0; a < ships.length; a++) {
        ships.map((obj) => {
        if (obj.coords.includes(attackPrompt.toUpperCase())) {
          console.log('Hit!');
          slip = 1;
          } if (obj.coords !== attackPrompt.toUpperCase() && slip === 0) {
            console.log('miss!')
          }
      })  
      //}
      
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

