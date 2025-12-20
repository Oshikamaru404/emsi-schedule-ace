// Campus building layout data for EMSI
// Based on the evacuation plan structure

export interface Room {
  id: string;
  name: string;
  x: number; // percentage position
  y: number; // percentage position
  floor: number;
  type: 'classroom' | 'lab' | 'admin' | 'common' | 'stairs' | 'elevator' | 'entrance';
}

export interface FloorData {
  floor: number;
  name: string;
  rooms: Room[];
  paths: { from: string; to: string }[];
}

export interface CampusBuilding {
  id: string;
  name: string;
  floors: FloorData[];
}

// Main building rooms organized by floor
export const campusData: CampusBuilding = {
  id: 'main',
  name: 'Bâtiment Principal EMSI',
  floors: [
    {
      floor: 0,
      name: 'Rez-de-chaussée',
      rooms: [
        { id: 'entrance', name: 'Entrée', x: 50, y: 90, floor: 0, type: 'entrance' },
        { id: 'hall-0', name: 'Hall', x: 50, y: 70, floor: 0, type: 'common' },
        { id: 'amphitheatre', name: 'Amphithéâtre', x: 25, y: 55, floor: 0, type: 'classroom' },
        { id: 'CC1(C)', name: 'CC1(C)', x: 70, y: 40, floor: 0, type: 'lab' },
        { id: 'LCSE(C)', name: 'LCSE(C)', x: 30, y: 40, floor: 0, type: 'lab' },
        { id: 'stairs-0', name: 'Escalier', x: 50, y: 50, floor: 0, type: 'stairs' },
      ],
      paths: [
        { from: 'entrance', to: 'hall-0' },
        { from: 'hall-0', to: 'amphitheatre' },
        { from: 'hall-0', to: 'CC1(C)' },
        { from: 'hall-0', to: 'LCSE(C)' },
        { from: 'hall-0', to: 'stairs-0' },
      ],
    },
    {
      floor: 1,
      name: '1er Étage',
      rooms: [
        { id: 'stairs-1', name: 'Escalier', x: 50, y: 50, floor: 1, type: 'stairs' },
        { id: 'hall-1', name: 'Hall', x: 50, y: 65, floor: 1, type: 'common' },
        { id: '1A', name: '1A', x: 25, y: 35, floor: 1, type: 'classroom' },
        { id: '1B', name: '1B', x: 45, y: 35, floor: 1, type: 'classroom' },
        { id: '1C', name: '1C', x: 65, y: 35, floor: 1, type: 'classroom' },
      ],
      paths: [
        { from: 'stairs-1', to: 'hall-1' },
        { from: 'hall-1', to: '1A' },
        { from: 'hall-1', to: '1B' },
        { from: 'hall-1', to: '1C' },
      ],
    },
    {
      floor: 2,
      name: '2ème Étage',
      rooms: [
        { id: 'stairs-2', name: 'Escalier', x: 50, y: 50, floor: 2, type: 'stairs' },
        { id: 'hall-2', name: 'Hall', x: 50, y: 65, floor: 2, type: 'common' },
        { id: '2A', name: '2A', x: 20, y: 30, floor: 2, type: 'classroom' },
        { id: '2B(C)', name: '2B(C)', x: 45, y: 30, floor: 2, type: 'classroom' },
        { id: '2C', name: '2C', x: 70, y: 30, floor: 2, type: 'classroom' },
      ],
      paths: [
        { from: 'stairs-2', to: 'hall-2' },
        { from: 'hall-2', to: '2A' },
        { from: 'hall-2', to: '2B(C)' },
        { from: 'hall-2', to: '2C' },
      ],
    },
    {
      floor: 3,
      name: '3ème Étage',
      rooms: [
        { id: 'stairs-3', name: 'Escalier', x: 50, y: 50, floor: 3, type: 'stairs' },
        { id: 'hall-3', name: 'Hall', x: 50, y: 65, floor: 3, type: 'common' },
        { id: '3A(C)', name: '3A(C)', x: 20, y: 30, floor: 3, type: 'classroom' },
        { id: '3B(C)', name: '3B(C)', x: 45, y: 30, floor: 3, type: 'classroom' },
        { id: '3C', name: '3C', x: 70, y: 30, floor: 3, type: 'classroom' },
      ],
      paths: [
        { from: 'stairs-3', to: 'hall-3' },
        { from: 'hall-3', to: '3A(C)' },
        { from: 'hall-3', to: '3B(C)' },
        { from: 'hall-3', to: '3C' },
      ],
    },
    {
      floor: 4,
      name: '4ème Étage',
      rooms: [
        { id: 'stairs-4', name: 'Escalier', x: 50, y: 50, floor: 4, type: 'stairs' },
        { id: 'hall-4', name: 'Hall', x: 50, y: 65, floor: 4, type: 'common' },
        { id: '4A', name: '4A', x: 20, y: 30, floor: 4, type: 'classroom' },
        { id: '4B', name: '4B', x: 45, y: 30, floor: 4, type: 'classroom' },
        { id: '4C', name: '4C', x: 70, y: 30, floor: 4, type: 'classroom' },
      ],
      paths: [
        { from: 'stairs-4', to: 'hall-4' },
        { from: 'hall-4', to: '4A' },
        { from: 'hall-4', to: '4B' },
        { from: 'hall-4', to: '4C' },
      ],
    },
    {
      floor: 5,
      name: '5ème Étage',
      rooms: [
        { id: 'stairs-5', name: 'Escalier', x: 50, y: 50, floor: 5, type: 'stairs' },
        { id: 'hall-5', name: 'Hall', x: 50, y: 65, floor: 5, type: 'common' },
        { id: '5A', name: '5A', x: 20, y: 30, floor: 5, type: 'classroom' },
        { id: '5B', name: '5B', x: 45, y: 30, floor: 5, type: 'classroom' },
        { id: 'socio-culturel', name: 'Espace Socio-Culturel', x: 25, y: 55, floor: 5, type: 'common' },
        { id: 'terrasse', name: 'Terrasse', x: 75, y: 25, floor: 5, type: 'common' },
      ],
      paths: [
        { from: 'stairs-5', to: 'hall-5' },
        { from: 'hall-5', to: '5A' },
        { from: 'hall-5', to: '5B' },
        { from: 'hall-5', to: 'socio-culturel' },
      ],
    },
  ],
};

// Helper function to find a room by name across all floors
export function findRoomByName(roomName: string): Room | null {
  for (const floor of campusData.floors) {
    const room = floor.rooms.find(r => r.id === roomName || r.name === roomName);
    if (room) return room;
  }
  return null;
}

// Get directions to a room
export function getDirectionsToRoom(roomName: string): string[] {
  const room = findRoomByName(roomName);
  if (!room) return ['Salle non trouvée'];
  
  const directions: string[] = [];
  
  directions.push('🚪 Entrez par l\'entrée principale');
  
  if (room.floor === 0) {
    directions.push('➡️ Traversez le hall principal');
  } else {
    directions.push(`🪜 Montez au ${room.floor}${room.floor === 1 ? 'er' : 'ème'} étage`);
    directions.push('➡️ Sortez de l\'escalier vers le hall');
  }
  
  // Direction based on room position
  if (room.x < 40) {
    directions.push('⬅️ Tournez à gauche');
  } else if (room.x > 60) {
    directions.push('➡️ Tournez à droite');
  } else {
    directions.push('⬆️ Continuez tout droit');
  }
  
  directions.push(`📍 La salle ${room.name} est sur votre ${room.x < 50 ? 'gauche' : 'droite'}`);
  
  return directions;
}
