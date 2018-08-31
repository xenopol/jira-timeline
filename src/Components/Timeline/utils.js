export const parseDate = date => {
  const [day] = date.split('T') // split date from time
  return new Date(day)
}

const addDays = (date, days) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export const generateDays = (start, end) => {
  let currentDate = start
  const days = []
  while (currentDate.getDate() !== (end.getDate() + 1)) { // + 1 == include the last day also
    const day = {
      number: currentDate.getDate(),
      isWeekend: currentDate.getDay() === 6 || currentDate.getDay() === 0,
    }
    days.push(day)
    currentDate = addDays(currentDate, 1)
  }
  return days
}
