export interface CronJob {
  id: string;
  name: string;
  schedule: string;
  description?: string;
  lastRun?: Date;
  nextRun?: Date;
  status: 'idle' | 'running' | 'failed' | 'completed';
  category: string;
}