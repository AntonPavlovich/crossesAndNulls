"use strict";

const table = document.createElement("table");
document.body.append(table);

const winsPar = document.createElement('p');
winsPar.classList.add('winsPar');
document.body.prepend(winsPar);
winsPar.textContent = 'Start your game! (X first)';

const btn = document.createElement('button');
document.body.append(btn);
btn.textContent = 'RESER THE GAME';

btn.addEventListener('click',handler);
function handler(){
  location.reload();
} 

const cellsArr = [];
let count = 0;
let coutnForNoWIn = 0;

function createTable() {
  for (let i = 0; i < 3; i++) {
    const row = document.createElement("tr");
    table.append(row);

    for (let j = 0; j < 3; j++) {
      const cell = document.createElement("td");
      row.append(cell);

      cellsArr.push(cell);
      cell.id = `${i}${j}`;
      cell.addEventListener("click", listener);
    }
  }
}
createTable();

function listener(e) {
  const { target } = e;

  if (count % 2 === 0) {
    target.textContent = "X";
    winsPar.textContent = "Its your move O"
  } else {
    target.textContent = "O";
    winsPar.textContent = "Its your move X"
  }

  count++;
  checkIfWin();
  target.removeEventListener("click", listener);
}


function checkIfWin() {

  const winsCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [6, 4, 2],
  ];

  for (let i = 0; i < winsCombination.length; i++) {
    if (
      cellsArr[winsCombination[i][0]].textContent === "X" &&
      cellsArr[winsCombination[i][1]].textContent === "X" &&
      cellsArr[winsCombination[i][2]].textContent === "X"
    ) {
      setGameOver("X");
    } else if (
      cellsArr[winsCombination[i][0]].textContent === "O" &&
      cellsArr[winsCombination[i][1]].textContent === "O" &&
      cellsArr[winsCombination[i][2]].textContent === "O"
    ) {
      setGameOver('O');
    }
  }

  for(let value of cellsArr){
    value.textContent !== '' 
    ? coutnForNoWIn++ 
    : null;
    if(coutnForNoWIn === 45){
      setGameOver('NOBODY')
    }
   }
  
}

function setGameOver(str) {
  winsPar.textContent = `SOO WINNER IS ${str}`;
  winsPar.style.backgroundColor = 'green'; 
  for(let value of cellsArr){
    value.removeEventListener('click',listener)
  };

  setTimeout(() => {
    winsPar.textContent = 'Push the button below to reset the game!'
  },2500 )
}
