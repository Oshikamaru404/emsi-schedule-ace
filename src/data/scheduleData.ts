export interface Course {
  id: string;
  name: string;
  nameAr?: string;
  room: string;
  floor: number;
  building?: string;
  startTime: string;
  endTime: string;
  type: 'course' | 'tp' | 'language';
  group?: string;
  professor?: string;
}

export interface DaySchedule {
  day: string;
  dayFr: string;
  courses: Course[];
}

export interface Notification {
  id: string;
  type: 'room_change' | 'time_change' | 'cancelled' | 'info';
  title: string;
  message: string;
  courseId?: string;
  timestamp: Date;
  read: boolean;
}

// Schedule data for 2AP2 class based on the PDF
export const schedule2AP2: DaySchedule[] = [
  {
    day: 'Monday',
    dayFr: 'Lundi',
    courses: [
      {
        id: 'mon-1',
        name: "Systèmes d'exploitation",
        room: '3B(C)',
        floor: 3,
        building: 'Bâtiment Principal',
        startTime: '09:00',
        endTime: '10:30',
        type: 'course',
      },
      {
        id: 'mon-2',
        name: 'Microprocesseurs',
        room: '3B(C)',
        floor: 3,
        building: 'Bâtiment Principal',
        startTime: '10:45',
        endTime: '12:45',
        type: 'course',
      },
      {
        id: 'mon-3',
        name: 'Français avancé 1',
        room: '3A(C)',
        floor: 3,
        building: 'Bâtiment Principal',
        startTime: '14:00',
        endTime: '15:30',
        type: 'language',
      },
    ],
  },
  {
    day: 'Tuesday',
    dayFr: 'Mardi',
    courses: [
      {
        id: 'tue-1',
        name: "Conception des systèmes d'information",
        room: '5A',
        floor: 5,
        building: 'Bâtiment Principal',
        startTime: '08:30',
        endTime: '10:30',
        type: 'course',
      },
      {
        id: 'tue-2',
        name: 'Probabilité',
        room: '5A',
        floor: 5,
        building: 'Bâtiment Principal',
        startTime: '10:45',
        endTime: '12:15',
        type: 'course',
      },
    ],
  },
  {
    day: 'Wednesday',
    dayFr: 'Mercredi',
    courses: [
      {
        id: 'wed-1',
        name: 'Electronique analogique 1',
        room: '1A',
        floor: 1,
        building: 'Bâtiment Principal',
        startTime: '10:45',
        endTime: '12:45',
        type: 'course',
      },
      {
        id: 'wed-2',
        name: 'Pre-intermediate English 1',
        room: '2B(C)',
        floor: 2,
        building: 'Bâtiment Principal',
        startTime: '14:00',
        endTime: '15:30',
        type: 'language',
      },
      {
        id: 'wed-3',
        name: 'التفتح الثقافي و الفني',
        nameAr: 'التفتح الثقافي و الفني',
        room: '2B(C)',
        floor: 2,
        building: 'Bâtiment Principal',
        startTime: '15:45',
        endTime: '17:15',
        type: 'course',
      },
    ],
  },
  {
    day: 'Thursday',
    dayFr: 'Jeudi',
    courses: [
      {
        id: 'thu-1',
        name: 'TP Programmation avancée & structure de données 1',
        room: 'CC1(C)',
        floor: 0,
        building: 'Centre de Calcul',
        startTime: '14:00',
        endTime: '15:30',
        type: 'tp',
        group: 'G21',
      },
      {
        id: 'thu-2',
        name: 'TP Électronique analogique 1',
        room: 'LCSE(C)',
        floor: 0,
        building: 'Laboratoire',
        startTime: '15:45',
        endTime: '17:15',
        type: 'tp',
        group: 'G22',
      },
    ],
  },
  {
    day: 'Friday',
    dayFr: 'Vendredi',
    courses: [
      {
        id: 'fri-1',
        name: 'TP Électronique analogique 1',
        room: 'LCSE(C)',
        floor: 0,
        building: 'Laboratoire',
        startTime: '15:45',
        endTime: '17:15',
        type: 'tp',
        group: 'G21',
      },
      {
        id: 'fri-2',
        name: 'TP Programmation avancée & structure de données 1',
        room: 'CC1(C)',
        floor: 0,
        building: 'Centre de Calcul',
        startTime: '14:00',
        endTime: '15:30',
        type: 'tp',
        group: 'G22',
      },
    ],
  },
  {
    day: 'Saturday',
    dayFr: 'Samedi',
    courses: [
      {
        id: 'sat-1',
        name: 'Programmation avancée & structure de données 1',
        room: '2B(C)',
        floor: 2,
        building: 'Bâtiment Principal',
        startTime: '14:00',
        endTime: '16:00',
        type: 'course',
      },
      {
        id: 'sat-2',
        name: 'Analyse 3',
        room: '2B(C)',
        floor: 2,
        building: 'Bâtiment Principal',
        startTime: '16:15',
        endTime: '18:15',
        type: 'course',
      },
    ],
  },
];

export const sampleNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'room_change',
    title: 'Changement de salle',
    message: 'Le cours de Microprocesseurs est déplacé en salle 4A au lieu de 3B(C)',
    courseId: 'mon-2',
    timestamp: new Date(),
    read: false,
  },
  {
    id: 'notif-2',
    type: 'info',
    title: 'Rappel',
    message: 'N\'oubliez pas votre rapport de TP pour demain',
    timestamp: new Date(Date.now() - 3600000),
    read: true,
  },
];

export const classInfo = {
  className: '2AP2',
  fullName: '2ème Année Préparatoire - Groupe 2',
  year: '2024-2025',
  semester: 'Semestre 1',
};
