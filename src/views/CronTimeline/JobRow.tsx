import React from 'react';
import { Clock } from 'lucide-react';
import parser from 'cron-parser';
import { CronJob } from '../../types/CronJob';

interface JobRowProps {
  job: CronJob;
  hours: number[];
}

export function JobRow({ job, hours }: JobRowProps) {

  const getExecutionHours = () => {
    try {
      const interval = parser.parseExpression(job.schedule);
      const executionHours = new Set<number>();
      
      // Get first execution of the day
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      interval.reset(start);

      // Get just the next 24 iterations maximum
      for (let i = 0; i < 24; i++) {
        const next = interval.next();
        if (next.getDate() !== start.getDate()) break;
        executionHours.add(next.getHours());
      }
      
      return executionHours;
    } catch (err) {
      console.error('Invalid cron expression:', err);
      return new Set<number>();
    }
  };

  // Memoize the execution hours to prevent recalculation on re-renders
  const executionHours = React.useMemo(() => getExecutionHours(), [job.schedule]);

  return (
    <div className="flex hover:bg-gray-50">
      <div className="w-64 flex-shrink-0 p-4">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <div>
            <h3 className="font-medium text-gray-900">{job.name}</h3>
            <p className="text-sm text-gray-500">{job.schedule}</p>
          </div>
        </div>
      </div>
      <div className="flex-1 grid grid-cols-24 relative">
        {hours.map((hour) => (
          <div
          key={hour}
          className={`col-span-1 border-l border-gray-100 p-2 ${
            executionHours.has(hour) ? 'bg-blue-200' : ''
          }`}
        >
          {executionHours.has(hour) && (
            <div className="absolute top-0 bottom-0 w-0.5 bg-blue-500 left-1/2 transform -translate-x-1/2" />
          )}
        </div>
        ))}
      </div>
    </div>
  );
}