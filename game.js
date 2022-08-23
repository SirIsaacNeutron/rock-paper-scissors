const OPTIONS = ['rock', 'paper', 'scissors']

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
    return resultString
}

function game() {
    for (let i = 0; i < 5; ++i) {
        let playerSelection = prompt('Please enter your choice for Rock Paper Scissors:')
        while (playerSelection === null) {
            playerSelection = prompt('Error: no answer detected. Please enter your choice for Rock Paper Scissors:')
        }
        let computerSelection = getComputerChoice()
        playerSelection = playerSelection.toLowerCase()

        if (playerSelection === computerSelection) {
            console.log('Tie! You have both chosen ' + playerSelection + '!')
        }
        else {
            console.log(playRound(playerSelection, computerSelection))
        }
    }
}
