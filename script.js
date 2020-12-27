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

function moveOutcome() {
    //we first get all the grid divs
    let squares = document.querySelectorAll(".grid div");
    //we check if the checkForHits function returns true
    if (checkForHits(squares)) {
        alert("you hit something");
        popup.style.display = "flex";
        return clearInterval(interval);
    } else {
        moveSnake(squares);
    }
}

//The moveSnake function receives an argument called squares 
//so that we don't have to get the .grid div again in this function
function moveSnake(squares) {
    //The first thing we need to do is remove the last element 
    //of the currentSnake array via pop
    //(this is the tail and the first element is always the head)
    let tail = currentSnake.pop()
    squares[tail].classList.remove("snake")
    currentSnake.unshift(currentSnake[0] + direction)
    // movement ends here  
    eatApple(squares, tail)
    squares[currentSnake[0]].classList.add("snake")
}
/*Let's assume that our snake just started moving and is facing to 
the right (that is, direction = 1). That direction will be added to 
the currentSnake's head and the sum will be pushed as the new snakeHead.

For example, if the snake was in position [2,1,0], we remove the last 
element leaving it at position [2,1]. Then we take the head which is 2 
and add the direction which is 1 and make this value the new value [3,2,1] 
which moves our snake a step forward to the right after one second.
*/

// Depending on the condition defined, it could either return 
//true (meaning we hit something) or false
function checkForHits(squares) {
    if (
        // currentSnake [0] (the head of the snake) + width (10) is 
        // equal to the total area of the width (that is, width*width = 100) and 
        // the direction is equal to the width.
        //currentSnake [0] the head of the snake
        (currentSnake[0] + width >= (width * width) && direction === width) ||
        (currentSnake[0] % width === width - 1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width <= 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains("snake")
    ) {
        return true;
    } else {
        return false;
    }
}

// The eatApple function is called from 
// the moveSnake function every time the snake moves a step.
// It receives two argument squares, .grid div and tail (basically 
//     the value that was popped up from the snake in moveOutcome). 
//     It then checks if the next position our snake moves to contains an apple.
function eatApple(squares, tail) {
    if (squares[currentSnake[0]].classList.contains("apple")) {
        squares[currentSnake[0]].classList.remove("apple");
        squares[tail].classList.add("snake");
        currentSnake.push(tail);
        randomApple(squares);
        score++;
        scoreDisplay.textContent = score;
        clearInterval(interval);
        intervalTime = intervalTime * speed;
        interval = setInterval(moveOutcome, intervalTime);
    }
}

