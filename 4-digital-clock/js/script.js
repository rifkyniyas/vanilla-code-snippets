const timeContainer = document.getElementById('timeContainer')
const dateContainer = document.getElementById('dateContainer')
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const displayTimeAnddate = () => {
    //initialize dateObj object and display time
    const dateObj = new Date()
    const timeToDispaly = `${dateObj.getHours()} : ${dateObj.getMinutes()} : ${dateObj.getSeconds()}`
    timeContainer.innerHTML = timeToDispaly
    //display dateObj
    const year = dateObj.getFullYear();
    const month = months[dateObj.getMonth()]
    const date = dateObj.getDate()
    const day = days[dateObj.getDay()]
    const dateToDisplay = `${day} ${date} ${month} ${year}`
    dateContainer.innerHTML = dateToDisplay
}
setInterval(displayTimeAnddate , 1000)