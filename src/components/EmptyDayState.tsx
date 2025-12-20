import { Coffee } from 'lucide-react';

const EmptyDayState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center fade-in">
      <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/5 rounded-3xl flex items-center justify-center mb-6 rotate-12">
        <Coffee className="w-10 h-10 text-accent -rotate-12" />
      </div>
      <h3 className="font-bold text-xl text-foreground mb-2">
        Journée libre !
      </h3>
      <p className="text-muted-foreground max-w-xs">
        Aucun cours prévu pour ce jour. Profitez-en pour réviser ou vous détendre.
      </p>
    </div>
  );
};

export default EmptyDayState;
