import React from 'react';
import parser from 'cron-parser';
import { CronJob } from '../../types/CronJob';

interface JobRowProps {
  job: CronJob;
  hours: number[];
}

interface Execution {
  hour: number;
  minute: number;
}

export function JobRow({ job, hours }: JobRowProps) {
  const [parseError, setParseError] = React.useState<string | null>(null);

  const getCronExecutions = () => {
    try {
      const interval = parser.parseExpression(job.schedule);
      const executions: Execution[] = [];
      
      // Get first execution of the day
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      interval.reset(start);

      // Get all executions for the day
      let next = interval.next();
      while (next.getDate() === start.getDate()) {
        executions.push({
          hour: next.getHours(),
          minute: next.getMinutes()
        });
        next = interval.next();
      }
      
      return executions;
    } catch (err) {
      console.error('Invalid cron expression:', err);
      setParseError(err instanceof Error ? err.message : 'Invalid cron expression');
      return []
    }
  };

  // Memoize the execution hours to prevent recalculation on re-renders
  const cronExecutions = React.useMemo(() => getCronExecutions(), [job.schedule]);

  return (
    <div className="flex hover:bg-gray-50">
      <div className="w-64 flex-shrink-0 p-2 overflow-hidden">
        <div className="flex items-center space-x-2">
          <span className={`truncate block w-full ${parseError ? 'text-red-500' : 'text-gray-900 '}`}>{job.name}</span>
        </div>
      </div>
      <div className="flex-1 grid grid-cols-24 relative">
        {parseError && <div className="text-red-500 text-nowrap p-2">{parseError}</div>}
        {!parseError &&hours.map((hour) => (
          <div
            key={hour}
            className="col-span-1 border-l border-gray-100 p-2" />
        ))}
        {!parseError && cronExecutions.map((exec, index) => {
          return (
            <div 
              key={index} 
              className={`absolute top-0 bottom-0 w-0.5 bg-blue-500`}
              style={{
                left: `${(exec.hour * 100 / 24) + (exec.minute * 100 / 24 / 60)}%`
              }}
            />
          )
        })}
      </div>
    </div>
  );
}