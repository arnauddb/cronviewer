export interface CronJob {
  id: string;
  name: string;
  schedule: string;
  description?: string;
  category: string;
}