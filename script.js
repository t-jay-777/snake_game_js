//document.querySelector(".className")
//select first element by className
let grid = document.querySelector(".grid");
let popup = document.querySelector(".popup");
let playAgain = document.querySelector(".playAgain");
let scoreDisplay = document.querySelector(".scoreDisplay");
let left = document.querySelector(".left");
let bottom = document.querySelector(".bottom");
let right = document.querySelector(".right");
let up = document.querySelector(".top");
let widt = 10;
let currentIndex = 0;
let appleIndex = 0;
let currentSnake = [2, 1, 0];
let direction = 1;
let score = 0;
let speed = 0.8;
let intervalTime = 0;
let interval = 0;

//this event will start immediately once the HTML content is loaded on our screen
document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("keyup", control);
    createBoard();
    startGame();
    playAgain.addEventListener("click", replay);
});

//create a game board
function createBoard() {
    popup.style.display = "none";
    for (let i = 0; i < 100; i++) {
        let div = document.createElement("div");
        grid.appendChild(div);
    }
}

//The startGame function first gets all the divs (since we are creating the 
//divs at runtime, we can not get them at the top of the code).
function startGame() {
    let squares = document.querySelectorAll(".grid div");
    //select a spot for our apple
    randomApple(squares);
    //random apple
    //The direction refers to where the 
    //snake is headed – 1 for right, -1 for left, and so on
    direction = 1;
    scoreDisplay.innerHTML = score;
    //intervalTime sets the time it takes for the snake to move around
    intervalTime = 1000;
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    //To display our snake on the screen, we will loop over currentSnake with forEach
    currentSnake.forEach((index) => squares[index].classList.add("snake"));
    //we simply append a setInterval call (with function move Outcome and a time of intervalTime, which we set above) to the variable interval.
    //This is so that we can easily call clearInterval on that variable.
    interval = setInterval(moveOutcome, intervalTime);
}
