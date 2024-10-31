export function createFormattedDateExp(dateInput) {
  const [year, month, day] = dateInput.split('-').map(Number);

  // Check if the date components are valid
  if (isNaN(month) || isNaN(day) || isNaN(year)) {
      return 'Invalid';
  }

  // Check if the month is within a valid range (1-12)
  if (month < 1 || month > 12) {
      return 'Invalid';
  }

  // Check if the day is within a valid range for the given month and year
  const lastDayOfMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > lastDayOfMonth) {
      return 'Invalid';
  }

  // Make sure month, day, and year are two digits
  const formattedMonth = month.toString().padStart(2, '0');
  const formattedDay = day.toString().padStart(2, '0');

  // Create the formatted date string
  const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

  return formattedDate;
};

export function createFormattedDate(dateInput) {
  console.log("Input date:", dateInput);
  const [year, month, day] = dateInput.split('-').map(Number);

  // Check if the date components are valid
  if (isNaN(month) || isNaN(day) || isNaN(year)) {
      return 'Invalid';
  }

  // Check if the month is within a valid range (1-12)
  if (month < 1 || month > 12) {
      return 'Invalid';
  }

  // Check if the day is within a valid range for the given month and year
  const lastDayOfMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > lastDayOfMonth) {
      return 'Invalid';
  }

  // Check if the date is not before today's date
  const today = new Date();
  if (today > new Date(year, month - 1, day)) {
      return 'Invalid';
  }

  // Make sure month, day, and year are two digits
  const formattedMonth = month.toString().padStart(2, '0');
  const formattedDay = day.toString().padStart(2, '0');

  // Create the formatted date string
  const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

  return formattedDate;
};


  export function createFormattedTime(timeInput) {
    const [hour, minute] = timeInput.split(':').map(Number);
  
    // Check if the time components are valid
    if (isNaN(hour) || isNaN(minute)) {
      return 'Invalid';
    }
  
    // Check if the hour is within a valid range (0-23)
    if (hour < 0 || hour > 23) {
      return 'Invalid';
    }
  
    // Check if the minute is within a valid range (0-59)
    if (minute < 0 || minute > 59) {
      return 'Invalid';
    }
  
    // Make sure hour and minute are two digits
    const formattedHour = hour.toString().padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');
  
    // Create the formatted time string
    const formattedTime = `${formattedHour}:${formattedMinute}`;

    return formattedTime;
  }
  
  export function calculateTimeDifference(time1, time2) {
    const [hour1, minute1] = time1.split(':').map(Number);
    const [hour2, minute2] = time2.split(':').map(Number);
  
    // Check if the time components are valid
    if (isNaN(hour1) || isNaN(minute1) || isNaN(hour2) || isNaN(minute2)) {
      return 'Invalid time format';
    }
  
    // Calculate the total minutes for each time
    const totalMinutes1 = hour1 * 60 + minute1;
    const totalMinutes2 = hour2 * 60 + minute2;
  
    // Calculate the absolute difference in minutes
    const differenceInMinutes = Math.abs(totalMinutes1 - totalMinutes2);
  
    // Convert the difference back to hours
    const differenceInHours = differenceInMinutes / 60;
    
    return differenceInHours;
  }
  

  export function displayDate (data) {
      let date = data.split('T')[0]
      let hour = data.split('T')[1].split('.')[0]
      return {date: date, hour: hour}
  }
  export function displayDates (data) {
     
      let hour = data.split('T')[1].split(':')[0]
      return { hour: hour}
  }


  export  function  isTimeGreaterThanCurrent  (inputTime)  {
  const currentDate = new Date(); 
  const [inputHours, inputMinutes, inputSeconds] = inputTime.split(':').map(Number); 


  const inputDate = new Date();
  inputDate.setHours(inputHours, inputMinutes, inputSeconds, 0); 


if ( inputDate > currentDate) {
  return false;
  
}
else{
  return true;
}
};



export function  isDateTimeGreaterThanCurrent  (inputDateTime) {
  const currentDate = new Date(); 


  const [datePart, timePart] = inputDateTime.split(' ');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hours, minutes, seconds] = timePart.split(':').map(Number); 

 
  const inputDate = new Date(year, month - 1, day, hours, minutes, seconds); 


  return inputDate < currentDate;
};


