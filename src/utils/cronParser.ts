type TimeSlot = {
  hour: number;
  minute: number;
};

export function parseCronSchedule(schedule: string): TimeSlot[] {
  const [minute, hour] = schedule.split(' ');
  const slots: TimeSlot[] = [];

  const parseField = (field: string, max: number): number[] => {
    if (field === '*') return Array.from({ length: max }, (_, i) => i);
    if (field.includes('/')) {
      const [, step] = field.split('/');
      return Array.from({ length: Math.floor(max / parseInt(step)) }, (_, i) => i * parseInt(step));
    }
    return [parseInt(field)];
  };

  const hours = parseField(hour === '*' ? '*' : hour, 24);
  const minutes = parseField(minute === '*' ? '*' : minute, 60);

  hours.forEach(h => {
    minutes.forEach(m => {
      slots.push({ hour: h, minute: m });
    });
  });

  return slots;
}