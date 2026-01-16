import { AgendaItem, AgendaSection } from '@/types/calendar';

// Sample agenda templates
const AGENDA_TEMPLATES: AgendaItem[][] = [
  [
    {
      hour: '8:30',
      title: 'Team Meeting',
      duration: '12:00 - 20:00',
      color: '#5653FC',
      team: [
        { name: 'Omar r.', isAvailable: true },
        { name: 'Elijah a', isAvailable: false }
      ]
    },
    {
      hour: '9:00',
      title: 'Project Review',
      duration: '12:00 - 20:00',
      color: '#009FE3',
      team: [
        { name: 'Omar r.', isAvailable: true },
        { name: 'Elijah a', isAvailable: false }
      ]
    },
    {
      hour: '9:30',
      title: 'Code Review',
      duration: '12:00 - 20:00',
      color: '#E35F00',
      team: [
        { name: 'Omar r.', isAvailable: true },
        { name: 'Elijah a', isAvailable: false }
      ]
    },
    {
      hour: '10:00',
      title: 'Standup',
      duration: '12:00 - 20:00',
      color: '#5653FC',
      team: [
        { name: 'Omar r.', isAvailable: true },
        { name: 'Elijah a', isAvailable: false }
      ]
    },
    {
      hour: '10:30',
      title: 'Team Sync',
      duration: '12:00 - 20:00',
      color: '#009FE3',
      team: [
        { name: 'Omar r.', isAvailable: true },
        { name: 'Elijah a', isAvailable: false }
      ]
    },
    {
      hour: '11:00',
      title: 'Dinner',
      duration: '12:00 - 20:00',
      color: '#E35F00',
      team: [
        { name: 'Omar r.', isAvailable: true },
        { name: 'Elijah a', isAvailable: false }
      ]
    },
    {
      hour: '11:30',
      title: 'Team Meeting',
      duration: '12:00 - 20:00',
      color: '#5653FC',
      team: [
        { name: 'Omar r.', isAvailable: true },
        { name: 'Elijah a', isAvailable: false }
      ]
    }
  ],
  // [
  //   { hour: '10:00 AM', title: 'Client Call', duration: '45min' },
  //   { hour: '3:00 PM', title: 'Design Sprint', duration: '2h' }
  // ],
  // [
  //   { hour: '11:00 AM', title: 'Lunch with Sarah', duration: '1h' }
  // ],
  // [], // Empty day
  // [
  //   { hour: '9:30 AM', title: 'Standup', duration: '15min' },
  //   { hour: '1:00 PM', title: 'Code Review', duration: '1h' },
  //   { hour: '4:00 PM', title: 'Team Sync', duration: '30min' }
  // ],
  // [
  //   { hour: '10:00 AM', title: 'Workshop', duration: '3h' }
  // ],
];

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const generateAgendaItems = (): AgendaSection[] => {
  const today = new Date();
  const agendaSections: AgendaSection[] = [];
  
  // Generate only the number of days we have templates for
  AGENDA_TEMPLATES.forEach((template, index) => {
    const date = addDays(today, index);
    const dateString = formatDate(date);
    
    agendaSections.push({
      title: dateString,
      data: template
    });
  });
  
  return agendaSections;
};

export const generateMarkedDates = (): { [key: string]: { marked: boolean } } => {
  const today = new Date();
  const markedDates: { [key: string]: { marked: boolean } } = {};
  
  // Mark days: 1 in the past, today, 3 in the future (skip day 3 which is empty)
  const daysToMark = [-1, 0, 1, 3, 4];
  
  daysToMark.forEach((dayOffset) => {
    const date = addDays(today, dayOffset);
    const dateString = formatDate(date);
    markedDates[dateString] = { marked: true };
  });
  
  return markedDates;
};


// Export the generated data
export const MOCK_AGENDA_ITEMS = generateAgendaItems();
export const MOCK_MARKED_DATES = generateMarkedDates();