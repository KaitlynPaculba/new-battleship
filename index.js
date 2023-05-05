var rs = require('readline-sync');

// el in ships is eliminated/ sunk
// grid offset is 3 characters

let playing = true;
let size = 5;
let max = 10;
const grid = [];
const enGrid = [];
//const gridStore = []; let headStr = `  `; let cellStr = ``; let newObj;
let e1; let e2; let e3; let e4; let e5;
let x; let y;
let blank; let hit; let miss; let ship;  let ENBl;
let myLives = 5; let enLives = 5; 
let myShipCount = 5;
const myShips = [
  { sid: 1, l: 2, pl: [], el: false },
  { sid: 2, l: 3, pl: [], el: false },
  { sid: 3, l: 3, pl: [], el: false },
  { sid: 4, l: 4, pl: [], el: false },
  { sid: 5, l: 5, pl: [], el: false },
];
let enShipCount = 5;
const enemyShips = [
  { sid: e1, l: 2, pl: [], el: false },
  { sid: e2, l: 3, pl: [], el: false },
  { sid: e3, l: 3, pl: [], el: false },
  { sid: e4, l: 4, pl: [], el: false },
  { sid: e5, l: 5, pl: [], el: false },
];
const legend = [
  { id: blank, marks: '|_' },
  { id: ship, marks: '|#'},
  { id: hit, marks: '|X' },
  { id: miss, marks: '|O' },
  { id: ENBl, marks: '|_'},
];
//let enemyLocations = {};
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const propGrid = [];
const enPropGrid = [];
const boardBreak = '-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-';

function plGameSet() {
  for (let i = 1; i < letters.length + 1; i++) {
    for (let j = 0; j < letters.length; j++) {
      let newRow = ({ id: letters[i - 1] + nums[j], mark: legend[0].marks, placed: Boolean(false) });
      propGrid.push(newRow);
    }; 
  };
}

function ENGameSet() {
  for (let i = 1; i < letters.length + 1; i++) {
    for (let j = 0; j < letters.length; j++) {
      let newRow = ({ id: letters[i - 1] + nums[j], mark: legend[0].marks, placed: Boolean(false)});
      enPropGrid.push(newRow);
    }; 
  };
}

plGameSet();
ENGameSet();

let start = rs.keyIn('Press any key to begin the game');

function createENGrid() {
  for (let i = 0; i < size; i++) { 
    let result;
   let str = '  |'
   str += nums.join('|');
   enGrid.push(str);
   str = ''; 
    result = enPropGrid.filter((obj) => obj.id.includes(letters[i]))
    str += letters[i] + ' ';
  for (let j = 0; j < size; j++) {
    str += result[j].mark; 
  }
   enGrid.push(str);
    str = '';
  }; 
};

function createPlGrid() {
  let result;
  let str = '  |'
  str += nums.join('|');
  grid.push(str);
  str = '';
   for (let i = 0; i < size; i++) {
      result = propGrid.filter((obj) => obj.id.includes(letters[i]))
      str += letters[i] + ' ';
    for (let j = 0; j < size; j++) {
      str += result[j].mark; 
    }
     grid.push(str);
      str = '';
  }    
}
createPlGrid();
createENGrid();
printGameBoard();

// if (shipVertical.includes('v' || 'V')) {
//   for (let j = myShips.sid; j < myShips)
//   for (let i = myShips.l; i < myShips.l; i++) {
//     propGrid.map((obj) => {
//       if (obj.id === shipStart.toUpperCase()) {
//         obj.mark = legend[1].marks;
//         obj.placed = Boolean(true);
//       }
//     })
//   }
  
// } else if (shipVertical.includes('h' || 'H')) {

// }

// Player Ships
while (myShipCount > 0) {
  //let shipVertical = rs.question('Do you want your ship vertical or horizontal?')
  let shipStart = rs.question('Where do you want your ship to be placed? ex.(a1) '); 
  function ChangePlBoard() {
    grid.length = 0;
    propGrid.map((obj) => {
    if (obj.id === shipStart.toUpperCase()) {
      obj.mark = legend[1].marks;
      obj.placed = Boolean(true);
    }
  }) 
}
  ChangePlBoard();
  myShipCount--;
}

function EnRandPick() {
  let ENRandLett = letters[randNum()];
  let ENRandNum = nums[randNum()];
  selectId = `${ENRandLett}${ENRandNum}`
}

// Enemy Ships
while (enShipCount > 0) {
  EnRandPick();
  function ChangeENBoard() {
    enGrid.length = 0;
    enPropGrid.map((obj) => {
    if (obj.id === selectId && obj.placed === Boolean(false)) {
     obj.placed = Boolean(true);
    }}) 
  };
  ChangeENBoard();
  console.log(selectId)
  enShipCount--;
}

reprintGrids();

// player Attack
while (myLives > 0 && enLives > 0) {
  attackPrompt = rs.question('Enter a location to Strike. ex.(a1) ');
  function EnAttack() {
    grid.length = 0;
    EnFunc() 
  }
  function PlAttack() {
    enGrid.length = 0;  
    playerFunc();
  }
  EnAttack();
  PlAttack();
  reprintGrids();
    
  if (myLives === 0) {
    console.log('You have been defeated');
  } else
    if (enLives === 0) {
    console.log('All enemy ships are sunk! You win!');
    }
  
}

function EnRandPlace() {
  let ENRandLet = letters[randNum()];
  let ENRandNu = nums[randNum()];
  selectPlace = `${ENRandLet}${ENRandNu}`;
  propGrid.map((obj) => {
    if (obj.id === selectPlace && obj.mark === legend[3].marks) {
      selectPlace = '';
      EnRandPlace()
    }
  })
}

function EnFunc() {
  grid.length = 0;
  selectPlace = '';
  EnRandPlace();
    propGrid.map((obj) => {
     if (obj.id === selectPlace) {
        if (obj.mark === legend[1].marks && obj.placed === Boolean(true)) {
          obj.mark = legend[2].marks;
          myLives--;
        } else
          if (obj.mark === legend[0].marks && obj.placed === Boolean(false)) {
            obj.mark = legend[3].marks;
          }
     }
    })
   }
 
function playerFunc() {
  enPropGrid.map((obj) => {
    if (obj.id === attackPrompt) {
          if (obj.mark === legend[2].marks) {
            console.log(`Miss! You have already hit ${attackPrompt}`);  
          } else
            if (obj.mark === legend[3].marks) {
              console.log(`Miss! You have already hit ${attackPrompt}`);
            };
        }   
    if (obj.id === attackPrompt && obj.mark !== legend[2].marks && obj.placed === Boolean(true)) {
      obj.mark = legend[2].marks;
      enLives--;
      console.log('Hit!');
    }
      if (obj.id === attackPrompt && obj.mark === legend[0].marks && obj.placed === Boolean(false)) {
      obj.mark = legend[3].marks;
        console.log('Miss!');
      } 
        
  }); 
}

//Enemy Attack

function randNum() {
  return Math.floor(Math.random() * Math.floor(max));
}; 

function reprintGrids() {
  ChangePlBoard();
  createPlGrid(); 
  ChangeENBoard();
  createENGrid();
  livesLeft()
  printGameBoard();
}; 

function printGameBoard() {
  console.log(enGrid);
  console.log(boardBreak);
  console.log(grid);
} 
function livesLeft() {
  console.log(`Enemy Lives: ${enLives}   My Lives: ${myLives}`);
}
