let playBtn = document.querySelector(".playBtn")
let playAgain = document.querySelector(".play-again")
let selection = document.querySelectorAll('.box')
const infoDisplay = document.querySelector('#info')


let numberOfplays = 0

let currentPlayer = 'X'
let  = false

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

function handleStartPlay() {
    infoDisplay.textContent = currentPlayer + "'s turn first";
    selection.forEach(function (box) {
        box.addEventListener('click', handleBoxClick, { once: true });
    });
//once the button has been pressed, hide the button. 
    playBtn.style.display = 'none' 

}

function handleBoxClick(event) {
    let targetBox = event.target
    if (currentPlayer === 'X') {
        targetBox.textContent = 'X';
        currentPlayer = 'O'

        console.log(numberOfplays)
    } else {
        targetBox.textContent = 'O';
        currentPlayer = 'X'

        console.log(numberOfplays)
    }
    numberOfplays++
    infoDisplay.textContent = "It's " + currentPlayer + "'s turn!"

    checkWin()
    checkDraw()
}

function checkWin() {
    winningCombos.forEach(function (combo) {
        if (
            selection[combo[0]].textContent === 'X' &&
            selection[combo[1]].textContent === 'X' &&
            selection[combo[2]].textContent === 'X'
        ) {
            selection.forEach(function (box) {
                box.removeEventListener('click', handleBoxClick);
                infoDisplay.textContent = 'X wins!';
                playAgain.style.display = 'block';
            });
        }
        
        if (
            selection[combo[0]].textContent === 'O' &&
            selection[combo[1]].textContent === 'O' &&
            selection[combo[2]].textContent === 'O'
        ) {
            selection.forEach(function (box) {
                box.removeEventListener('click', handleBoxClick);
                infoDisplay.textContent = 'O wins!';
                playAgain.style.display = 'block';
                

            });

        }

    })

}

function checkDraw() {
    if (numberOfplays === 9) {
        infoDisplay.textContent = "It's a Draw!"
        playAgain.style.display = 'block';
    }
    
}

function handlePlayAgain() {
    for (const select of selection) {
        select.textContent ="";
        select.addEventListener('click', handleBoxClick, { once: true });
    }
    currentPlayer = 'X';
    infoDisplay.textContent = currentPlayer + "'s turn first"
    numberOfplays = 0;
    playAgain.style.display = 'none'
}
// Event listeners
playBtn.addEventListener('click', handleStartPlay)
playAgain.addEventListener('click', handlePlayAgain)
playAgain.style.display = 'none'

