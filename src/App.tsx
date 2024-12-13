import { useEffect, useState } from 'react';
import { CalendarClock } from 'lucide-react';
import { CronList } from './views/CronList/CronList';
import { CronCalendar } from './views/CronCalendar/CronCalendar';
import { CronTimeline } from './views/CronTimeline/CronTimeline';
import { CronHeatmap } from './views/CronHeatmap/CronHeatmap';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/Tabs";

import { CronJob } from './types/CronJob';

function App() {
  const [jobs, setJobs] = useState<CronJob[]>([]);

  useEffect(() => {
    setJobs([])
  }, []);
  
  return (
    <div className="min-h-screen bg-slate-100 overflow-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="flex flex-row items-center text-2xl font-bold text-gray-900">
                  <CalendarClock className='mr-2' />
                  Cronviewer
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Visualize when your scheduled jobs run throughout the day
                </p>
              </div>
            </div>
          </div>
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-4 border-b border-gray-200">
              <TabsTrigger value="list">CRON Jobs</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
            </TabsList>
            <div className="px-4 py-5 sm:p-6">
              <TabsContent value="list">
                <CronList 
                  jobs={jobs}
                  updateJobs={setJobs} />
              </TabsContent>
              <TabsContent value="calendar">
                <CronCalendar jobs={jobs} />
              </TabsContent>
              <TabsContent value="timeline">
                <CronTimeline jobs={jobs} />
              </TabsContent>
              <TabsContent value="heatmap">
                <CronHeatmap jobs={jobs} /> 
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default App;