const textInput = document.getElementById('textInput')
const inputFeedback = document.getElementById('inputFeedback')
const minLength = 15;
const maxLength = 600;
let charLength = 0
textInput.addEventListener('keyup', ()=>{
    charLength = textInput.value.length
    if(charLength < minLength){
        inputFeedback.classList = ''
        inputFeedback.classList.add('text-danger')
        inputFeedback.innerHTML = `${minLength - charLength} more characters required`
    }else if(charLength == minLength){
        inputFeedback.classList = ''
        inputFeedback.classList.add('text-safe')
        inputFeedback.innerHTML = `Optimum  characters reached`
    }else if(charLength > minLength && charLength < maxLength){
        inputFeedback.classList = ''
        inputFeedback.classList.add('text-warning')
        inputFeedback.innerHTML = `${maxLength - charLength} more characters remaining`
    }else if (charLength >= maxLength){
        inputFeedback.classList = ''
        inputFeedback.classList.add('text-danger')
        inputFeedback.innerHTML = "Maximum characters reached"
    }
})