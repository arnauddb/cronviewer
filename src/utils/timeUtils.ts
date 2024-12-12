export function formatTimeString(hour: number): string {
  return `${hour.toString().padStart(2, '0')}`;
}

export function parseSchedule(schedule: string): number[] {
  // Basic implementation - extend based on your CRON parsing needs
  return [0]; // Placeholder
}