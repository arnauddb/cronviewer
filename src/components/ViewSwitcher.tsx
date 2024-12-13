import { Table, CalendarRange, LayoutGrid, ChartGantt } from 'lucide-react';
import { ViewType } from '../types/ViewType';

interface ViewSwitcherProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export function ViewSwitcher({ currentView, onViewChange }: ViewSwitcherProps) {
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => onViewChange('list')}
        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
          currentView === 'list'
            ? 'bg-blue-100 text-blue-700'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <Table className="w-4 h-4 mr-2" />
        CRON Jobs
      </button>
      <button
        onClick={() => onViewChange('calendar')}
        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
          currentView === 'calendar'
            ? 'bg-blue-100 text-blue-700'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <CalendarRange className="w-4 h-4 mr-2" />
        Calendar
      </button>
      <button
        onClick={() => onViewChange('timeline')}
        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
          currentView === 'timeline'
            ? 'bg-blue-100 text-blue-700'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <ChartGantt className="w-4 h-4 mr-2" />
        Timeline
      </button>
      <button
        onClick={() => onViewChange('heatmap')}
        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
          currentView === 'heatmap'
            ? 'bg-blue-100 text-blue-700'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <LayoutGrid className="w-4 h-4 mr-2" />
        Heatmap
      </button>
    </div>
  );
}