import { CronJob } from '../../types/CronJob';

interface CronListProps {
  jobs: CronJob[];
}

export function CronList({ jobs }: CronListProps) {
  return(
    <div className="w-full overflow-x-auto bg-white">
      <div className="p-4">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">CRON Jobs</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Add Job</button>
        </div>
        <div className="divide-y divide-gray-200">
          {jobs.map((job) => (
            <div key={job.id} className="flex items-center justify-between py-2">
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{job.name}</div>
                <div className="text-sm text-gray-500">{job.schedule}</div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-sm text-blue-600">Edit</button>
                <button className="text-sm text-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}