export const STATUS_COLORS = {
  idle: 'bg-gray-100',
  running: 'bg-blue-500',
  failed: 'bg-red-500',
  completed: 'bg-green-500',
} as const;

export const HEAT_COLORS = {
  none: 'bg-gray-50',
  low: 'bg-blue-100',
  mediumLow: 'bg-blue-200',
  medium: 'bg-blue-300',
  mediumHigh: 'bg-blue-400',
  high: 'bg-blue-500',
} as const;