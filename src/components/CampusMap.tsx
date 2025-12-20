import { useState, useMemo } from 'react';
import { campusData, findRoomByName, getDirectionsToRoom, Room } from '@/data/campusData';
import { Course } from '@/data/scheduleData';
import { 
  MapPin, 
  Navigation, 
  ChevronUp, 
  ChevronDown, 
  X,
  Footprints,
  Clock,
  Building
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CampusMapProps {
  targetRoom?: string;
  targetCourse?: Course | null;
  onClose?: () => void;
}

const CampusMap = ({ targetRoom, targetCourse, onClose }: CampusMapProps) => {
  const [selectedFloor, setSelectedFloor] = useState(() => {
    if (targetRoom) {
      const room = findRoomByName(targetRoom);
      return room?.floor ?? 0;
    }
    return 0;
  });

  const currentFloorData = campusData.floors.find(f => f.floor === selectedFloor);
  const targetRoomData = targetRoom ? findRoomByName(targetRoom) : null;
  
  const directions = useMemo(() => {
    if (!targetRoom) return [];
    return getDirectionsToRoom(targetRoom);
  }, [targetRoom]);

  // Generate path from entrance to target room
  const pathPoints = useMemo(() => {
    if (!targetRoomData || selectedFloor !== targetRoomData.floor) return [];
    
    const points: { x: number; y: number }[] = [];
    
    // Start from hall
    const hall = currentFloorData?.rooms.find(r => r.type === 'common' && r.name.includes('Hall'));
    const stairs = currentFloorData?.rooms.find(r => r.type === 'stairs');
    
    if (stairs) points.push({ x: stairs.x, y: stairs.y });
    if (hall) points.push({ x: hall.x, y: hall.y });
    points.push({ x: targetRoomData.x, y: targetRoomData.y });
    
    return points;
  }, [targetRoomData, selectedFloor, currentFloorData]);

  const getRoomColor = (room: Room, isTarget: boolean) => {
    if (isTarget) return 'fill-accent stroke-accent';
    switch (room.type) {
      case 'classroom': return 'fill-primary/20 stroke-primary';
      case 'lab': return 'fill-purple-500/20 stroke-purple-500';
      case 'common': return 'fill-secondary stroke-muted-foreground';
      case 'stairs': return 'fill-emerald-500/20 stroke-emerald-500';
      case 'entrance': return 'fill-accent/20 stroke-accent';
      default: return 'fill-muted stroke-muted-foreground';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-auto">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <MapPin className="w-6 h-6 text-primary" />
              Carte du Campus
            </h2>
            <p className="text-muted-foreground text-sm">
              {campusData.name}
            </p>
          </div>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>

        {/* Target Course Info */}
        {targetCourse && (
          <div className="glass-card rounded-xl p-4 mb-6 border-l-4 border-l-accent">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Navigation className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Prochain cours</p>
                <h3 className="font-semibold text-foreground">{targetCourse.name}</h3>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <Badge variant="secondary" className="gap-1">
                    <MapPin className="w-3 h-3" />
                    Salle {targetCourse.room}
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <Building className="w-3 h-3" />
                    Étage {targetCourse.floor}
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <Clock className="w-3 h-3" />
                    {targetCourse.startTime}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-2">
            {/* Floor Selector */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Étage:</span>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {currentFloorData?.name}
                </Badge>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedFloor(Math.min(5, selectedFloor + 1))}
                  disabled={selectedFloor >= 5}
                >
                  <ChevronUp className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedFloor(Math.max(0, selectedFloor - 1))}
                  disabled={selectedFloor <= 0}
                >
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* SVG Map */}
            <div className="glass-card rounded-2xl p-4 overflow-hidden">
              <svg 
                viewBox="0 0 100 100" 
                className="w-full h-auto min-h-[300px]"
                style={{ maxHeight: '400px' }}
              >
                {/* Background */}
                <rect x="5" y="5" width="90" height="90" rx="3" 
                  className="fill-secondary/30 stroke-border" strokeWidth="0.5" />
                
                {/* Building outline */}
                <path 
                  d="M10 15 L10 85 L90 85 L90 15 L70 15 L70 10 L30 10 L30 15 Z" 
                  className="fill-card stroke-border" 
                  strokeWidth="0.8"
                />

                {/* Grid lines */}
                {[20, 40, 60, 80].map(y => (
                  <line key={`h-${y}`} x1="10" y1={y} x2="90" y2={y} 
                    className="stroke-border/30" strokeWidth="0.2" strokeDasharray="2,2" />
                ))}
                {[30, 50, 70].map(x => (
                  <line key={`v-${x}`} x1={x} y1="15" x2={x} y2="85" 
                    className="stroke-border/30" strokeWidth="0.2" strokeDasharray="2,2" />
                ))}

                {/* Path animation */}
                {pathPoints.length > 1 && (
                  <g>
                    <path
                      d={`M ${pathPoints.map(p => `${p.x} ${p.y}`).join(' L ')}`}
                      fill="none"
                      className="stroke-accent"
                      strokeWidth="1.5"
                      strokeDasharray="3,2"
                      strokeLinecap="round"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="50"
                        to="0"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </path>
                    {/* Walking person animation */}
                    <circle r="2" className="fill-accent">
                      <animateMotion
                        dur="3s"
                        repeatCount="indefinite"
                        path={`M ${pathPoints.map(p => `${p.x} ${p.y}`).join(' L ')}`}
                      />
                    </circle>
                  </g>
                )}

                {/* Rooms */}
                {currentFloorData?.rooms.map((room) => {
                  const isTarget = targetRoomData?.id === room.id;
                  const size = room.type === 'stairs' || room.type === 'elevator' ? 4 : 
                               room.type === 'entrance' ? 6 : 8;
                  
                  return (
                    <g key={room.id} className="cursor-pointer group">
                      {/* Room shape */}
                      {room.type === 'stairs' ? (
                        <polygon
                          points={`${room.x},${room.y - size/2} ${room.x + size/2},${room.y + size/2} ${room.x - size/2},${room.y + size/2}`}
                          className={`${getRoomColor(room, isTarget)} transition-all duration-300 group-hover:opacity-80`}
                          strokeWidth={isTarget ? "1" : "0.5"}
                        />
                      ) : (
                        <rect
                          x={room.x - size/2}
                          y={room.y - size/2}
                          width={size}
                          height={size}
                          rx={room.type === 'common' ? size/2 : 1}
                          className={`${getRoomColor(room, isTarget)} transition-all duration-300 group-hover:opacity-80`}
                          strokeWidth={isTarget ? "1" : "0.5"}
                        />
                      )}
                      
                      {/* Pulse for target */}
                      {isTarget && (
                        <circle
                          cx={room.x}
                          cy={room.y}
                          r="6"
                          className="fill-transparent stroke-accent"
                          strokeWidth="0.5"
                        >
                          <animate
                            attributeName="r"
                            from="4"
                            to="10"
                            dur="1.5s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="opacity"
                            from="1"
                            to="0"
                            dur="1.5s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      )}
                      
                      {/* Room label */}
                      <text
                        x={room.x}
                        y={room.y + size/2 + 4}
                        textAnchor="middle"
                        className={`text-[3px] font-medium ${isTarget ? 'fill-accent' : 'fill-foreground'}`}
                      >
                        {room.name}
                      </text>
                    </g>
                  );
                })}

                {/* Legend */}
                <g transform="translate(12, 78)">
                  <rect x="0" y="0" width="3" height="3" rx="0.5" className="fill-primary/20 stroke-primary" strokeWidth="0.3" />
                  <text x="5" y="2.5" className="text-[2.5px] fill-muted-foreground">Salle</text>
                  
                  <rect x="18" y="0" width="3" height="3" rx="0.5" className="fill-purple-500/20 stroke-purple-500" strokeWidth="0.3" />
                  <text x="23" y="2.5" className="text-[2.5px] fill-muted-foreground">Labo</text>
                  
                  <polygon points="38,0 40,3 36,3" className="fill-emerald-500/20 stroke-emerald-500" strokeWidth="0.3" />
                  <text x="42" y="2.5" className="text-[2.5px] fill-muted-foreground">Escalier</text>
                  
                  <rect x="55" y="0" width="3" height="3" rx="1.5" className="fill-secondary stroke-muted-foreground" strokeWidth="0.3" />
                  <text x="60" y="2.5" className="text-[2.5px] fill-muted-foreground">Hall</text>
                </g>
              </svg>
            </div>

            {/* Floor Quick Select */}
            <div className="flex justify-center gap-2 mt-4">
              {campusData.floors.map((floor) => (
                <button
                  key={floor.floor}
                  onClick={() => setSelectedFloor(floor.floor)}
                  className={`w-10 h-10 rounded-full font-medium text-sm transition-all duration-300 ${
                    selectedFloor === floor.floor
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : targetRoomData?.floor === floor.floor
                      ? 'bg-accent/20 text-accent border-2 border-accent'
                      : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                  }`}
                >
                  {floor.floor}
                </button>
              ))}
            </div>
          </div>

          {/* Directions Panel */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-xl p-4 sticky top-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4">
                <Footprints className="w-5 h-5 text-primary" />
                Itinéraire
              </h3>
              
              {targetRoom ? (
                <div className="space-y-3">
                  {directions.map((step, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-3 fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-xs font-medium text-primary">
                        {index + 1}
                      </div>
                      <p className="text-sm text-foreground pt-0.5">{step}</p>
                    </div>
                  ))}
                  
                  {/* Estimated time */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Temps estimé: ~{targetRoomData ? Math.ceil(targetRoomData.floor * 0.5 + 1) : 2} min</span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Sélectionnez un cours pour voir l'itinéraire vers la salle.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Close button (mobile) */}
        <div className="mt-6 lg:hidden">
          <Button onClick={onClose} className="w-full" variant="outline">
            Fermer la carte
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CampusMap;
