import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../../components/Button'
import { cn } from '../../utils/cn'
import { getMonthDays, isSameDay, formatMonth } from '../../utils/date'

interface CronCalendarProps {
  jobs: CronJob[];
}

interface CronJob {
  id: string
  time: string
  name: string
  frequency: string
  color: 'blue' | 'green' | 'light-green'
  dates: Date[]
}

interface CalendarDay {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  cronJobs: CronJob[]
}

// Sample CRON jobs data
const sampleCronJobs: CronJob[] = [
  {
    id: '1',
    time: '12:30:00',
    name: 'Cron 1',
    frequency: 'every 5 days',
    color: 'blue',
    dates: Array.from({ length: 31 }, (_, i) => new Date(2024, 11, i + 1)).filter(d => d.getDate() % 5 === 1)
  },
  {
    id: '2',
    time: '10:45:00',
    name: 'Cron 2',
    frequency: 'every 3 days',
    color: 'green',
    dates: Array.from({ length: 31 }, (_, i) => new Date(2024, 11, i + 1)).filter(d => d.getDate() % 3 === 1)
  },
  {
    id: '3',
    time: '00:00:00',
    name: 'Cron 3',
    frequency: 'At midnight',
    color: 'light-green',
    dates: Array.from({ length: 31 }, (_, i) => new Date(2024, 11, i + 1)).filter(d => d.getDate() % 7 === 1)
  }
]

export function CronCalendar({ jobs }: CronCalendarProps) {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(today)
  const days = getMonthDays(currentDate.getFullYear(), currentDate.getMonth())
  
  const calendarDays: CalendarDay[] = days.map(date => ({
    date,
    isCurrentMonth: date.getMonth() === currentDate.getMonth(),
    isToday: isSameDay(date, today),
    cronJobs: sampleCronJobs.filter(job => 
      job.dates.some(jobDate => isSameDay(jobDate, date))
    )
  }))

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const goToToday = () => {
    setCurrentDate(today)
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-semibold">{formatMonth(currentDate)}</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous month</span>
            </Button>
            <Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </Button>
            <Button variant="outline" size="sm" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next month</span>
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Showing next 1000 cron schedules (Keep in mind some crons might be 'cut off' sooner than others depending on their frequency)
        </p>
      </div>

      <div className="grid grid-cols-7 gap-px bg-muted rounded-lg overflow-hidden">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
          <div
            key={day}
            className={cn(
              "bg-background p-2 text-center text-sm font-medium",
              i >= 5 && "text-red-500"
            )}
          >
            {day}
          </div>
        ))}
        
        {calendarDays.map((day, i) => (
          <div
            key={i}
            className={cn(
              "bg-background p-2 min-h-[120px]",
              !day.isCurrentMonth && "text-muted-foreground",
              day.isToday && "bg-yellow-50"
            )}
          >
            <span className={cn(
              "block text-right mb-2",
              i % 7 === 6 && "text-red-500" // Sunday
            )}>
              {day.date.getDate()}
            </span>
            <div className="space-y-1">
              {day.cronJobs.map((job) => (
                <div
                  key={job.id}
                  className={cn(
                    "text-xs px-2 py-1 rounded",
                    job.color === 'blue' && "bg-blue-500 text-white",
                    job.color === 'green' && "bg-green-500 text-white",
                    job.color === 'light-green' && "bg-green-200 text-green-800"
                  )}
                >
                  {job.time} {job.name}: {job.frequency}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}