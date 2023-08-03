var rs = require('readline-sync');

let blank = '|_';
let ship = '|#';
let hit = '|X';
let miss = '|O';
enShipCount = 2;
enLives = 2;
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const propGrid = [];
let size = 3;
let max = 3;
let selectId;
let ENRandLett;
let ENRandNum;
let playing = true;  



function gameLoop() {
  function plGameSet() {
    for (let i = 1; i < size + 1; i++) {
      for (let j = 0; j < size; j++) {
        let newRow = ({ id: letters[i - 1] + nums[j], mark: blank, placed: Boolean(false) });
        propGrid.push(newRow);
      }; 
    };
  };
  plGameSet();
  console.log(propGrid)
  let start = rs.question('Press any key to start game');
  function randNum(max) {
  return Math.floor(Math.random() * Math.floor(max));
  };
  function EnRandPick() {
  ENRandLett = letters[randNum(max)];
  ENRandNum = nums[randNum(max)];
  selectId = `${ENRandLett}${ENRandNum}`;
  }
  while (enShipCount > 0) {
    EnRandPick();
    function ChangeENBoard() {
      propGrid.map((obj) => {
      if (obj.id === selectId.toString() && obj.placed === Boolean(false)) {
        obj.placed = Boolean(true);
        obj.mark === ship;
      }}) 
    };
  ChangeENBoard();
  console.log(selectId);
  enShipCount--;
  selectId = '';
  }
  while (enLives > 0) {
  function playerFunc() {
    let attackPrompt = rs.question('Enter a location to strike. ie A2 ');
      propGrid.map((obj) => {
        if (obj.id === attackPrompt.toUpperCase()) {
          if (obj.mark === hit) {
            console.log(`Miss! You have already hit ${attackPrompt}`);  
          } else
            if (obj.mark === miss) {
              console.log(`Miss! You have already hit ${attackPrompt}`);
            };
        }   
    if (obj.id === attackPrompt.toUpperCase() && obj.mark !== hit && obj.placed === Boolean(true)) {
      obj.mark = hit;
      if (enLives > 1) {
       console.log('Hit! You have sunk a battleship. 1 Ship remaining'); 
      }
      enLives--;
    }
      if (obj.id === attackPrompt.toUpperCase() && obj.mark === blank && obj.placed === Boolean(false)) {
      obj.mark = miss;
        console.log('Miss!');
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
  let playAgain = rs.keyInYN('You have destroyed all battleships. Would you like to play again? ')
  if (!playAgain) {
     playing = false;
    console.log('game ended');
  } else {
    playing = true;
    enLives = 2;
    enShipCount = 2;
    propGrid.length = 0;
    gameLoop();
  }
}



  

 




  