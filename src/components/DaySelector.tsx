import { schedule2AP2 } from '@/data/scheduleData';

interface DaySelectorProps {
  selectedDay: number;
  onDayChange: (dayIndex: number) => void;
  todayIndex: number;
}

const DaySelector = ({ selectedDay, onDayChange, todayIndex }: DaySelectorProps) => {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
      <div className="flex gap-2 min-w-max px-1">
        {schedule2AP2.map((day, index) => {
          const isSelected = selectedDay === index;
          const isToday = todayIndex === index;
          
          return (
            <button
              key={day.day}
              onClick={() => onDayChange(index)}
              className={`
                day-tab relative
                ${isSelected ? 'day-tab-active' : 'day-tab-inactive'}
              `}
            >
              <span className="relative z-10">{day.dayFr}</span>
              {isToday && !isSelected && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full" />
              )}
              {isToday && isSelected && (
                <span className="absolute -top-1 -right-1 text-[10px] bg-accent text-accent-foreground px-1.5 py-0.5 rounded-full font-bold">
                  Aujourd'hui
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DaySelector;
