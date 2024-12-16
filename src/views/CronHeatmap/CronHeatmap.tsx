import { useMemo, useCallback } from 'react';
import { CronJob } from '../../types/CronJob';
import parser from 'cron-parser';
import { HEAT_COLORS } from '../../utils/constants';
import { HeatmapLegend } from './HeatmapLegend';

interface CronHeatmapProps {
  jobs: CronJob[];
}

export function CronHeatmap({ jobs }: CronHeatmapProps) {
  const heatmapData = useMemo(() => {
    const data = Array(24).fill(0).map(() => Array(60).fill(0));
    const now = new Date();
    const end = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    
    jobs.forEach(job => {
      try {
        const interval = parser.parseExpression(job.schedule);
        let next = interval.next();
        
        // Pre-check if the cron will execute in next 24 hours
        if (next.getTime() > end.getTime()) return;
        
        while (next.getTime() <= end.getTime()) {
          const hour = next.getHours();
          const minute = next.getMinutes();
          data[hour][minute]++;
          next = interval.next();
        }
      } catch (err) {
        console.error(`Failed to parse cron expression: ${job.schedule}`, err);
      }
    });
  
    return data;
  }, [jobs]);

  const maxValue = useMemo(() => Math.max(...heatmapData.flat()), [heatmapData]);

  const getHeatColor = useCallback((value: number): string => {
    if (value === 0) return HEAT_COLORS.none;
    const intensity = Math.min((value / maxValue) * 100, 100);
    if (intensity < 20) return HEAT_COLORS.low;
    if (intensity < 40) return HEAT_COLORS.mediumLow;
    if (intensity < 60) return HEAT_COLORS.medium;
    if (intensity < 80) return HEAT_COLORS.mediumHigh;
    return HEAT_COLORS.high;
  }, [maxValue]);

  const shouldShowMinute = useCallback((minute: number): boolean => minute % 5 === 0, []);
  const shouldShowHour = useCallback((hour: number): boolean => hour % 2 === 0, []);

  return (
    <div className="w-full overflow-x-auto bg-white">
      <div className="p-4">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Job Frequency Heatmap</h2>
          <HeatmapLegend />
        </div>
        
        <div className="relative">

          {/* Minutes header */}
          <div className="flex sticky top-0 bg-white">
            <div className="w-10 flex-shrink-0"></div>
            <div className="flex-1 grid grid-cols-60 gap-px">
              {Array.from({ length: 60 }, (_, i) => (
                <div key={i} className="text-center text-xs text-gray-500 py-1">
                  {shouldShowMinute(i) ? i.toString().padStart(2, '0') : ''}
                </div>
              ))}
            </div>
          </div>

          {/* Hours and heatmap cells */}
          <div className="relative">
            {Array.from({ length: 24 }, (_, hour) => (
              <div key={hour} className="flex h-4 mb-px">
                <div className="w-10 flex-shrink-0 text-xs text-gray-500 text-right pr-2">
                  {shouldShowHour(hour) ? hour.toString().padStart(2, '0') : ''}
                </div>
                <div className="flex-1 grid grid-cols-60 gap-px">
                  {Array.from({ length: 60 }, (_, minute) => (
                    <div
                      key={minute}
                      className={`${getHeatColor(heatmapData[hour][minute])} h-4 transition-colors`}
                      title={`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} - ${heatmapData[hour][minute]} jobs`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}