import { formatTimeString } from '../../utils/timeUtils';

interface TimelineHeaderProps {
  hours: number[];
}

export function TimelineHeader({ hours }: TimelineHeaderProps) {
  return (
    <div className="flex sticky top-0 bg-white border-b border-gray-200">
      <div className="w-64 flex-shrink-0 p-4 font-semibold text-gray-700">Jobs</div>
      <div className="flex-1 grid grid-cols-24">
        {hours.map((hour) => (
          <div
            key={hour}
            className="col-span-1 p-2 text-center text-sm text-gray-600 border-l border-gray-100"
          >
            {formatTimeString(hour)}
          </div>
        ))}
      </div>
    </div>
  );
}