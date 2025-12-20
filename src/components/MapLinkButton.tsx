import { MapPin } from 'lucide-react';

interface MapLinkButtonProps {
  room: string;
  floor: number;
  onClick: () => void;
  variant?: 'default' | 'compact';
}

const MapLinkButton = ({ room, floor, onClick, variant = 'default' }: MapLinkButtonProps) => {
  if (variant === 'compact') {
    return (
      <button
        onClick={onClick}
        className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors text-xs underline-offset-2 hover:underline"
      >
        <MapPin className="w-3 h-3" />
        <span>Voir sur la carte</span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
    >
      <MapPin className="w-3.5 h-3.5" />
      Salle {room} • Étage {floor}
    </button>
  );
};

export default MapLinkButton;
