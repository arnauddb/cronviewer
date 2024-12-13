export function getMonthDays(year: number, month: number) {
  const date = new Date(year, month, 1)
  const days: Date[] = []
  
  // Get days from previous month to fill first week
  const firstDay = date.getDay() || 7 // Convert Sunday from 0 to 7
  const prevMonthDays = firstDay - 1
  for (let i = prevMonthDays; i > 0; i--) {
    days.push(new Date(year, month - 1, -i + 1))
  }
  
  // Get days of current month
  while (date.getMonth() === month) {
    days.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }
  
  // Get days from next month to fill last week
  const lastDay = new Date(year, month + 1, 0).getDay() || 7
  const nextMonthDays = 7 - lastDay
  for (let i = 1; i <= nextMonthDays; i++) {
    days.push(new Date(year, month + 1, i))
  }
  
  return days
}

export function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  )
}

export function formatMonth(date: Date) {
  return date.toLocaleString('default', { month: 'long', year: 'numeric' })
}