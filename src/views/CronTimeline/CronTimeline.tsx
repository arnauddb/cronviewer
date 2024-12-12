import { useState, useMemo } from 'react';
import { CronJob } from '../../types/CronJob';
import { TimelineHeader } from './TimelineHeader';
import { CategoryGroup } from './CategoryGroup';

interface CronTimelineProps {
  jobs: CronJob[];
}

export function CronTimeline({ jobs }: CronTimelineProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const jobsByCategory = useMemo(() => {
    return jobs.reduce((acc, job) => {
      if (!acc[job.category]) {
        acc[job.category] = [];
      }
      acc[job.category].push(job);
      return acc;
    }, {} as Record<string, CronJob[]>);
  }, [jobs]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  return (
    <div className="w-full overflow-x-auto">
      <TimelineHeader hours={hours} />
      <div>
        {Object.entries(jobsByCategory).map(([category, categoryJobs]) => (
          <CategoryGroup
            key={category}
            category={category}
            jobs={categoryJobs}
            hours={hours}
            isExpanded={expandedCategories.has(category)}
            onToggle={() => toggleCategory(category)}
          />
        ))}
      </div>
    </div>
  );
}