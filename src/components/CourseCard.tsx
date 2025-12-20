import { Clock, MapPin, Users, Building2 } from 'lucide-react';
import { Course } from '@/data/scheduleData';

interface CourseCardProps {
  course: Course;
  isCurrentClass?: boolean;
  isNextClass?: boolean;
  animationDelay?: number;
}

const CourseCard = ({ course, isCurrentClass, isNextClass, animationDelay = 0 }: CourseCardProps) => {
  const getCardClass = () => {
    let base = 'schedule-card glass-card fade-in';
    
    if (course.type === 'tp') {
      base += ' schedule-card-tp';
    } else if (course.type === 'language') {
      base += ' schedule-card-language';
    } else {
      base += ' schedule-card-course';
    }
    
    if (isCurrentClass) {
      base += ' current-class-glow ring-2 ring-schedule-current';
    }
    
    return base;
  };

  const getFloorLabel = (floor: number) => {
    if (floor === 0) return 'RDC';
    return `${floor}ème étage`;
  };

  return (
    <div 
      className={getCardClass()}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Status Badge */}
      {(isCurrentClass || isNextClass) && (
        <div className="mb-3">
          {isCurrentClass && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-schedule-current/20 text-schedule-current">
              <span className="w-2 h-2 bg-schedule-current rounded-full animate-pulse" />
              En cours
            </span>
          )}
          {isNextClass && !isCurrentClass && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-schedule-upcoming/20 text-schedule-upcoming">
              <Clock className="w-3 h-3" />
              Prochain cours
            </span>
          )}
        </div>
      )}

      {/* Course Name */}
      <h3 className="font-bold text-foreground mb-2 leading-tight">
        {course.name}
      </h3>
      
      {course.nameAr && (
        <p className="text-sm text-muted-foreground mb-2 font-arabic" dir="rtl">
          {course.nameAr}
        </p>
      )}

      {/* Time and Location */}
      <div className="flex flex-wrap items-center gap-3 mt-4">
        {/* Time Badge */}
        <div className="time-badge">
          <Clock className="w-3.5 h-3.5" />
          {course.startTime} - {course.endTime}
        </div>

        {/* Room Badge */}
        <div className="room-badge">
          <MapPin className="w-3.5 h-3.5" />
          Salle {course.room}
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-4 pt-4 border-t border-border/50 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5" />
          {getFloorLabel(course.floor)}
        </span>
        
        {course.building && (
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {course.building}
          </span>
        )}
        
        {course.group && (
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            {course.group}
          </span>
        )}
      </div>

      {/* Course Type Indicator */}
      <div className="mt-3">
        <span className={`
          text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded
          ${course.type === 'tp' ? 'bg-schedule-tp/20 text-schedule-tp' : ''}
          ${course.type === 'language' ? 'bg-schedule-language/20 text-schedule-language' : ''}
          ${course.type === 'course' ? 'bg-primary/20 text-primary' : ''}
        `}>
          {course.type === 'tp' ? 'Travaux Pratiques' : ''}
          {course.type === 'language' ? 'Langue' : ''}
          {course.type === 'course' ? 'Cours Magistral' : ''}
        </span>
      </div>
    </div>
  );
};

export default CourseCard;
