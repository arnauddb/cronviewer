import { HEAT_COLORS } from '../../utils/constants';

export function HeatmapLegend() {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-500">Less</span>
      <div className="flex space-x-1">
        {Object.values(HEAT_COLORS).map((color, index) => (
          <div key={index} className={`w-4 h-4 ${color} rounded`} />
        ))}
      </div>
      <span className="text-sm text-gray-500">More</span>
    </div>
  );
}