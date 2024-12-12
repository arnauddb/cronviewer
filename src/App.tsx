import { useState } from 'react';
import { CronList } from './views/CronList/CronList';
import { CronTimeline } from './views/CronTimeline/CronTimeline';
import { CronHeatmap } from './views/CronHeatmap/CronHeatmap';

import { ViewSwitcher } from './components/ViewSwitcher';
import { CronJob } from './types/CronJob';
import { ViewType } from './types/ViewType';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('list');

  // Example jobs data with categories
  const jobs: CronJob[] = [
    {
      id: '1',
      name: 'Daily Backup',
      schedule: '0 0 * * *',
      description: 'Daily database backup',
      status: 'idle',
      lastRun: new Date('2024-03-10T00:00:00'),
      nextRun: new Date('2024-03-11T00:00:00'),
      category: 'Maintenance',
    },
    {
      id: '2',
      name: 'Log Rotation',
      schedule: '0 */4 * * *',
      description: 'Rotate and compress logs',
      status: 'running',
      lastRun: new Date('2024-03-10T04:00:00'),
      nextRun: new Date('2024-03-10T08:00:00'),
      category: 'Maintenance',
    },
    {
      id: '3',
      name: 'Health Check',
      schedule: '*/30 * * * *',
      description: 'System health monitoring',
      status: 'completed',
      lastRun: new Date('2024-03-10T05:30:00'),
      nextRun: new Date('2024-03-10T06:00:00'),
      category: 'Monitoring',
    },
    {
      id: '4',
      name: 'Performance Metrics',
      schedule: '*/15 * * * *',
      description: 'Collect performance metrics',
      status: 'idle',
      lastRun: new Date('2024-03-10T05:45:00'),
      nextRun: new Date('2024-03-10T06:00:00'),
      category: 'Monitoring',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Cronviewer</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Visualize when your scheduled jobs run throughout the day
                </p>
              </div>
              <ViewSwitcher currentView={currentView} onViewChange={setCurrentView} />
            </div>
          </div>
          <div className="px-4 py-5 sm:p-6">
            {currentView === 'list' && <CronList jobs={jobs} />}
            {currentView === 'timeline' && <CronTimeline jobs={jobs} />}
            {currentView === 'heatmap' && <CronHeatmap jobs={jobs} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;