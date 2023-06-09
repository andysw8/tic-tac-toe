let playBtn = document.querySelector(".playBtn")
let playAgain = document.querySelector(".play-again")
let selection = document.querySelectorAll('.box')
const infoDisplay = document.querySelector('#info')
let numberOfplays = 0
let currentPlayer = 'X'
let isThereAWinner = false;
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

// Functions
function handleStartPlay() {
    infoDisplay.textContent = currentPlayer + "'s turn first";
    // Once the button is clicked, the game board will be activated. Once the game has started, the Click to Begin button should disappear. 
    selection.forEach(function (box) {
        box.addEventListener('click', handleBoxClick, { once: true });
    });
    playBtn.style.display = 'none'
}

function handleBoxClick(event) {
    // 
    let targetBox = event.target
    if (currentPlayer === 'X') {
        targetBox.textContent = 'X';
        currentPlayer = 'O'
    } else {
        targetBox.textContent = 'O';
        currentPlayer = 'X'
    }
    numberOfplays++
    infoDisplay.textContent = "It's " + currentPlayer + "'s turn!"

    checkWin()
}

function checkWin() {
    // Out of the winning combos, if each selection contains one number (combo) [0][2][3] and if the player selects all three - then there is a winner. 
    for (const combo of winningCombos) {
        if (selection[combo[0]].textContent === 'X' &&
            selection[combo[1]].textContent === 'X' &&
            selection[combo[2]].textContent === 'X'
        ) {
            infoDisplay.textContent = 'X wins!';
            isThereAWinner = true;
            playAgain.style.display = 'block';
            selection.forEach(function (box) {
                box.removeEventListener('click', handleBoxClick);
            });
            return // this was the missing ingredient!

        } else if (
            selection[combo[0]].textContent === 'O' &&
            selection[combo[1]].textContent === 'O' &&
            selection[combo[2]].textContent === 'O'
        ) {
            infoDisplay.textContent = 'O wins!';
            isThereAWinner = true;
            playAgain.style.display = 'block';
            selection.forEach(function (box) {
                box.removeEventListener('click', handleBoxClick);
            });
            return
        }
    }
    // However, if 9 selections have been made with no winning combination, then the game ends in a draw and the play again button appears. 
    if (numberOfplays === 9) {
        infoDisplay.textContent = "It's a Draw!";
        playAgain.style.display = 'block';
    }
}

function handlePlayAgain() {
    // When the Play Again button has been clicked, the game board will reset and each selection will be empty. The event listener is added back in so the player can make their selections. The text will also display reset to prompt who's turn it is based on who the current player is.  
    for (const select of selection) {
        select.textContent = "";
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

