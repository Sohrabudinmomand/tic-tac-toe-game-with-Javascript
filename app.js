// let used in the variables below because we will bring changes to them later
// pageTitle variable is the main text in the page using it to 
// clear the winner and name of the game
let pageTitle = document.getElementById('pageTitle');

// the restart button used to restart the game
let restartBtn = document.getElementById('restartBtn');

// in here we stored all the clickable boxes in the game 
// all the boxes are HTML elements but here using the Array.from() method we stored all of them 
// as an Array with 9 elements
let boxes = Array.from(document.getElementsByClassName('box'));

// in used this variable to change the color of the three boxes that are going 
// to have the same value so it shows the winner 
// of course i add this future from google :) 
let changeThebgColorOftheWinner = getComputedStyle(document.body).getPropertyValue('--winning-boxes');

// we have two players in this Game
// player1 or O
const playerO = "O";

// player2 or X
const playerX = "X";

// in the varibale below i stored the current player
let currentPlayer = playerX;

// in the varibale below i stored the null strings to make unclickable until a condition
// and make them clickable just once 
let thenineClickableDivBox = Array(9).fill(null);

// the function below is to start the game 
// it will loop through the array we made at the line 12 of this JS file
// after loop on all 9 elements of the array it will make every boxes clickable
const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

// after adding EventListener for each box 
// i used the function below to print X and O after each click
function boxClicked(e) {
    // using this const to get the id of every div box from HTML file
    const id = e.target.id
    // after grabing the id of the div boxes
    // this if statement will check if the box was clicked or not
    // if not clicked then the box content will change to current player value X or O
    // after you click
    if (!thenineClickableDivBox[id]) {
        // if its not clicked 
        thenineClickableDivBox[id] = currentPlayer;
        // the click will chamge the box content to the current player X or O
        e.target.innerText = currentPlayer;

        // in here the if statement will check if the function playerHasWon()
        // if it is not equal to false then it is true
        // then the code block inside the if statement will be executed
        if (playerHasWon() !== false) {
            // it will give the text that current player X  or O is winner
            pageTitle.innerHTML = `${currentPlayer} has won!`;

            // now in here winning_block will change the background color 
            // of the three same content 
            let winning_blocks = playerHasWon();
            winning_blocks.map(box => boxes[box].style.backgroundColor = changeThebgColorOftheWinner);
            return;
        }

        currentPlayer = currentPlayer == playerX ? playerO : playerX;
    }
}

// theas are the winning conditions 
// for example if any player clicked on box num 0, 1, 3 will win
const winnerCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// this function will clear the winner 
function playerHasWon() {
    // this for loop will loop through the array of the winning conditions
    for (const condition of winnerCondition) {
        // and then every click will be stored in a, b c
        let [a, b, c] = condition;

        // now if any value in any index of the array is equl to a = b = c the current player will be 
        // the winner 
        if (thenineClickableDivBox[a] && (thenineClickableDivBox[a] == thenineClickableDivBox[b] && thenineClickableDivBox[a] == thenineClickableDivBox[c])) {
            return [a, b, c];
        }
    }
    return false;
}

// now workiing on restart button
restartBtn.addEventListener('click', restart);

// restart button function
function restart() {
    // using fill method to fill every box of boxes
    // this method will delete any entered value from the box 
    thenineClickableDivBox.fill(null)

    // and this for Each loop will replace the all the content of the boxes with empty strings
    boxes.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor = ''
    })

    pageTitle.innerHTML = 'Tic Tac Toe'

    currentPlayer = playerX;
}

startGame()
