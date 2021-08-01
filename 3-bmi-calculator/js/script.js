
const BMIDisplayArea = document.getElementById('BMIDisplayArea')

const calculateBMI = (weight, height) => {
    const bmi = weight / (height * height)
    return  roundToFirstDecimal( bmi )
}
const convertLbToKG = (lb) => {
    return lb / 2.205
}
const convertFtAndInToCm = (Ft , In) => {
    return (Ft * 30.48) + (In * 2.54)
}
const roundToFirstDecimal = (num) => {
    return Math.round( num * 10) / 10
}
const displayBMI = (e, form) => {
    e.preventDefault()
    const formData = new FormData(form)
    const unitType = formData.get('unitSystem')
    let weightInKG = 0
    let heightInCm = 0
    if(unitType == "metric"){
        weightInKG = parseFloat(formData.get('weightInKG')) 
        heightInCm = parseFloat(formData.get('heightInCM')) / 100
    }else if (unitType == "imperial" ){
        weightInKG = convertLbToKG(parseFloat(formData.get('weightInLb')))
        heightInCm = convertFtAndInToCm( parseFloat(formData.get('heightInFt')) , parseFloat(formData.get('heightInIn')) )
    }
    const weight = roundToFirstDecimal(weightInKG)
    console.log(weight, weightInKG)
    const height = roundToFirstDecimal(heightInCm)
    const BMI = calculateBMI(weight, height) 
    console.log(BMI)
    const [BMIMessage, classToUse] = generateBMIMessage(BMI)
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