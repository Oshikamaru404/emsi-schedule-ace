import { ArrowRight, Clock, MapPin, Navigation } from 'lucide-react';
import { Course } from '@/data/scheduleData';

interface NextClassBannerProps {
  course: Course | null;
  timeUntil?: string;
  onShowMap?: () => void;
}

const NextClassBanner = ({ course, timeUntil, onShowMap }: NextClassBannerProps) => {
  if (!course) {
    return (
      <div className="glass-card rounded-2xl p-6 text-center">
        <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
          <Clock className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="font-bold text-lg text-foreground mb-1">Pas de cours aujourd'hui</h3>
        <p className="text-muted-foreground text-sm">Profitez de votre journée ! 🎉</p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-primary/5 to-primary/0 border-primary/20">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Prochain cours
        </span>
        {timeUntil && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-accent bg-accent/10 px-2.5 py-1 rounded-full">
            <Clock className="w-3 h-3" />
            {timeUntil}
          </span>
        )}
      </div>

      <h3 className="font-bold text-xl text-foreground mb-4 leading-tight">
        {course.name}
      </h3>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Clock className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Horaire</p>
            <p className="font-semibold text-foreground font-mono">
              {course.startTime} - {course.endTime}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Salle</p>
            <p className="font-semibold text-foreground">
              {course.room} • {course.floor === 0 ? 'RDC' : `${course.floor}e étage`}
            </p>
          </div>
        </div>
      </div>

      <button 
        onClick={onShowMap}
        className="mt-6 w-full flex items-center justify-center gap-2 py-3 px-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors group"
      >
        <Navigation className="w-4 h-4" />
        Voir l'itinéraire
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default NextClassBanner;
