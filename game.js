const OPTIONS = ['rock', 'paper', 'scissors']
let playerScore = 0
let computerScore = 0
let isGameOver = false

function getComputerChoice() {
    const randomIndex =  Math.floor(Math.random() * OPTIONS.length)
    return OPTIONS[randomIndex]
}

// Assumes leftSelection !== rightSelection
function isLeftSelectionWinner(leftSelection, rightSelection) {
    if (leftSelection === 'rock') {
        return rightSelection === 'paper' ? false : true
    }
    else if (leftSelection === 'paper') {
        return rightSelection === 'scissors' ? false : true
    }
    return rightSelection === 'rock' ? false : true
}

function getResultString(isPlayerWinner, playerSelection, resultStringBeginning) {
    let resultString = resultStringBeginning
    if (playerSelection === 'rock') {
        if (!isPlayerWinner) {
            resultString += ' Paper covers rock!'
        }
        else {
            resultString += ' Rock crushes scissors!'
        }
    }
    else if (playerSelection === 'paper') {
        if (!isPlayerWinner) {
            resultString += ' Scissors cuts paper!'
        }
        else {
            resultString += ' Paper covers rock!'
        }
    }
    else {
        if (!isPlayerWinner) {
            resultString += ' Rock crushes scissors!'
        }
        else {
            resultString += ' Scissors cuts paper!'
        }
    }
    return resultString
}

function playRound(playerSelection, computerSelection) {
    const isPlayerWinner = isLeftSelectionWinner(playerSelection, computerSelection)

    let resultString = ''
    if (isPlayerWinner) {
        resultString = getResultString(isPlayerWinner, playerSelection, 'You win!')
    }
    else {
        resultString = getResultString(isPlayerWinner, playerSelection, 'You lose!')
    }
    return [isPlayerWinner, resultString]
}

function getPlayerSelection() {
    let playerSelection = prompt('Please enter your choice for Rock Paper Scissors:')

    while (!OPTIONS.includes(playerSelection.toLowerCase())) {
        playerSelection = prompt(`Error: ${playerSelection} is not a valid option. Please select 'rock,' 'paper,' or 'scissors.'`)
    }

    return playerSelection.toLowerCase()
}

function game() {
    let playerScore = 0
    let computerScore = 0
    for (let i = 0; i < 5; ++i) {
        let playerSelection = getPlayerSelection()
        let computerSelection = getComputerChoice()

        if (playerSelection === computerSelection) {
            console.log('Tie! You have both chosen ' + playerSelection + '!')
        }
        else {
            const [isPlayerWinner, resultString] = playRound(playerSelection, computerSelection)
            if (isPlayerWinner) {
                ++playerScore
            }
            else {
                ++computerScore
            }
            console.log(resultString)
        }
        console.log(`Total score: Player ${playerScore}; Computer ${computerScore}`)
        console.log()
    }

    if (playerScore > computerScore) {
        console.log('You win!')
    }
    else if (computerScore > playerScore) {
        console.log('You lose!')
    }
    else {
        console.log("It's a draw!")
    }
}

function updateResultText(resultString) {
    let resultText = document.querySelector('p.result-text')
    resultText.textContent = resultString
}

function updateScore(isPlayerWinner) {
    let scoreText = document.querySelector('p.score')

    if (isPlayerWinner) {
        ++playerScore
    }
    else {
        ++computerScore
    }

    scoreText.textContent = `${playerScore} (You) - ${computerScore} (Computer)`

    if (playerScore === 5) {
        updateResultText('You win!')
        isGameOver = true
    }
    else if (computerScore === 5) {
        updateResultText('You lose!')
        isGameOver = true
    }
}

function handleUpdates(isPlayerWinner, resultString) {
    if (!isGameOver) {
        updateResultText(resultString)
        updateScore(isPlayerWinner)
    }
}

let rockButton = document.querySelector('button.rock')
rockButton.addEventListener('click', e => {
    const [isPlayerWinner, resultString] = playRound('rock', getComputerChoice())
    handleUpdates(isPlayerWinner, resultString)
})

let paperButton = document.querySelector('button.paper')
paperButton.addEventListener('click', e => {
    const [isPlayerWinner, resultString] = playRound('paper', getComputerChoice())
    handleUpdates(isPlayerWinner, resultString)
})

let scissorsButton = document.querySelector('button.scissors')
scissorsButton.addEventListener('click', e => {
    const [isPlayerWinner, resultString] = playRound('scissors', getComputerChoice())
    handleUpdates(isPlayerWinner, resultString)
})