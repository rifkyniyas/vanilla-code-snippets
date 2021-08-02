const BMIDisplayArea = document.getElementById('BMIDisplayArea')
const toggleMessageArea = () => {
    BMIDisplayArea.classList.toggle('hidden')
}
const calculateBmiInMetric = (weight, height) => {
    const bmi = weight / (height * height)
    return  roundToFirstDecimal( bmi )
}
const calculateBmiInImperial = (weight, height) => {
    const bmi = (weight / (height * height)) * 703
    return roundToFirstDecimal( bmi )
}
const convertFtToIn = (Ft) => {
    return Ft * 12
}
const roundToFirstDecimal = (num) => {
    return Math.round( num * 10) / 10
}
const displayBMI = (e, form) => {
    e.preventDefault()
    const formData = new FormData(form)
    const unitType = formData.get('unitSystem')
    let BMI = 0
    if(unitType == "metric"){
        const weight = parseFloat(formData.get('weightInKG')) 
        const height = parseFloat(formData.get('heightInCM')) / 100
        BMI = calculateBmiInMetric(weight, height)
    }else if (unitType == "imperial" ){
        const weight = parseFloat(formData.get('weightInLb'))
        const height = convertFtToIn( parseFloat(formData.get('heightInFt')) ) + parseFloat(formData.get('heightInIn'))
        BMI = calculateBmiInImperial(weight, height);
    }
    const [BMIMessage, classToUse] = generateBMIMessage(BMI)
    console.log(BMIMessage)
    if(BMIDisplayArea.classList.contains('hidden')) BMIDisplayArea.classList.remove('hidden')
    BMIDisplayArea.classList.add(classToUse)
    BMIDisplayArea.innerHTML = BMIMessage
}
const generateBMIMessage = BMI => {
    let BMIMessage = ''
    let classToUse = ''

    switch (true) {
        case BMI < 18.5:
            BMIMessage = `Your BMI is ${BMI}<br> Your weight is the underweight category.`
            classToUse = 'text-danger'
            break;
        case BMI <= 24.9:
            BMIMessage = `Congratulations! Your BMI is ${BMI}. <br> You are having the normal weight`
            classToUse = 'text-normal'
            break;
        case BMI <= 29.9:
            BMIMessage = `Your BMI is ${BMI}<br> Your weight is the overweight category.`
            classToUse = 'text-warning'
            break;
        case BMI >= 30:
            BMIMessage = 'Your BMI is ${BMI}<br> You weight falls under obesity category.'
            classToUse = 'text-danger'
            break;
    }
    return [BMIMessage , classToUse]
}
const changeUnits = (e) => {
    toggleMessageArea ()
    const selectedUnits = e.target.value
    imperialUnits.classList.toggle('hidden')
    metricUnits.classList.toggle('hidden')
    const imperialInputs  = document.getElementById('imperialUnits').getElementsByTagName('input')
    const metricInputs = document.getElementById('metricUnits').getElementsByTagName('input')

    if (selectedUnits == "metric"){
        toggleRequired(imperialInputs , false)
        toggleRequired(metricInputs, true)
    } 
    if (selectedUnits == "imperial") {
        toggleRequired(imperialInputs , true)
        toggleRequired(metricInputs, false)
    } 
}
const toggleRequired = (inputs, isRequired) => {
    Array.from(inputs).forEach(input => {
        input.required = isRequired
    })
}