import { Clock } from 'lucide-react';
import { CronJob } from '../../types/CronJob';
import { STATUS_COLORS } from '../../utils/constants';

interface JobRowProps {
  job: CronJob;
  hours: number[];
}

export function JobRow({ job, hours }: JobRowProps) {
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
            className="col-span-1 border-l border-gray-100 p-2"
          />
        ))}
        {job.status === 'running' && (
          <div 
            className={`absolute top-1/2 left-0 transform -translate-y-1/2 h-2 rounded ${STATUS_COLORS[job.status]}`}
            style={{
              width: `${(100 / 24) * 2}%`,
              left: `${(100 / 24) * new Date().getHours()}%`
            }}
          />
        )}
      </div>
    </div>
  );
}