import { ChevronDown, ChevronRight } from 'lucide-react';
import { CronJob } from '../../types/CronJob';
import { JobRow } from './JobRow';

interface CategoryGroupProps {
  category: string;
  jobs: CronJob[];
  hours: number[];
  isExpanded: boolean;
  onToggle: () => void;
}

export function CategoryGroup({ category, jobs, hours, isExpanded, onToggle }: CategoryGroupProps) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="w-full flex items-center px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 text-gray-500 mr-2" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-500 mr-2" />
        )}
        <span className="font-medium text-gray-700">{category}</span>
        <span className="ml-2 text-sm text-gray-500">({jobs.length} jobs)</span>
      </button>
      {isExpanded && (
        <div className="divide-y divide-gray-100">
          {jobs.map((job) => (
            <JobRow key={job.id} job={job} hours={hours} />
          ))}
        </div>
      )}
    </div>
  );
}