var sol =
   [[0, 7, 0, 2, 3, 8, 0, 0, 0],
    [0, 0, 0, 7, 4, 0, 8, 0, 9],
    [0, 6, 8, 1, 0, 9, 0, 0, 2],
    [0, 3, 5, 4, 0, 0, 0, 0, 8],
    [6, 0, 7, 8, 0, 2, 5, 0, 1],
    [8, 0, 0, 0, 0, 5, 7, 6, 0],
    [2, 0, 0, 6, 0, 3, 1, 9, 0],
    [7, 0, 9, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 9, 7, 4, 0, 8, 0]];


/* printBoard is the only function you need to implement.
  The values of the sudoku puzzle above should be displayed in the table in index.html
  Modify the DOM using JavaScript. Notice each <td> has an id. 
  The value at sol[0][0] should go in <td id="r11">. 
  The value at sol[0][1] should go in <td id="r12"> and so on...
  Loop through the two-dimensional array sol above and place each value in a <td> 
  element.
  */

 
var printBoard = function () {
   for(let i=0; i<9; i++){
    for(let j=0; j<9; j++){
        document.getElementById(`r${i+1}${j+1}`).textContent = parseInt(sol[i][j]);
    }
   } 
};

//Check if value is in the row
var isInRow = function(row, number) {    
    for (var col = 0; col < 9; col++) {
        if (sol[row][col] == number) {
            return true;
        }
    }
    return false;
};

//Check if value is in the column
var isInCol = function(col, number) {    
    for (var row = 0; row < 9; row++) {
        if (sol[row][col] == number) {
            return true;
        }
    }     
    return false;
};

// Check if value is in its 3x3 box
var isInBox = function(row, col, number) {
    r = row - row % 3;
    c = col - col % 3;

    for (i = r; i < r + 3; i++) {
        for (j = c; j < c + 3; j++) {            
            if (sol[i][j] == number) {
                return true;
            }
        }
    }
    return false;
};

var isOk = function(row, col, number) {
    return !isInRow(row,number) && !isInCol(col,number) && !isInBox(row, col, number);
}

var solve = function () {
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
         // we search an empty cell
            if (sol[row][col] == 0) {
           // we try possible numbers
                for (var number = 1; number <= 9; number++) {
                    if (isOk(row, col, number)) {
                    // number ok. it respects sudoku constraints
                        sol[row][col] = number;
                        if (solve()) { // we continue to the next empty cell
                            return true;
                        } else { // if not a solution, we empty the cell and we continue
                            sol[row][col] = 0;
                        }
                    }
                }
                return false; //backtrack and try the next possible number
            }
        }
    }
    printBoard();
    return true;
};

//personal test

var sol1 =
   [[0, 7, 0, 2, 3, 8, 0, 0, 0],
    [0, 0, 0, 7, 4, 0, 8, 0, 9],
    [0, 6, 8, 1, 0, 9, 0, 0, 2],
    [0, 3, 5, 4, 0, 0, 0, 0, 8],
    [6, 0, 7, 8, 0, 2, 5, 0, 1],
    [8, 0, 0, 0, 0, 5, 7, 6, 0],
    [2, 0, 0, 6, 0, 3, 1, 9, 0],
    [7, 0, 9, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 9, 7, 4, 0, 8, 0]];

var printBoard1 = function () {
for(let i=0; i<9; i++){
    for(let j=0; j<9; j++){
        document.getElementById(`r${i+1}${j+1}`).textContent = parseInt(sol1[i][j]);
        }
    } 
};   


//Timer added (no CSS involved yet)
const timerDisplay = document.getElementById("timer");
let seconds = 0;
let minutes = 0;
let hours = 0;
let IDinterval,timeStore = "00:00:00";


function startTimer() {
    IDinterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    seconds++;

    if (seconds === 60) {
        seconds = 0;
        minutes++;

        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
    }

    const formattedTime = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);
    timerDisplay.textContent = formattedTime;
    timeStore = formattedTime;
}

function formatTime(time) {
    return time < 10 ? "0" + time : time;
}

function Stop(){
    clearInterval(IDinterval);
}


const ul = document.getElementById("time");

let start = document.getElementById("start");
let reset = document.getElementById("reset");
let solve1 = document.getElementById("solve1");
let isTimeRunning = false;
start.addEventListener("click",function(){
    if(isTimeRunning === true){
        Stop();
        start.textContent = "Resume";
        reset.disabled = false;
        reset.classList.remove("temp");
        solve1.disabled = false;
        solve1.classList.remove("temp");
        const list = document.createElement('li');
        ul.appendChild(list);
        list.textContent = timeStore; 
        console.log(timeStore);
    }
    else{
        start.textContent = "Stop";
        startTimer();
        reset.disabled =true;
        reset.classList.add("temp");
        solve1.disabled = true;
        solve1.classList.add("temp");
    }
    isTimeRunning = !isTimeRunning;
})

function Reset(){
    seconds = 0;
    minutes = 0;
    hours = 0;
    timerDisplay.textContent = "00:00:00";
    document.getElementById("start").textContent = "Start";
    isTimeRunning = false;
    reset.disabled = true;
    solve1.disabled = false;
    reset.classList.add("temp");
    solve1.classList.add("temp");
    timeStore = "00:00:00";
}
reset.addEventListener("click",Reset);



//end of personal test 



// function will get called when page loads
printBoard();
reset.classList.add("temp");
solve1.classList.add("temp");
