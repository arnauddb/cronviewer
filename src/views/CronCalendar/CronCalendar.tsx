import { useState } from 'react'
import cronParser from 'cron-parser';
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../../components/Button'
import { cn } from '../../utils/cn'
import { getMonthDays, isSameDay, formatMonth } from '../../utils/date'
import { CronJob } from '../../types/CronJob'

interface CronCalendarProps {
  jobs: CronJob[];
}

interface CalendarDay {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  cronJobs: CronJob[]
}

export function CronCalendar({ jobs }: CronCalendarProps) {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(today)
  const days = getMonthDays(currentDate.getFullYear(), currentDate.getMonth())
  
  const calendarDays: CalendarDay[] = days.map(date => ({
    date,
    isCurrentMonth: date.getMonth() === currentDate.getMonth(),
    isToday: isSameDay(date, today),
    cronJobs: jobs.filter(job => {
      try {
        const interval = cronParser.parseExpression(job.schedule, {
          currentDate: date,
          iterator: true
        });
        
        // Just check if the next execution matches our date
        const next = interval.next().value.toDate();
        return isSameDay(next, date);
      } catch (err) {
        console.error(`Error parsing cron expression for job ${job.id}:`, err);
        return false;
      }
    })
  }));

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
              day.isToday && "bg-yellow-100"
            )}
          >
            <span className={cn(
              "block text-right mb-2",
              i % 7 === 6 && "text-red-500" // Sunday
            )}>
              {day.date.getDate()}
            </span>
            <div className="space-y-1">
              {day.cronJobs.length > 3 ? (
                <div className="group relative">
                  <div className="text-xs px-2 py-1 rounded bg-blue-500 text-white cursor-help">
                    {day.cronJobs.length} jobs scheduled
                  </div>
                  <div className="absolute left-0 top-full mt-1 z-50 hidden group-hover:block bg-white border rounded-lg shadow-lg p-2 w-64">
                    <div className="max-h-48 overflow-y-auto">
                      {day.cronJobs.map((job) => (
                        <div
                          key={job.id}
                          className="text-xs px-2 py-1 mb-1 rounded bg-blue-100 text-blue-800"
                        >
                          {job.name}: {job.schedule}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                day.cronJobs.map((job) => (
                  <div
                    key={job.id}
                    className={cn(
                      "text-xs px-2 py-1 rounded",
                      "bg-blue-500 text-white",
                    )}
                  >
                    {job.name}: {job.schedule}
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}