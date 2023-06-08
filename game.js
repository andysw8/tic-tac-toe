let playBtn = document.querySelector(".playBtn")
let playAgain = document.querySelector(".play-again")
let selection = document.querySelectorAll('.box')
const infoDisplay = document.querySelector('#info')

let numberOfplays = 0
let gameHasWinner = false
let currentPlayer = 'cross'
let gameRunning = false

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

function handleStartPlay() {
    infoDisplay.textContent = currentPlayer + "'s turn first";
    gameRunning = true;
    selection.forEach(function (box) {
        box.addEventListener('click', handleBoxClick, { once: true });
    });
    playBtn.disabled = true;

}

function handleBoxClick(event) {
    let targetBox = event.target
    if (currentPlayer === 'cross') {
        targetBox.classList.add('cross')
        currentPlayer = 'naught'

        console.log(numberOfplays)
    } else {
        targetBox.classList.add('naught')
        currentPlayer = 'cross'

        console.log(numberOfplays)
    }
    numberOfplays++
    infoDisplay.textContent = "it is now " + currentPlayer + "'s go."

    checkWin()
    checkDraw()
}

function checkWin() {
    winningCombos.forEach(function (combo) {
        if (selection[combo[0]].classList.contains('cross') && selection[combo[1]].classList.contains('cross') && selection[combo[2]].classList.contains('cross')) {
            selection.forEach(function (box) {
                box.removeEventListener('click', handleBoxClick);
                infoDisplay.textContent = 'cross wins!'
                gameHasWinner = true;
            });

        }

        if (selection[combo[0]].classList.contains('naught') && selection[combo[1]].classList.contains('naught') && selection[combo[2]].classList.contains('naught')) {
            selection.forEach(function (box) {
                box.removeEventListener('click', handleBoxClick);
                infoDisplay.textContent = 'naught wins!'
                gameHasWinner = true

            });

        }

    })

}

function checkDraw() {
    if (numberOfplays === 9 && gameHasWinner === false) {
        infoDisplay.textContent = "It's a Draw!"
    }

}

function handlePlayAgain() {
    for (const select of selection) {
        select.classList.remove('naught', 'cross');
        select.addEventListener('click', handleBoxClick, { once: true });
    }
    infoDisplay.textContent = '';
    numberOfplays = 0;
    gameHasWinner = false;
    currentPlayer = 'cross';
}



// Event listeners
playBtn.addEventListener('click', handleStartPlay)
playAgain.addEventListener('click', handlePlayAgain)


