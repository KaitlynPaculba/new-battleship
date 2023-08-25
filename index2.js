var rs = require("readline-sync");

//let blank = `|_`; let ship = `|#`; let hit = `|X`; let miss = `|O`;
let shipCount = 5;
const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const propGrid = [];
let size = 10;
let max = 10;
let randLett;
let randNumb;
let playing = true;
let allCheck = true;
let allCoords = [];
let usedCoords = [];
const shpId = ['Patrol Boat', 'Submarine', 'Destroyer', 'Battleship', 'Carrier'];
const shpUn = [2, 3, 3, 4, 5];
const ships = [];
let totalUnits = 17;
const guessCoords = [];
const hitCoords = []
function gameLoop() {
  function plGameSet() {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        id = letters[i] + nums[j];
          propGrid.push(id);
      }
    }
  }
  plGameSet();

  function shipYard() {
    for (let a = 0; a < shipCount; a++) {
      let newShip = { coords: [], id: shpId[a], units: shpUn[a] };
      ships.push(newShip);
    }
  }
  shipYard();
  console.log(propGrid);
  let start = rs.question("Press any key to start game");
  
  function randNum(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  function vertOrNot() {
    for (let i = 0; i < ships.length; i++) {
      let flop = randNum(max);
      if (flop > 5) {
        vertical(i);
      } else {
        horizontal(i);
      }
    }
  }

  function horizontal(i) {
    randLett = letters[randNum(max)];
    randNumb = nums[randNum(max - ships[i].units)];
    selectId = `${randLett}${randNumb}`;
    for (let k = 0; k < propGrid.length; k++) {
      if (propGrid[k] === selectId) {
        for (let j = 0; j < ships[i].units; j++) {
          selectId = propGrid[k + j];
          allCoords.push(selectId);
          selectId = '';
        }
      }
    }
  }

  function vertical(i) {
    randNumb = nums[randNum(max)];
    randLett = letters[randNum(max - ships[i].units)];
    selectId = `${randLett}${randNumb}`;
    for (let k = 0; k < propGrid.length; k++) {
      if (propGrid[k] === selectId) {
        for (let j = 0; j < ships[i].units; j++) {
          if (j === 0) {
            x = j;
          } else { x = j * 10 };
          selectId = propGrid[x + k];
          allCoords.push(selectId);
          selectId = '';
        }
      }
    }
  }
  function setGameComp() {
    vertOrNot()
    checkCoords()
  }
  setGameComp()
  
  function checkCoords() {
    count = 0;
    for (let a = 0; a < allCoords.length; a++) {
      for (let b = 0; b < allCoords.length; b++) {
        if (allCoords[a] === allCoords[b]) {
          count += 1;
          console.log(allCoords);
          
          console.log(`count ${count}`);
          
        }  
      } 
    }
    if (count > 17) {
      allCheck === false;
      allCoords.length = 0;
      setGameComp();
      } else
    if (count === 17) {
      totalUnits = 0;
      console.log('allCoords');
      console.log(allCoords)
      for (let d = 0; d < ships.length; d++) {
        for (let c = 0; c < ships[d].units; c++) {
          ships[d].coords.push(allCoords[totalUnits]);
          usedCoords.push(allCoords[totalUnits]);
          totalUnits++;
        }
      }
    }
  }

  if (allCheck) {
    while (shipCount > 0) {
      console.log(ships);
      function playerFunc() {
        let attackPrompt = rs.question("Enter a location to strike. ie A2 ");
          if (guessCoords.includes(attackPrompt.toUpperCase()) === false && allCoords.includes(attackPrompt.toUpperCase()) === false) {
            console.log('Miss!');
            guessCoords.push(attackPrompt.toUpperCase());
          } if (guessCoords.includes(attackPrompt.toUpperCase()) && hitCoords.includes(attackPrompt.toUpperCase())) {
            console.log(`${attackPrompt.toUpperCase()} has already been hit.`)
          }
          ships.forEach((shp) => {
            if (shp.coords.includes(attackPrompt.toUpperCase()) && guessCoords.includes(attackPrompt.toUpperCase()) === false) {
              console.log('Hit');
              guessCoords.push(attackPrompt.toUpperCase());
              hitCoords.push(attackPrompt.toUpperCase())
              shp.units--
              if (shp.coords.includes(attackPrompt.toUpperCase()) && shp.units === 0) {
                console.log(`You have sunk a ship! ${shipCount - 1} ships remain.`);
                guessCoords.push(attackPrompt.toUpperCase());
                hitCoords.push(attackPrompt.toUpperCase())
                shipCount--
              }
            }
          });
          
        }
      playerFunc()
    }
  }
  
}
  for (let i = 0; i < 1; i++) {
    gameLoop();
  }
  while (playing && shipCount === 0) {
    let playAgain = rs.keyInYN(
      "You have destroyed all battleships. Would you like to play again? "
    );
    if (!playAgain) {
      playing = false;
      console.log("game ended");
    } else {
      playing = true;
      shipCount = 5;
      guessCoords.length = 0;
      usedCoords.length = 0;
      allCoords.length = 0;
      propGrid.length = 0;
      ships.length = 0;
      gameLoop();
    }
  }




