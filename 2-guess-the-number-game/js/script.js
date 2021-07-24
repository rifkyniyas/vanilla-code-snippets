//Get the required DOM elements
const gameSection = document.getElementById('gameSection')
const gameForm = document.getElementById('gameForm')
const gameSettings = document.getElementById('gameSettings')
const gameSettingsForm = document.getElementById('gameSettingsForm')
const remainingAttempts = document.getElementById('remainingAttempts')
const maxRangeEl = document.getElementById('maxRange')
const minNum = document.getElementById('minNum')
const maxNum = document.getElementById('maxNum')
const message = document.getElementById('message')
const playAgainBtn = document.getElementById('playAgainBtn')

let mysteryNum = 0
let maxAttempts = 0
const displayMaxRange = (selection) => {
    const selectedMin = selection.options[selection.selectedIndex].text
    const availableAttempts = [10, 25, 50]
    const maxOptions = availableAttempts.filter(option => option > selectedMin)
    maxRangeEl.disabled = false
    maxRangeEl.innerHTML = ''
    maxOptions.forEach(opt => {
        let optionEl = document.createElement('option')
        optionEl.text = opt;
        maxRangeEl.append(optionEl)
    })
}
const generateNumber = (maxRange, minRange) => {
    return Math.floor(Math.random() * (maxRange - minRange) + minRange)
}
const startGame = (event) => {
    event.preventDefault();
    const minRange = document.getElementById('minRange').value
    const maxRange = document.getElementById('maxRange').value
    maxAttempts = document.getElementById('maxAttempts').value;
    mysteryNum = generateNumber(maxRange, minRange)
    console.log(mysteryNum)
    remainingAttempts.innerHTML = maxAttempts
    minNum.innerHTML = minRange
    maxNum.innerHTML = maxRange
    gameSettings.classList.add('hidden')
    gameSection.classList.remove('hidden')
}
const playGame = (event) => {
    message.classList.remove('hidden')
    event.preventDefault();
    console.log(maxAttempts)
    if( maxAttempts == 1 ){
        remainingAttempts.innerHTML = "0"
        message.classList.add('text-danger')
        playAgainBtn.classList.toggle('hidden')
        message.innerHTML = "You have no attempts left.. Try again later!";
        return;
    }
    const guessedNumber = parseInt(document.getElementById('guessedNumber').value) 
    if (guessedNumber === mysteryNum) {
        playAgainBtn.classList.toggle('hidden')
        remainingAttempts.innerHTML = "no"
        message.classList.add('text-success')
        message.innerHTML = "Congratulations! You have guessed it correct..."
        return;
    }else{
        message.classList.add('text-danger')
        message.innerHTML = "Incorrect.. Try again!"
        maxAttempts--
        remainingAttempts.innerHTML = maxAttempts
    }
}
const resetGame = () =>{
    //reset all the forms
    gameForm.reset()
    gameSettingsForm.reset()
    //remove the message
    message.innerHTML = ''
    message.classList = ''
    message.classList.add('hidden')

    playAgainBtn.classList.add('hidden')
    gameSection.classList.add('hidden')
    gameSettings.classList.remove('hidden')
}